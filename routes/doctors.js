const Doctor = require('../models/doctor');
const {auth} = require('../helpers/adminAccess');
const { body, validationResult } = require('express-validator');
const responseErrors = require('../helpers/responseErrors');
const router = require('express').Router();

router.get('/admin/doctors', auth, async function(request, response) {
    let doctor = {
        perpage: 10,
        page: request.query.page || 1,
    };
    const data = await Doctor.findAndCountAll({
        limit: 10, 
        offset: doctor.perpage * (doctor.page-1)
    });
    doctor.data = data.rows;
    doctor.total = data.count;
    
    response.render('admin/doctors/index', {layout:'backend', doctor});
});

router.get('/admin/doctors/add', auth, function(request, response) {
    response.render('admin/doctors/add', {layout:false});
});

router.post('/admin/doctors/create', [
    body('title').exists({checkFalsy:true}).withMessage('Salutation field is required'),
    body('firstName').exists({checkFalsy:true}).withMessage('First name field is required'),
    body('lastName').exists({checkFalsy:true}).withMessage('Last name field is required'),
    body('gender').exists({checkFalsy:true}).withMessage('Gender field is required'),
    body('quote').exists({checkFalsy:true}).withMessage('Quote field is required'),
    body('position').exists({checkFalsy:true}).withMessage('Position field is required'),
], auth, function(request, response) {
    try {
        validationResult(request).throw();
        Doctor.create(request.body).then(doctor => response.json(doctor))
        .catch(err => response.status(422).json({message: err.message}));
    } catch (error) {
        response.status(422).json(responseErrors(error.mapped()));
    }
});

router.get('/admin/doctor/:doc/description', function(request, response) {
    Doctor.findByPk(request.params.doc).then(doctor => {
        response.render('admin/doctors/description', {layout:false, doctor: doctor.dataValues});
    }).catch(err => response.status(422).json({message: err.message}));
});

router.post('/admin/doctor/:doc/update', function(request, response) {
    Doctor.update(request.body, {
        where: {
            id: request.params.doc
        }
    }).then(update => response.json(update))
    .catch(err => response.status(422).json({message: err.message}));
});

router.get('/admin/doctor/:doc/edit', function(request, response) {
    Doctor.findByPk(request.params.doc).then(doctor => {
        response.render('admin/doctors/edit', {layout:false, doctor: doctor.dataValues});
    }).catch(err => response.status(422).json({message: err.message}));
});

router.get('/admin/doctor/:doc/delete', function(request, response) {
    Doctor.findByPk(request.params.doc).then(doctor => {
        response.render('admin/doctors/delete', {layout: false, doctor: doctor.dataValues});
    }).catch(err => response.status(422).json({message: err.message}));
});

router.post('/admin/doctor/:doc/delete', function(request, response) {
    Doctor.destroy({
        where: {
            id: request.params.doc
        }
    }).then(dt => response.json(dt))
    .catch(err => response.status(422).json({message: err.message}));
});

module.exports = router;