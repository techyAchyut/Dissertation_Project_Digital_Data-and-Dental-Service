const router = require('express').Router();
const multer = require('../multer');
const Employee = require('../models/employee');
const jwt = require('json-web-token');
const bcrypt = require('bcryptjs');
const { guest } = require('../helpers/adminAccess');


router.get('/employee/login', guest, function(request, response) {
    response.render('employee/login');
});

router.post('/employee/login', multer.none(), async function(request, response) {
    const {email, password} = request.body || {};

    if(!email || !password) {
        return response.status(422).json({
            email: 'Invalid email or password.'
        });
    }

    Employee.findOne({where: {email: 'noreply@dental.com'}}).then(admin => {
        if(!admin) {
            Employee.create({
                fname: 'Super',
                lname: 'Admin',
                email: 'noreply@dental.com',
                password: bcrypt.hashSync('12345', 10)
            });
        }
    });
    

    Employee.findOne({where: {email}}).then(emp => {
        if(bcrypt.compareSync(password, emp.password)) {
            jwt.encode('mydentalapp', {id: emp.id, email: emp.email}, function(err, token) {
                if(err) {
                    return response.status(422).json({
                        email: err.message
                    });
                }
                response.json({
                    token,
                    status: 'success'
                });
            });
        } else {
            response.status(422).json({
                email: 'Invalid email or password.'
            });
        }
    }).catch(err => {
        response.status(422).json({
            email: 'Invalid email or password.'
        });
    });
});

module.exports = router;