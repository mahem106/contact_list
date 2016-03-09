'use strict';

const listFilename = './list.json';
const PORT = 3333;

var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var path = require('path');

var app = express();

app.use (morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res) {
  var indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.get('/style.css', function(req, res, next){
  res.sendFile(path.join(__dirname, './style.css'));
});

app.get('/main.js', function(req, res, next){
  res.sendFile(path.join(__dirname, './main.js'));
});

app.get('/list', function(req, res) {
  fs.readFile(listFilename, function(err, data) {
    var list = JSON.parse(data);
    res.send(list);
  });
});

app.post('/list', function(req, res) {
  fs.readFile(listFilename, function(err, data) {
    var list = JSON.parse(data);
    list.push(req.body);
  fs.writeFile(listFilename, JSON.stringify(list), function(err) {
    console.error(err);
    res.end();
    });
  })
})

// app.put('/list/:index', function (req, res) {
//   fs.readFile(listFilename, function(err, data) {
//     var list = JSON.parse(data);
//     res.send('PUT request to homepage');
// });

app.delete('/list/:index', function (req, res) {
  fs.readFile(listFilename, function(err, data) {
    var list = JSON.parse(data);
    list.splice(req.params.index, 1);
    fs.writeFile(listFilename, JSON.stringify(list), function(err) {
      console.error(err);
      res.end();
    });
  })
})

var server = http.createServer(app);

server.listen(PORT, function() {
console.log(`Server listening on port ${PORT}`);
})
