const port = process.env.APPPORT;
const host = process.env.HOSTNAME;

const express = require('express');
const ejs = require('ejs');
const cookieparser = require('cookie-parser');
const sa = require('superagent');

const app = new express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', ejs.renderFile);
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('frontend.ejs', { name: "", message: "", age: "", host: host, port: port});
});

app.post('/getage', (req, res) => {   
    console.log(`received data ... ${req.body.name}`);
    console.log(`sending data ${req.body.name} to https://api.agify.io/?name=${req.body.name}`);
    try {
        sa
            .get(`https://api.agify.io/?name=${req.body.name}`)
            .end((error, response) => {
                if (error == undefined) {
                    console.log(response.text);
                    const responsejson = JSON.parse(response.text);
                    console.log(responsejson);
                    if(typeof responsejson.age != "number"){
                        responsejson.age = "0";
                    }
                    res.render('frontend.ejs', { name: responsejson.name, message: "Hope we guessed right!", age: responsejson.age, host: host, port: port});
                }
                else {
                    res.render('frontend.ejs', { name: req.body.name, message: "There was an error", age: req.body.age, host: host, port: port});
                    console.log(error.text);
                }

            })
    }
    catch {
        console.log(`Error occured when calling https://api.agify.io/?name=${req.body.name}`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});