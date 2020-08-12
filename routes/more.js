const express = require("express");
const router = express.Router();
const fs = require("fs");

const routes = [
	"faqs",
	"fms-jobs",
	"payments-empanelments",
	"arogya-bhadratha",
	"smile-designing",
	"free-checkup-offer-dental-implants",
	"contact-us",
	// "https://fmsdental.com/fmsblog",
	"sterilization",
	"testimonials",
	"dental-implants-homepage",
	"cosmetic-home",
	"monsoon-dental-tourism",
	"customer-reviews",
	// "http://124.123.32.247:90/EmployeeDashBoard.aspx",
	"virtual-help-desk",
];

for (let route of routes) {
	router.get("/" + route, function (request, response) {
		response.render("more/" + route);
	});
}

module.exports = router;
