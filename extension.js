$(document).ready(function(){
	/*var regex = new RegExp("\$?([0-9]{0,3},)*([0-9]{0,3})(\.[0-9]{2})?$')","gi");
	var elementsFound = $("*:contains(regex)");
	console.log(elementsFound.length);
	console.log(elementsFound[0]);
*/
	$('body *').each(function(){                                                                                                                               
	    var obj = $(this).text();
	    var match = obj.match(/^\$\d+(?:\.\d+)?\s*$/);
	    if(match){
	    	var number = Number(obj.replace(/[^0-9\.]+/g,""));
	    	$(this).append('<div class="messagepop pop"><p>'+(number*120)+'isk</p></div><a href="#" id="peningar">ISK</a>');
	    }                                                                                                                                   
	});


	function deselect() {
	    $(".pop").slideFadeToggle(function() { 
	        $("#peningar").removeClass("selected");
	    });    
	}

	$(function() {
	    $("#peningar").on('click', function() {
	        if($(this).hasClass("selected")) {
	            deselect();               
	        } else {
	            $(this).addClass("selected");
	            $(".pop").slideFadeToggle();
	        }
	        return false;
	    });

	   
	});

	$.fn.slideFadeToggle = function(easing, callback) {
	    return this.animate({ opacity: 'toggle', height: 'toggle' }, "fast", easing, callback);
	};

});