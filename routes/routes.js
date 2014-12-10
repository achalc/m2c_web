
var mongo = require("../models/log.js");


exports.index = function(req, res) {
  res.render('index', {title: 'Welcome!'})
};

exports.log = function(req, res) {
  res.render('log', {title: 'Log Event'})
};

exports.login = function(req, res) {
	res.render('login', {title: 'Login to the System'});
	res.end();
};

exports.send = function(req, res) {
	res.render('send', {title: 'Send Text Alert'});
	twilio.client.messages.create();
};

exports.light = function(req, res) {
	res.render('lighting', {title: 'Control Lighting'});
};

exports.mongo = function(req, res){
  /*
   * The path parameters provide the operation to do and the collection to use
   * The query string provides the object to insert, find, or update
   */
	switch (req.params.operation) {
		case 'insert':	console.log("req.query is "+JSON.stringify(req.query));
		                mongo.insert( req.params.collection, 
		                              req.query,
		                              function(model) {
		                                res.render('lighting', {title: 'New Log', obj: model});
		                                }
		                              );
		                console.log("at end of insert case");
									 	break;
		case 'lightOn':	mongo.insert( req.params.collection, 
		                              req.query,
		                              function(model) {
              											res.render('lighting',{title: 'Log Updated', obj: model});
		                                }
		                              );
									 	break;
		case 'lightOff':	mongo.insert( req.params.collection, 
		                              req.query,
		                              function(model) {
              											res.render('lighting',{title: 'Log Updated', obj: model});
		                                }
		                              );
									 	break;

		case 'find':		mongo.find( req.params.collection, 
		                              req.query,
		                              function(model) {
              											res.render('mongo',{title: 'Log Found', obj: model});
              											res.json(obj);
		                                }
		                              );
									 	break;
		case 'update':	mongo.update( req.params.collection, 
		                              req.query,
		                              function(model) {
              											res.render('success',{title: 'Log Updated', obj: model});
		                                }
		                              );
									 	break;
		}
	}
	

// In the case that no route has been matched
exports.errorMessage = function(req, res){
  var message = '<p>Error, did not understand path '+req.path+"</p>";
	// Set the status to 404 not found, and render a message to the user.
  res.status(404).send(message);
};