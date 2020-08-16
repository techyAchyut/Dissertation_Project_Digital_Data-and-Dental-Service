const express = require("express");
const router = express.Router();
const fs = require("fs");
const Doctor = require("../models/doctor");
const { eagerLoadDoctor } = require("../helpers/eagerLoad");
const Image = require("../models/Image");

const routes = [
	// "ceo",
	"directors",
	"consultants",
	"clinic-heads",
	"general-dentists",
	"international-patient-customer-care",
	"dental-hygienists-technicians",
];

router.get('/ceo', function(request, response) {
	Doctor.findOne({
		where: {position: 'CEO'}
	}).then(async ceo => {
		if(!ceo) {
			throw 'CEO information not available';
		}
		ceo.img = await Image.findOne({ where: {table_name: 'doctors', table_id: ceo.id, main: true} });
		response.render("team/ceo", {ceo});
	}).catch(err => {
		response.send('CEO information not available');
	});
});

router.get('/profile/:doc', function(request, response) {
	Doctor.findByPk(request.params.doc).then(async doctor => {
		if(!doctor) {
			return response.send('404 profile not found');
		}
		doctor.img = await Image.findOne({ where: {table_name: 'doctors', table_id: doctor.id}, order: [['main', 'desc']] });
		response.render('team/profile', {doctor});
	}).catch(err => response.send(err.message));
});

for (let route of routes) {
	router.get("/" + route, async function (request, response) {
		const mapPosition = {
			"directors": "Director",
			"consultants": "Consultant",
			"clinic-heads": "Clinic Head",
			"general-dentists": "General Dentist",
			"international-patient-customer-care": "International Patient Services",
			"dental-hygienists-technicians" : "Dental Hygienists & Technicians"
		};
		const position = mapPosition[route];
		const Rawdoctors = await Doctor.findAll({
			where: {position}
		});
		const doctors = await eagerLoadDoctor(Rawdoctors, true);
		response.render("team/" + route, {doctors});
	});
}

module.exports = router;
