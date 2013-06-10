$(document).ready(function(){
	$('body *').each(function(){                                                                                                                               
	    var obj = $(this).text();
	    var match = obj.match(/^\$\d+(?:\.\d+)?\s*$/);
	    if(match){
	    	var number = Number(obj.replace(/[^0-9\.]+/g,""));
	    	$(this).append('<span><div class="messagepop pop"><p>'+(number*120)+'isk</p></div><a id="peningar">ISK</a></span>');
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
	            tooltip.slideFadeToggle();
	        }
	        return false;
	    });

	   
	});

	$.fn.slideFadeToggle = function(easing, callback) {
	    return this.animate({ opacity: 'toggle', height: 'toggle' }, "fast", easing, callback);
	};

});