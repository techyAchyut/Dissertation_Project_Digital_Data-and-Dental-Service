const Doctor = require('../models/doctor');

const router = require('express').Router();

router.get('/admin/doctors', async function(request, response) {
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

router.get('/admin/doctors/add', function(request, response) {
    response.render('admin/doctors/add', {layout:false});
});

module.exports = router;