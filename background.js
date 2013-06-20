var date = new Date();
var currentDate = date.getUTCDay();
//Add to context Menu
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


//Fetches newest exchange rate
function getLatestExt(){
	$.ajax({
		type: "GET",
		url: 'http://apis.is/currency/m5'
	}).done(function(data){
		localStorage.updateDate = currentDate;
		localStorage.currency = JSON.stringify(data.results);
	})
};

//Check if information is outdated
if(localStorage.updateDate != currentDate){
	getLatestExt();
}
	getLatestExt();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.req == "currency")
      sendResponse({updateDate: currentDate, currency: localStorage.currency});
  });