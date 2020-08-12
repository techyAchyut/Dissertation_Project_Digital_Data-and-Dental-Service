const fs = require('fs');

const jsArr = [
	"D:/beagle-v1.3.0/dist/html/assets/lib/jquery/jquery.min.js",
	"D:/beagle-v1.3.0/dist/html/assets/lib/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js",
	"D:/beagle-v1.3.0/dist/html/assets/js/main.js",
    "D:/beagle-v1.3.0/dist/html/assets/lib/bootstrap/dist/js/bootstrap.min.js",
    "D:/beagle-v1.3.0/dist/html/assets/lib/dropzone/dist/dropzone.js",
	"D:/beagle-v1.3.0/dist/html/assets/lib/jquery-flot/jquery.flot.js",
	"D:/github/Dissertation_Project_Digital_Data-and-Dental-Service/node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
	// "D:/beagle-v1.3.0/dist/html/assets/lib/jquery-flot/jquery.flot.pie.js",
	// "D:/beagle-v1.3.0/dist/html/assets/lib/jquery-flot/jquery.flot.resize.js",
	// "D:/beagle-v1.3.0/dist/html/assets/lib/jquery-flot/plugins/jquery.flot.orderBars.js",
	// "D:/beagle-v1.3.0/dist/html/assets/lib/jquery-flot/plugins/curvedLines.js",
	"D:/beagle-v1.3.0/dist/html/assets/lib/jquery.sparkline/jquery.sparkline.min.js",
	// "D:/beagle-v1.3.0/dist/html/assets/lib/countup/countUp.min.js",
	// "D:/beagle-v1.3.0/dist/html/assets/lib/jquery-ui/jquery-ui.min.js",
	// "D:/beagle-v1.3.0/dist/html/assets/lib/jqvmap/jquery.vmap.min.js",
	// "D:/beagle-v1.3.0/dist/html/assets/lib/jqvmap/maps/jquery.vmap.world.js",
    "D:/beagle-v1.3.0/dist/html/assets/js/app-dashboard.js",
    "D:/github/Dissertation_Project_Digital_Data-and-Dental-Service/public/resources/custom.js"
];
let i = 0;
for(let f of jsArr) {
    if(i == 0) {
        fs.writeFileSync('public/resources/backend/js/master.js', fs.readFileSync(f));
    } else {

        fs.appendFileSync('public/resources/backend/js/master.js', '\n\n\n');
        fs.appendFileSync('public/resources/backend/js/master.js', fs.readFileSync(f));
    }
    i++
    console.log(i, jsArr.length);
}

let imgs = [
'avatar2.png',
'avatar3.png',
'avatar4.png',
'avatar5.png',
'github.png',
'bitbucket.png',
'slack.png',
'dribbble.png',
'mail_chimp.png',
'dropbox.png',
'avatar6.png',
'avatar1.png',
'avatar.png',
'logo-fav.png'
// 'D:/beagle-v1.3.0/dist/html/resources/img/logo.png',
]

// for(let img of imgs) {
//     let pre = 'D:/beagle-v1.3.0/dist/html/assets/img/';
//     if(!fs.exists('public/assets/img/'+ img)) {
//         fs.copyFileSync(pre + img, 'public/assets/img/'+img);
//     }
// }
// fs.copyFileSync('D:/beagle-v1.3.0/dist/html/assets/img/logo.png', 'public/assets/img/logo.png');