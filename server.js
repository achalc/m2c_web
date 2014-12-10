#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var dbRoutes = require('./routes/routes.js'); 
var morgan = require('morgan');
var app = express();
var self = this;
self.app = express();

// Set the views directory
self.app.set('views', __dirname + '/views');

// Define the view (templating) engine
self.app.set('view engine', 'ejs');
self.app.use(morgan('tiny'));    // Log requests

// Routes
self.app.get('/', dbRoutes.index);
self.app.get('/login', dbRoutes.login);
self.app.get('/lighting', dbRoutes.light);
self.app.get('/log', dbRoutes.log);
self.app.get('/send', dbRoutes.send);
self.app.get('/:collection/:operation', dbRoutes.mongo);

// Handle static files
self.app.use(express.static(__dirname + '/public'));
  
// Catch any routes not already handed with an error message
self.app.use(dbRoutes.errorMessage);



var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 50000;

//  Start listening on the specific IP and PORT
self.app.listen(port, ipaddress, function() {
  console.log('%s: Node server started on %s:%d ...',
               Date(Date.now() ), ipaddress, port);
               });