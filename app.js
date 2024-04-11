const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

const {JSDOM} = require("jsdom");
const {window} = new JSDOM();
const {document} = new JSDOM('').window;
global.document = document;

const $ = require("jquery")(window);

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
    (() => {
        console.log("functionTest");
        $.ajax({
            url : "https://test-rest-wgnk.onrender.com/test",
            type : "POST",
            dataType : "JSON",
            data : {"test1" : "test1"},
            success: function() {
                console.log("successsssss");
            },
            error: function() {
                console.log("failllllllll");
            }
        })
    })();
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