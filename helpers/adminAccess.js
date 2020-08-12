const jwt = require('json-web-token');
const Employee = require('../models/employee');

function guest(request, response, next) {
    if(request.cookies && request.cookies._token) {
        jwt.decode('mydentalapp', request.cookies._token, function(err, payload) {
            if(err) {
                return next();
            }
            response.redirect('/admin');
        });
    } else {
        next();
    }
}

function auth(request, response, next) {
    if(request.cookies && request.cookies._token) {
        jwt.decode('mydentalapp', request.cookies._token, function(err, payload) {
            Employee.findOne({where:{id:payload.id}}).then(emp => {
                request.user = emp;
                next();
            }).catch(err => {
                response.redirect('/');
            })
        });
    } else {
        response.redirect('/');
    }
}

module.exports = {guest, auth};