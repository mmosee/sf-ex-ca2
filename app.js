const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
});

//
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

//
app.listen(3000, () => {
    console.log("hi");
})
