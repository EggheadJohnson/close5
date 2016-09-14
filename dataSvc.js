var data = require('./mockData'),
	util = require('./util');

module.exports = {
	date: function(sortOrder, max, status){
		return data.filter(function(item){
			return status.indexOf(item.status) >= 0;
		}).sort(function(a, b){
			if (sortOrder === 'oldest') return a.createdAt-b.createdAt;
			else if (sortOrder === 'newest') return b.createdAt-a.createdAt;
		}).slice(0, max);
	},
	price: function(sortOrder, max, status){
		return data.filter(function(item){
			return status.indexOf(item.status) >= 0;
		}).sort(function(a, b){
			if (sortOrder === 'highest') return a.price-b.price;
			else if (sortOrder === 'lowest') return b.price-a.price;
		}).slice(0, max);
	},
	getSingle: function(itemID, max, status){
		return data.find(function(item){
			return item.id === itemID;
		});
	},
	getByUser: function(userID, max, status){
		return data.filter(function(item){
			return status.indexOf(item.status) >= 0;
		}).filter(function(item){
			return item.userId === userID;
		}).slice(0, max);
	},
	getByLocation: function(lat, lon, max, status){
		return data.filter(function(item){
			return status.indexOf(item.status) >= 0;
		}).filter(function(item){
			return util.findDistance(lat, lon, item.loc[0], item.loc[1]) < 50;
		}).slice(0, max) || [];
	}
}
