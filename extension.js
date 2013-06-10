$(document).ready(function(){
	var currencies = [];
	//Fetches newest exchange rate
	function getLatestExt(){
		$.ajax({
			type: "GET",
			url: 'http://apis.is/currency/m5'
		}).done(function(data){
			currencies = data.results;
			$('body *').each(function(){                                                                                                                               
				var obj = $(this).text();
				var match = obj.match(/^\$\d+(?:\.\d+)?\s*$/);				
				if(match){
					var number = Number(obj.replace(/[^0-9\.]+/g,""));
					$(this).append('<span><div class="messagepop pop"><p>'+Math.round(currencies[0].value*number)+' Kr</p></div><a id="peningar"> <img src = "http://i.imgur.com/vgAwYLs.png" /> </a></span>');
				}                                                                                                                                   
			});
		})
	};
	//Do this once
	getLatestExt();


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