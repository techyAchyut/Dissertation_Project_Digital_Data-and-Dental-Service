const exphbs = require('express-handlebars');
const fs = require('fs');
const moment = require('moment');
const Hospital = require('./models/hospital');
const Doctor = require('./models/doctor');

const helpers = {
    backendCss: function() {
        const files = fs.readdirSync('public/resources/backend');
        return files.filter(x => x.indexOf('.css') > 0).map(x => `<link rel="stylesheet" href="/resources/backend/${ x }"/>`).join('\n');
    },
    backendJs: function() {
        const files = fs.readdirSync('public/resources/backend/js');
        return files.filter(x => x.indexOf('.js') > 0).map(x => `<script src="/resources/backend/${ x }"></script>`).join('\n');
    },
    paginate: (model, route) => {
        const paginations = ['<ul class="pagination pagination-rounded">'];
        const len = Math.ceil(model.total / model.perpage);
        for(let i = 0; i < len; i++) {
            paginations.push(`<li class="paginate_button ${ (i+1) == model.page ? 'active' : '' }"><a href="${ route }?page=${ i + 1 }">${ i + 1 }</a></li>`);
        }
        paginations.push('</ul>');
        return paginations.join('');
    },
    isEqual: function(expressionOne, expressionTwo, opts) {
        return expressionOne == expressionTwo ? opts.fn(this) : opts.inverse(this);
    },
    date: date => moment(date).format('YYYY-MM-DD')
};

module.exports = exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers
});