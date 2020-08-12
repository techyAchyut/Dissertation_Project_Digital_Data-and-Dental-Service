const express = require("express");
const router = express.Router();

router.get("/dental-education", function (request, response) {
    response.render("education/" + route);
});

module.exports = router;
