#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var dbRoutes = require('./routes/routes.js'); 
var morgan = require('morgan');
var app = express();

// Set the views directory
app.set('views', __dirname + '/views');

// Define the view (templating) engine
app.set('view engine', 'ejs');
app.use(morgan('tiny'));    // Log requests

// Routes
app.get('/', dbRoutes.index);
app.get('/login', dbRoutes.login);
app.get('/lighting', dbRoutes.light);
app.get('/log', dbRoutes.log);
app.get('/send', dbRoutes.send);
app.get('/:collection/:operation', dbRoutes.mongo);
app.get('/test', dbRoutes.test);

// Handle static files
app.use(express.static(__dirname + '/public'));
  
// Catch any routes not already handed with an error message
app.use(dbRoutes.errorMessage);



var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 50000;

//  Start listening on the specific IP and PORT
app.listen(port, ipaddress, function() {
  console.log('%s: Node server started on %s:%d ...',
               Date(Date.now() ), ipaddress, port);
               });