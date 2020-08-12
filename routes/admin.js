const { auth } = require('../helpers/adminAccess');

const router = require('express').Router();

router.get('/admin', auth, function(request, response) {
    response.render('admin/index', {layout:'backend'});
});

router.get('/admin/dashboard', auth, function(request, response) {
    response.render('admin/index', {layout:'backend'});
});


module.exports = router;