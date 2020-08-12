const express = require('express');
const router = express.Router();

router.get('', function(request, response) {
    response.render('index');
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
router.get('/best-dentist-in-hyderabad', function(request, response) {
    response.render('best-dentist-in-hyderabad/best-dentist-in-hyderabad');
});
router.get('/dr-shailaja-reddy', function(request, response) {
    response.render('dr-shailaja-reddy/dr-shailaja-reddy');
});
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