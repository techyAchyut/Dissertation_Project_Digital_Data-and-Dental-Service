const express = require("express");
const app = express();
const fs = require("fs");
const { sequelize } = require("./models/sequelize");

app.engine(".hbs", require("./express-handlebars"));
app.set("view engine", ".hbs");

app.use(express.static("public"));
app.use(require("body-parser")({ urlencoded: true, extended: true }));
app.use(require("cookie-parser")());

for (let route of fs.readdirSync("routes")) {
	app.use("", require("./routes/" + route));
}

(async function () {
    // await sequelize.sync({alter:true});
})();

app.listen(5000, function () {
	console.log("Server started at localhost:5000");
});
