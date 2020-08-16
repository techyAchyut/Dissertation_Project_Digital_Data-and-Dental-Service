const express = require("express");
const router = express.Router();
const fs = require("fs");

const routes = [
	"medical-tourism-india",
	"dental-tourism-india",
	"dental-tourism-hyderabad",
	"dental-tourism-cochin",
	"why-fms",
	// "international-patient-customer-care",
	"visa-travel-and-accommodation",
	"explore-india",
	"plan-your-trip",
];

for (let route of routes) {
	router.get("/" + route, function (request, response) {
		response.render("international-patients/" + route);
	});
}

module.exports = router;
