$(document).ready(function(){
	var regex = new RegExp("\$?([0-9]{0,3},)*([0-9]{0,3})(\.[0-9]{2})?$')","gi");
	var elementsFound = $("*:contains(regex)");
	console.log(elementsFound.length);
	console.log(elementsFound[0]);
});