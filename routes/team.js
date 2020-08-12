const express = require("express");
const router = express.Router();
const fs = require("fs");

const routes = [
	"the-boss",
	"directors",
	"consultants",
	"clinic-heads",
	"general-dentists",
	"international-patient-customer-care",
	"dental-hygienists-technicians",
];

for (let route of routes) {
	router.get("/" + route, function (request, response) {
		response.render("team/" + route);
	});
}

module.exports = router;
