$(document).ready(function(){
	var currencies = undefined;
	function getLatestExt(){
		$.ajax({
			type: "GET",
			url: 'http://apis.is/currency/m5'
		}).done(function(data){
			currencies = data.results;
			console.log(JSON.stringify(data.results));
			for(var i = 0; i < currencies.length; ++i){
					var currElement = $('#currencies');
				currElement.append($("<option>").attr('value',currencies[i].value).text(currencies[i].shortName));
			}
		})
	};
	//Do this once
	getLatestExt();

});