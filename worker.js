self.onmessage = function(e) {
	console.log('Message received from main script');
	let alpha = parseFloat(e.data[0]);
	let data_value = e.data[1];
	let forecast = e.data[2];
	var temp;
	for (var i = 1; i < data_value.length; i++) {
		temp = parseFloat(alpha * (data_value[i])) + ((1 - alpha) * (forecast[i-1]));
		forecast[i] = temp;
	}
	var b = [data_value,forecast,alpha,data_value.length];
	console.log('Posting message back to main script');
	postMessage(b);
}