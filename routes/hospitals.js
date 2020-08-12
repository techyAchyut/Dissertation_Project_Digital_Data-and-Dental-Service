const { auth } = require('../helpers/adminAccess');
const Hospital = require('../models/hospital');
const { body, validationResult } = require('express-validator');
const responseErrors = require('../helpers/responseErrors');
const router = require('express').Router();

router.get('/admin/hospitals', auth, async function(request, response) {
    let hospital = {
        perpage: 10,
        page: request.query.page || 1,
    };
    const data = await Hospital.findAndCountAll({
        limit: 10, 
        offset: hospital.perpage * (hospital.page-1)
    });
    hospital.data = data.rows;
    hospital.total = data.count;
    
    response.render('admin/hospitals/index', {layout:'backend', hospital});
});

router.get('/admin/hospitals/add', auth, function(request, response) {
    response.render('admin/hospitals/add', {layout: false});
});

router.get('/admin/hospital/:hospital_id/description', function(request, response) {
    Hospital.findByPk(request.params.hospital_id).then(hospital => {
        response.render('admin/hospitals/description', {layout: false, hospital: hospital.dataValues});
    }).catch(err => response.status(422).json({message: err.message}));
});

router.post('/admin/hospitals/create', auth, [
    body('name').exists({checkFalsy:true}).withMessage('Name field is required'),
    body('est_date').exists({checkFalsy:true}).withMessage('Estimated date field is required')
        .custom(value => !!value.match(/^\d{4}-\d{2}-\d{2}$/)).withMessage('Estimated date should be valid date (yyyy-mm-dd)'),
    body('email').isEmail().withMessage('Email should be valid email address'),
    body('type').exists({checkFalsy:true}).withMessage('Hospital type field is required'),
    body('telephone').exists({checkFalsy:true}).withMessage('Phone field is required').isLength({min: 8}).withMessage('Phone must be valid phone number'),
    body('add1').exists({checkFalsy:true}).withMessage('Address 1 field is required'),
    body('city').exists({checkFalsy:true}).withMessage('City field is required'),
    body('zip').exists({checkFalsy:true}).withMessage('Zip field is required'),
    body('state').exists({checkFalsy:true}).withMessage('State field is required'),
], function(request, response) {
    try {
        validationResult(request).throw();
        Hospital.create(request.body).then(hospital => {
            response.json(hospital);
        }).catch(err => {
            response.status(422).json({message: err.message});
        });
    } catch (error) {
        response.status(422).json(responseErrors(error.mapped()));
    }
});

router.post('/admin/hospital/:hospital_id/update', function(request, response) {
    Hospital.update(request.body, {
        where: {
            id: request.params.hospital_id
        }
    }).then(update => response.json(update))
    .catch(err => response.status(422).json({message: err.message}));
});

router.get('/admin/hospital/:hospital_id/edit', function(request, response) {
    Hospital.findByPk(request.params.hospital_id).then(hospital => {
        response.render('admin/hospitals/edit', {layout: false, hospital: hospital.dataValues});
    }).catch(err => response.status(422).json({message: err.message}));
});

router.get('/admin/hospital/:hospital_id/delete', function(request, response) {
    Hospital.findByPk(request.params.hospital_id).then(hospital => {
        response.render('admin/hospitals/delete', {layout:false, hospital: hospital.dataValues});
    }).catch(err => response.status(422).json({message: err.message}));
});

router.post('/admin/hospital/:hospital_id/delete', function(request, response) {
    Hospital.destroy({
        where: {
            id: request.params.hospital_id
        }
    }).then(d => response.json(d))
    .catch(err => response.status(422).json({message: err.message}));
});

module.exports = router;

