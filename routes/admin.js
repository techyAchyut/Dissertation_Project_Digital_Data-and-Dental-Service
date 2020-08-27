const { auth } = require('../helpers/adminAccess');
const Employee = require('../models/employee');
const Op = require('sequelize').Op;

const router = require('express').Router();

router.get('/admin', auth, function(request, response) {
    response.render('admin/index', {layout:'backend'});
});

router.get('/admin/employees', auth, async function(request, response) {
    let employee = {
        perpage: 10,
        page: request.query.page || 1,
    };
    const data = await Employee.findAndCountAll({
        where: {
            email: {
                [Op.ne] : "noreply@dental.com"
            }
        },
        limit: 10, 
        offset: employee.perpage * (employee.page-1)
    });
    employee.data = data.rows;
    employee.total = data.count;
    response.render('admin/index', {layout:'backend', employee});
});


module.exports = router;