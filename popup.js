$(document).ready(function(){
	var currencies = undefined;
	//Fetches newest exchange rate
	function getLatestExt(){
		$.ajax({
			type: "GET",
			url: 'http://apis.is/currency/m5'
		}).done(function(data){
			enumerateSelect(data.results);
		})
	};
	//Do this once
	getLatestExt();
	//Builds the selection box
	function enumerateSelect(data){
		currencies = data;
			console.log(JSON.stringify(data.results));
			for(var i = 0; i < currencies.length; ++i){
					var currElement = $('#currencies');
				currElement.append($("<option>").attr('value',currencies[i].value).text(currencies[i].shortName));
			}
	}
});