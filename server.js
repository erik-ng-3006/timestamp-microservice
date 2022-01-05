// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});




// your first API endpoint... 

app.get("/api", function(req, res) {
    const d = new Date();

    res.json({
        unix: d.valueOf(),
        utc: d.toUTCString()
    })
});

app.get('/api/:date', (req, res) => {
    let d = req.params.date
    if (d.match(/\d{5,}/)) {
        d = +d;
    }
    const date = new Date(d)

    if (date.toUTCString() === "Invalid Date") {
        res.json({
            error: "Invalid Date"
        })
    } else {
        res.json({
            unix: date.valueOf(),
            utc: date.toUTCString()
        })
    }
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 8080, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});