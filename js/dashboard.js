jQuery(document).ready(function($){
	validateCredentials();
	initializeAllData($);
});

function initializeSpreadSheet($){
	var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1prgXGGQZbzaK-HqATOvbdzi17TkhUUA0gFnEja2QV5E/edit#gid=0';
	var pin = getParameterByName('pin');
	$('#loadtable').sheetrock({
	  url: mySpreadsheet,
	  query: "SELECT A,B,D,F WHERE C = '"+pin+"'",
	  callback: function(error){
	  }
	});
}

function initializeAllData($){
	var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1prgXGGQZbzaK-HqATOvbdzi17TkhUUA0gFnEja2QV5E/edit#gid=0';
	$('#alldata').sheetrock({
	  url: mySpreadsheet,
	  query: "SELECT *",
	  callback: function(error){
	  	traverseDataTable();
	  	initializeSpreadSheet($);
	  }
	});
}

function traverseDataTable(){
	var myTableArray = [];
	var pin = getParameterByName('pin');
	var pinFlag = false;
	$('#alldata > tbody  > tr').each(function() {
		var arrayOfThisRow = [];
		var tableData = $(this).find('td');
		if (tableData.length > 0) {
			tableData.each(function() { 
				arrayOfThisRow.push($(this).text()); 
				if($(this).text() == pin)
					pinFlag = true;
			});
        	myTableArray.push(arrayOfThisRow);
		}		
	});
	if(!pinFlag){ 
		$("#noitems").show();
		$('#loadtable').hide();
	}
	else {
		$('#loadtable').show();
		$("#noitems").hide();
	}
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

function validateCredentials(){
	var pin = getParameterByName('pin');
	if(pin == null)
		window.location = "index.html";
}
