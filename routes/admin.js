const { auth } = require('../helpers/adminAccess');
const Appointment = require('../models/appointment');
const Hospital = require('../models/hospital');
const Op = require('sequelize').Op;

const router = require('express').Router();

router.get('/admin', auth, async function(request, response) {
    let appointment = {
        perpage: 10,
        page: request.query.page || 1,
    };
    const data = await Appointment.findAndCountAll({
        limit: 10, 
        offset: appointment.perpage * (appointment.page-1),
        order: [
            ['createdAt', 'desc']
        ]
    });
    appointment.data = data.rows;
    appointment.total = data.count;
    response.render('admin/index', {layout:'backend', appointment});
});

router.get('/admin/appointments', auth, async function(request, response) {
    let appointment = {
        perpage: 10,
        page: request.query.page || 1,
    };
    const data = await Appointment.findAndCountAll({
        limit: 10, 
        offset: appointment.perpage * (appointment.page-1),
        order: [
            ['createdAt', 'desc']
        ]
    });
    appointment.data = data.rows;
    appointment.total = data.count;
    response.render('admin/index', {layout:'backend', appointment});
});

router.get('/admin/appointment/:appt/query', function(request, response) {
    Appointment.findByPk(request.params.appt).then(appt => {
        response.render('admin/appointments/query', {layout: false, appointment: appt.dataValues});
    }).catch(err => response.status(422).json({message: err.message}));
});

router.post('/admin/appointment/:appt/update', function(request, response) {
    Appointment.update(request.body, {
        where: {
            id: request.params.appt
        }
    }).then(update => response.json(update))
    .catch(err => response.status(422).json({message: err.message}));
});


router.get('/admin/appointment/:appt/approve', function(request, response) {
    Appointment.findByPk(request.params.appt).then(appt => {
        response.render('admin/appointments/approve', {layout: false, appointment: appt.dataValues});
    }).catch(err => response.status(422).json({message: err.message}));
});
router.get('/admin/appointment/:appt/disapprove', function(request, response) {
    Appointment.findByPk(request.params.appt).then(appt => {
        response.render('admin/appointments/disapprove', {layout: false, appointment: appt.dataValues});
    }).catch(err => response.status(422).json({message: err.message}));
});
router.get('/admin/appointment/:appt/delete', function(request, response) {
    Appointment.findByPk(request.params.appt).then(appt => {
        response.render('admin/appointments/delete', {layout: false, appointment: appt.dataValues});
    }).catch(err => response.status(422).json({message: err.message}));
});
router.post('/admin/appointment/:appt/delete', function(request, response) {
    Appointment.destroy({
        where: {
            id: request.params.appt
        }
    }).then(update => response.json(update))
    .catch(err => response.status(422).json({message: err.message}));
});

router.get('/admin/appointment/add', async function(request, response) {
    hospitals = (await Hospital.findAll({})).map(x => x.dataValues);
    response.render('admin/appointments/add', {layout:false, hospitals});
});

module.exports = router;