// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});




// your first API endpoint... 

app.get("/api", function(req, res) {
    const d = new Date();
    res.json({
        unix: Date.now(),
        utc: d.toUTCString()
    })
});

app.get("/api/:date?", function(req, res) {
    const regex1 = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    const regex2 = /\d+/

    function isValidDate(path) {
        if (!regex1.test(path) || !regex2.test(path)) {
            return false
        }
        return true;
    };

    const d = req.params.date;

    if (regex1.test(d) === true) {
        const unixTime = Date.parse(d)
        const date = new Date(+unixTime)
        res.json({
            unix: unixTime,
            utc: date.toUTCString()
        })
    }
    if (regex2.test(d) === true) {
        const date = new Date(+d)
        res.json({
            unix: parseInt(d),
            utc: date.toUTCString()
        })
    }
    if (!isValidDate(d)) {
        res.json({ "error": "Invalid Date" })
    }

})

// listen for requests :)
const listener = app.listen(process.env.PORT || 8080, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});