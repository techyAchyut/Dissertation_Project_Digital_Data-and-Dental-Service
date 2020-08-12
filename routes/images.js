const Image = require('../models/Image');
const { auth } = require('../helpers/adminAccess');
const multer = require('../multer');
const { Op } = require('sequelize');
const router = require('express').Router();
const fs = require('fs');

router.post('/admin/images/:table_name/:table_id', function(request, response) {
    Image.findAll({
        where: {
            table_id: request.params.table_id,
            table_name: request.params.table_name,
        },
        order: [
            ['main', 'desc']
        ]
    }).then(images => {
        response.json(images);
    }).catch(err => {
        response.status(422).json({
            message: err.message
        });
    });
});

router.post('/admin/images/upload', auth, multer.single('file'), function(request, response) {
    Image.create({
        table_id: request.body.table_id,
        table_name: request.body.table_name,
        name: request.file.filename,
        path: '/my-uploads/' + request.file.filename
    }).then(image => {
        response.json(image);
    }).catch(err => {
        response.status(422).json({
            message: err.message
        });
    });
});

router.post('/admin/image/:image_id/makeMainImage', auth, function(request, response) {
    Image.findByPk(request.params.image_id).then(function(image) {
        Image.update({main: true}, {
            where: {id: image.id}
        }).then(async update => {
            await Image.update({main: false}, {
                where: {
                    id: {
                        [Op.not] : image.id,
                    },
                    table_id: image.table_id 
                }
            });
            response.json(update);
        }).catch(err => {
            response.status(422).json({
                message: err.message
            });
        });
    }).catch(err => {
        response.status(422).json({
            message: err.message
        });
    });
});

router.post('/admin/image/:image_id/removeImage', auth, function(request, response) {
    Image.findByPk(request.params.image_id).then(image => {
        if(!image) {
            throw new Error('Image doesn\'t exists.');
        }
        Image.destroy({
            where: {
                id: image.id
            }
        }).then(del => {
            fs.unlinkSync('public'+image.path);
            response.json(del);
        }).catch(err => {
            response.status(422).json({
                message: err.message
            });
        });
    }).catch(err => {
        response.status(422).json({
            message: err.message
        });
    });
});

module.exports = router;