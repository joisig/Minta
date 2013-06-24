$(document).ready(function(){
	var currencies = [];
	var clickedElement = {};

	//Fetches newest exchange rate
	function getLatestExt(){
		chrome.runtime.sendMessage({req: "currency"}, function(response) {
			currencies = JSON.parse(response.currency);
		  /*
			$('body *').each(function(){                                                                                                                               
				var obj = $(this).text();
				var match = obj.match(/^\$\d+(?:\.\d+)?\s*$/);				
				if(match){
					var number = Number(obj.replace(/[^0-9\.]+/g,""));
					$(this).append('<span><div class="messagepop pop"><p>'+Math.round(currencies[0].value*number)+' Kr</p></div><a id="peningar"> <img src = "http://i.imgur.com/vgAwYLs.png" /> </a></span>');
				}                                                                                                                                   
			});
		*/
	})
	};
	//Do this once
	getLatestExt();

	$(document).on('mousedown', function(event){
		clickedElement = $(event.target);
	})

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.req == "convert"){
				var obj = clickedElement.text();
				var match = obj.match(/^\$\d+(?:\.\d+)?\s*$/);
				if(match){
					var number = Number(obj.replace(/[^0-9\.]+/g,""));
					var currElement = $('#local');
					//currElement.val(number);
					//console.log(number);
					clickedElement.append('<span><div class="messagepop pop"><p>'+Math.round(currencies[0].value*number)+' Kr</p></div></span>');
				}   
			}
		});


	function deselect(element) {
		element.slideFadeToggle(function() { 
			element.next().removeClass("selected");
		});    
	}

	$(function() {
		$(document).on('click','#peningar', function() {
			var tooltip = $(this).prev();
			if(tooltip.hasClass("selected")) {
				deselect(tooltip);               
			} else {
				tooltip.addClass("selected");
				tooltip.css('top',$(this).position().top+20);
				tooltip.css('left',$(this).position().left);
				tooltip.slideFadeToggle();
			}
			return false;
		});


	});

	$.fn.slideFadeToggle = function(easing, callback) {
		return this.animate({ opacity: 'toggle', height: 'toggle' }, "fast", easing, callback);
	};

});