const express = require("express");
const router = express.Router();
const fs = require("fs");

const routes = [
	"best-dental-implant-clinic-in-hyderabad",
	"fms-dental-hospitals-koti",
	"dental-clinic-in-langar-house-hyderabad-india",
	"dental-clinic-in-kondapur-hyderabad-india",
	"dental-clinic-in-dilsukhnagar-hyderabad-india",
	"best-dental-clinic-in-secunderabad",
	"dental-clinic-in-a-s-rao-nagar-hyderabad-india",
	"dental-clinic-in-kukatpally-hyderabad-india",
	"best-dental-clinic-in-panjagutta-hyderabad",
	"best-dental-clinic-in-chandanagar-and-madinaguda",
	"best-dental-clinic-in-vanasthalipuram",
	"dental-clinic-in-kochi-india",
	"kochi/full-mouth-implants-clinic-in-cochin-kerala",
	"kochi/best-cosmetic-dental-clinic-in-cochin-kerala",
	"kochi/best-root-canal-treatment-in-cochin-kerala",
	"kochi/best-zirconium-crown-treatment-in-cochin-kerala",
	"kochi/best-flap-surgery-in-cochin-kerala",
	"kochi/best-laser-gum-treatment-in-cochin-kerala",
	"kochi/best-braces-treatment-in-cochin-kerala",
];

for (let route of routes) {
	router.get("/" + route, function (request, response) {
		response.render("our-clinics/" + route);
    });
}

module.exports = router;
