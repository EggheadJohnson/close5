var express = require('express'),
	dataSvc = require('./dataSvc'),
	status;

app = express()
	.use(function(req, res, next){
		status = req.query.status || ['tos', 'removed'];
		next();
	})
	.get('', function(req, res, next){
		res.sendFile(__dirname+'/index.html');
	})
	.get('/date', function(req, res, next){
		if (['oldest', 'newest'].indexOf(req.query.sortOrder) < 0) res.status(400).json({msg: "invalid sort order"});
		else res.status(200).json(dataSvc.date(req.query.sortOrder, req.query.max, status));
	})
	.get('/price', function(req, res, next){
		if (['highest', 'lowest'].indexOf(req.query.sortOrder) < 0) res.status(400).json({msg: "invalid sort order"});
		else res.status(200).json(dataSvc.price(req.query.sortOrder, req.query.max, status));
	})
	.get('/item/:itemID', function(req, res, next){
		var response = dataSvc.getSingle(req.params.itemID);
		if (!response) res.status(404).json({msg: "item not found"});
		else res.status(200).json(response);
	})
	.get('/getByUser/:userID', function(req, res, next){
		var response = dataSvc.getByUser(req.params.userID, req.query.max, status);
		if (!response || response.length === 0) res.status(404).json({msg: "user not found or has no items for sale"});
		else res.status(200).json(response);
	})
	.get('/getByLocation', function(req, res, next){
		if (!req.query.lat || !req.query.lon) res.status(400).json({msg: "latitude and longitude are both required"});
		else res.status(200).json(dataSvc.getByLocation(req.query.lat, req.query.lon, req.query.max, status));
	})
	.get('*', function(req, res, next){
		res.status(404).json({msg: "Not found"});
	});

app.listen(8080);
console.log(Date());
console.log('EE Node running on port 8080')
