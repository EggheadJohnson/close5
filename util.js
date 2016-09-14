module.exports = {
	findDistance: function(lat1, lon1, lat2, lon2){

		var R = 3959, // mean Earth radius in miles
			lat1 = parseFloat(lat1, 10)*Math.PI/180,
			lon1 = parseFloat(lon1, 10)*Math.PI/180,
			lat2 = parseFloat(lat2, 10)*Math.PI/180,
			lon2 = parseFloat(lon2, 10)*Math.PI/180,
			latDiff = lat2 - lat1,
			lonDiff = lon2 - lon1,
			a, b, c;

		a = Math.sin(latDiff/2) * Math.sin(latDiff/2)
			+ Math.cos(lat1) * Math.cos(lat2)
			* Math.sin(lonDiff/2) * Math.sin(lonDiff/2);
		b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		c = R * b;

		return c;
	}
}
