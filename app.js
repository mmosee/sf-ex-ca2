const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.listen(port, () => {
    console.log(`Started ${port}`);
})

app.post('/save', function(req, res) {
    console.log('debug: /save');
    return res.status(200).json({});
});

app.post('/publish', function(req, res) {
    console.log('debug: /publish');
    return res.status(200).json({});
});

app.post('/validate', function(req, res) {
    console.log('debug: /validate');
    return res.status(200).json({});
});

app.post('/stop', function(req, res) {
    console.log('debug: /stop');
    return res.status(200).json({});
});

app.post('/execute', function(req, res) {
    console.log('debug: /execute');
    return res.status(200).json({});
});