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

// const RouteArr = ["jaw-cyst-tumor-surgery/index.html", "rhinoplasty-nose-surgery/index.html", "appointment-booking/index.html", "appointment-booking/index.html", "e-consultation/index.html", "e-consultation/index.html", "benefits-of-cbct-scan/index.html", "benefits-of-cbct-scan/index.html", "benefits-of-lanap-treatment-for-gum-disease/index.html", "benefits-of-lanap-treatment-for-gum-disease/index.html", "tilted-vs-straight-dental-implants/index.html", "tilted-vs-straight-dental-implants/index.html", "oral-cancer-screening/index.html", "oral-cancer-screening/index.html"];
// const routes = [];
// app._router.stack.forEach(function(middleware){
//     if(middleware.route){ // routes registered directly on the app
//         routes.push(middleware.route.path);
//     } else if(middleware.name === 'router'){ // router middleware
//         middleware.handle.stack.forEach(function(handler){
//             route = handler.route;
//             route && routes.push(route.path);
//         });
//     }
// });

// const createDom = require('htmldom');
// const {parse} = require('node-html-parser');

// let count = 1;
// for(let route of RouteArr) {
//     route = route.split('/')[0];
//     if(fs.existsSync('views/www.fmsdental.com/'+ route + '/index.html')) {
//         if(routes.indexOf('/'+route) === -1) {

//             if(fs.existsSync('views/'+route+'.hbs'))
//             continue;

//             // console.log(count++, RouteArr.length, fs.existsSync('views/www.fmsdental.com/'+ route + '/index.html'), 'views/www.fmsdental.com/'+ route + '/index.html');
//             // continue
//             // return console.log(route);

//             const content = fs.readFileSync('views/www.fmsdental.com/'+ route + '/index.html');
//             const root = parse(content);
//             const $ = createDom(root.querySelector('.overflow_wrapper').toString());
//             fs.writeFileSync('views/'+route+'.hbs', $('.head_panel').outerHTML());
//             fs.appendFileSync('views/'+route+'.hbs', $('.main.foo').outerHTML());
//             if(!$('.head_panel').outerHTML() || !$('.main.foo').outerHTML()) {
//                 const f = content.indexOf('<div class="main foo"');
//                 const l = content.indexOf('<!--    END ========================= MAIN WRAPPER FINISH ========================  -->');
//                 fs.writeFileSync('views/'+route+'.hbs', (content+'').substr(f-13, l-f));
//             }
//         }
//     }
// }

// require('./webpack')
