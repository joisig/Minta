$(document).ready(function(){
	var currencies = undefined;
	var selectedCurr = undefined;
	var selectedTax  = undefined;
	var json = undefined;
	var record = undefined;
	
	$.getJSON('http://mintaconverter.appspot.com', function(data) {
		json = data;
		for (var i = 0; i < json.records.length; i++){
			var  record = json.records[i];
			console.log(record.vat);
		}
		
		
	});



	//Fetches newest exchange rate
	function getFromBackground(){
		chrome.runtime.sendMessage({req: "currency"}, function(response) {
		  currencies = JSON.parse(response.currency);
		  buildCurrencyOptions(currencies);
		  buildImportDutiesOptions(null);
		});
	}

	getFromBackground();

	//Builds the selection box
	function buildCurrencyOptions(data){
		currencies = data;
		for(var i = 0; i < currencies.length; ++i){
			var currElement = $('#currencies');
			currElement.append($("<option>").attr('value',currencies[i].shortName).text(currencies[i].shortName));
		};
	 	selectedCurr = data[0];
	}

	function buildImportDutiesOptions(data){
		for (var i = 0; i < tax.length; i++) {
			var currElement = $('#categories');
			currElement.append($("<option>").attr('value',tax[i].name).text(tax[i].name));
		};
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
		calculateTax();
	})

	//What happens when we change the local amount
	$('#local').on('keyup',function(){
		var value = $(this).val();

		$('#foreign').val((value/selectedCurr.value).toFixed(2));
		calculateTax();
	})

	$('#categories').change(function(){
		calculateTax();
	})

	function calculateTax(){
		var value = $('#categories').find(":selected");

		if(value.attr('value') === "none"){
			$("withTax").html("");
			return;
		}

		for (var i = 0; i < tax.length; i++) {
			if(value.attr('value') === tax[i].name){
				selectedTax = tax[i];
				var currentPrice = $('#local').val();
				if(selectedTax.tax){
					$('#tax').text(((currentPrice*selectedTax.tax)-currentPrice).toFixed(0));
					currentPrice = currentPrice*selectedTax.tax;
				}
				$('#vat').html(((currentPrice*selectedTax.vat)-currentPrice).toFixed(0));
				currentPrice = currentPrice*selectedTax.vat;
				$("#withTax").text(currentPrice.toFixed(0));
			}
		};
	}
	});