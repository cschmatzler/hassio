#!/usr/bin/env node

var ghoma = require('./ghoma.js');
var express = require('express');
var app = express();

app.use(express.json());

var httpPort = 3000;    // Express http listening port
var ghomaPort = 4196;   // G-Homa default port
var plugStatus = {};

app.get('/list', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var plugs = [];
  ghoma.forEach(function(plug) { plugs.push(plug); });
  res.send(JSON.stringify(plugs));
});

app.get('/plug/:id', function (req, res) {
    var plug = ghoma.get(req.params.id);
    if ( plug ) {
      var str = {
          "is_active": plugStatus[plug.id] === "on"
      };
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(str));
    } else {
      res.sendStatus(404);
    }
});

app.post('/plug/:id', function (req, res) {
  var plug = ghoma.get(req.params.id);
  if ( plug ) {
     console.log(req.params.id, req.body.active);
     if ( req.body.active === "true") {
	plug.on();
	plugStatus[plug.id] = "on";
     } else {
 	plug.off();
	plugStatus[plug.id] = "off";
     }
     var str = {
         "is_active": plugStatus[plug.id] === "on"
     };
     console.log(str);
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify(str));
  } else {
    res.sendStatus(404);
  }
});


ghoma.onNew = function(plug) {
  setTimeout(function() {
    plugStatus[plug.id] = plug.state; 
    console.log(plugStatus);
  }, 4000);
}

ghoma.startServer(ghomaPort);

app.listen(httpPort, function () {
  console.log('ghoma express example app start listening on port '+httpPort+' for http requests.');
});

