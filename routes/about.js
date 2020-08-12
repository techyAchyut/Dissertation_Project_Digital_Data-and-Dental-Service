const express = require('express');
const router = express.Router();
const fs = require('fs');

const routes = [
    "the-evolution-of-dental-hospital", 
    "our-dental-clinics", 
    "vision-mission", 
    "philosophy", 
    "technology-at-fms", 
    "social-concern", 
    "the-fms-dental-lab", 
    "dental-laboratory-technician-course", 
    "dental-laboratory-technician-course", 
    "dental-laboratory-technician-course-specialty", 
    "learn-with-us-dental-laboratory", 
    "individual-dental-laboratory-technician", 
    "career-opportunities-dental-laboratory-technician-hyderabad-india", 
    "career-opportunities-dental-laboratory-technician-hyderabad-india", 
    "career-opportunities-dental-laboratory-technician-hyderabad-india", 
    "dental-education"
];

for(let route of routes) {
    router.get('/'+ route, function (request, response) {
        response.render('about/' + route);
    });
}


module.exports = router;