const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');
const { eagerLoadHospital, eagerLoadDoctor } = require('../helpers/eagerLoad');

router.get('', async function(request, response) {
    const chunkSize = 3;
    const Rawhospitals = await Hospital.findAll({});
    const Rawdoctors = await Doctor.findAll({});

    const hospitals = await eagerLoadHospital(Rawhospitals);
    const doctors = await eagerLoadDoctor(Rawdoctors);

    // console.log(hospitals[1]);

    const chunkHospitals = [];
    const chunkDoctors = [];
    for(let i = 0; i < hospitals.length; i+=chunkSize) {
        chunkHospitals.push(hospitals.slice(i, i + chunkSize));
    }
    // for(let i = 0; i < doctors.length; i+=chunkSize) {
    //     chunkDoctors.push(doctors.slice(i, i + chunkSize));
    // }
    response.render('index', {hospitals: chunkHospitals, doctors});
});


router.get('/appointment-booking', function(request, response) {
    response.render('more/appointment-booking');
});

router.get('/location', function(request, response) {
	response.render('more/location');
});


// fms-awards
// best-dentist-in-hyderabad
// dr-shailaja-reddy
// dr-shailaja-reddy
// crooked-teeth

router.get('/fms-awards', function(request, response) {
    response.render('fms-awards/fms-awards');
});
// router.get('/best-dentist-in-hyderabad', function(request, response) {
//     response.render('best-dentist-in-hyderabad/best-dentist-in-hyderabad');
// });

router.get('/crooked-teeth', function(request, response) {
    response.render('crooked-teeth/crooked-teeth');
});

const HomeRoute = [
'best-dental-hospital-in-hyderabad',
'dental-cavities',
'loose-teeth',
'stained-teeth',
'chipped-teeth',
'metal-free-zirconium-crowns',
'composite-bonding',
'tooth-jewellery',
'bridal-smile-make-over',
'invisible-fillings',
'timing-of-braces-treatment',
'clear-aligners',
'dental-implants',
'bone-grafting-with-gum-surgery',
'wisdom-tooth-surgery',
'facial-and-jaw-bone-trauma-surgery',
'advanced-dental-implant-surgery',
'benefits-of-cbct-scan',
'benefits-of-lanap-treatment-for-gum-disease',
'tilted-vs-straight-dental-implants',
'oral-cancer-screening',
]

for(let route of HomeRoute) {
    router.get('/'+ route, function(request, response) {
        response.render('more/'+ route);
    });
}

module.exports = router;