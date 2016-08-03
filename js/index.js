var listOfPins = [];
jQuery(document).ready(function($){
	getPinList($);
	$("#loginbutton").click(function(e){
	    login($);
	});
	$('#pinfield').keydown(function(e) {
	    if (e.keyCode == 13) {
	        $("#loginbutton").click();
	    }
	});
});

function login($){
	$("#invalid").hide();
	var pin = $('#pinfield').val();
	if(listOfPins.indexOf(pin) != -1)
		window.location = "dashboard.html?pin="+pin;
	else{
		$("#invalid").show();
		$("#pinfield").css({"border" : "1px solid red", "color" : "red"});
	}
}

function getPinList($){
	var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1prgXGGQZbzaK-HqATOvbdzi17TkhUUA0gFnEja2QV5E/edit#gid=0';
	$('#alldata').sheetrock({
	  url: mySpreadsheet,
	  query: "SELECT C",
	  callback: function(error){
	  	traverseDataTable();
	  }
	});
}

function traverseDataTable(){
	var pin = getParameterByName('pin');
	var pinFlag = false;
	$('#alldata > tbody  > tr').each(function() {
		var tableData = $(this).find('td');
		if (tableData.length > 0) {
			tableData.each(function() { 
				if(listOfPins.indexOf($(this).text()) == -1)
					listOfPins.push($(this).text());
			});
		}		
	});
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Array.prototype.inArray = function(comparer) { 
    for(var i=0; i < this.length; i++) { 
        if(comparer(this[i])) return true; 
    }
    return false; 
}; 

Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(comparer)) {
        this.push(element);
    }
}; 