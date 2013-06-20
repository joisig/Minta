function onLoad(){
	chrome.contextMenus.create({
		'title' : 'Breyta í ISK',
		'contexts' : ['page'],
		'onclick' : function(info, tab) {
			chrome.tabs.getSelected(null, function(tab) {
				console.log("Hello \n");
				chrome.tabs.sendMessage(tab.id, {"getlastMouseDown": true}, function(response) {
				});
			});
		}
	});
}
onLoad();