$(document).ready(function(){
	var currencies = undefined;
	var selectedCurr = undefined;
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
		console.log(JSON.stringify(data));
		for(var i = 0; i < currencies.length; ++i){
			var currElement = $('#currencies');
			currElement.append($("<option>").attr('value',currencies[i].shortName).text(currencies[i].shortName));
		};
	 	selectedCurr = data[0];
	}
	//What happens when we change the currency type.
	$('#currencies').change(function(){
		var value = $(this).find(":selected").text();
		for(var i = 0; i < currencies.length; ++i){
			if(value === currencies[i].shortName){
				selectedCurr = currencies[i];
				var loc = $('#local').val();
				$('#foreign').val((loc/selectedCurr.value).toFixed(2));
				break;
			}
		}
	})
	//What happens when we change the foreign amount
	$('#foreign').on('keyup',function(){
		var value = $(this).val();
		$('#local').val((value*selectedCurr.value).toFixed(0));
	})
	//What happens when we change the local amount
	$('#local').on('keyup',function(){
		var value = $(this).val();
		$('#foreign').val((value/selectedCurr.value).toFixed(2));
	})
});