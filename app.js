const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require('path');
const axios = require('axios');

const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.listen(port, () => {
    console.log(`Started ${port}`);
})

app.post('/test', function(req, res) {
    console.log('debug: /test');

    //Test Axios Start
    const testAxiosData = {
        key1: 'value1',
        key2: 'value2'
    }

    axios.post('http://127.0.0.1:5500/test', testAxiosData)
    .then(function (res) {
        console.log("요청 성공");
        console.log("응답 데이터 - ", res.data)
    })
    .catch(function(error) {
        console.log("요청 실패", error)
    })
    //Test Axios End

    return res.status(200).json({});
});

app.post('/save', function(req, res) {
    console.log('debug: /save');
    
    return res.status(200).json({});
});

app.post('/publish', function(req, res) {
    console.log('debug: /publish');
    
    return res.status(200).json({});
});

// app.post('/validate', function(req, res) {
//     console.log('debug: /validate');
    
//     console.log(req.body);

//     return res.status(400).json({ "error" : "필수값이없" });
//     // return res.status(500).json({ "error" : "서버에서오" });
//     // return res.status(200).json({});
// });

app.post('/validate', function(req, res) {
    console.log('debug: /validate');

    // Get the error message from the request body or set a default one
    const errorMessage = req.body.error || "An error occurred.";

    // Return the error message as JSON response
    // return res.status(400).json({ "message": errorMessage });
    return res.status(200).json({ "message" : "app.js - validate - success" });
});


app.post('/stop', function(req, res) {
    console.log('debug: /stop');
    
    return res.status(200).json({});
});

app.post('/execute', function(req, res) {
    console.log('debug: /execute');
    
    console.log(req.body);
    
    return res.status(200).json({});
});