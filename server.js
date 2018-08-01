const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');

app.use((req,res,next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`

    fs.appendFileSync('server.log', log +'\n');
    next();
})

app.use((req, res, next) => {
    res.render('maintainence.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Homepage',
        welcomeMessage: 'Hello to the world of expree.js',
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'unable to connect to the server',
        likes: [
            'Biking',
            'Cities'
        ]
    });
});

app.listen(3000);