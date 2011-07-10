/*////////////////////////////////////////////////////////////////////////
//																		//
// EasyJump (c) 2011 sojingle.net all rights reserved.					//
//																		//
////////////////////////////////////////////////////////////////////////*/

var extension;
var Settings;
var rules;

function init() {

	extension = chrome.extension.getBackgroundPage();
	Settings = extension.Settings;
	rules = Settings.getObject("rules");

	initUI();
}

function initUI() {

	// open in background when press enter
	$("#symbolText")[0].addEventListener("keydown", function(event) {
		if(event.keyCode == 13) {
			openBackground();
		}
	});

	$("#symbolText").focus();
}

function openBackground() {

	var symbol = $("#symbolText")[0].value;

	var url = getUrl(symbol);

	if(!url) {
		return;
	}

	chrome.tabs.create({
		'url': url,
		'selected':false 
	});

	closeWindow();
}

function openForeground() {

	var symbol = $("#symbolText")[0].value;
	var url = getUrl(symbol);

	if(!url) {
		return;
	}

	chrome.tabs.create({
		'url': url
	});

	closeWindow();
}

function getUrl(symbol) {
	if(!rules) {
		return undefined;
	}

	for(var i = 0; i < rules.length; i++) {
		var rule = rules[i];

		var regexp = new RegExp("\\b"+rule[1]);
		var replaceUrl = rule[2];

		if(regexp.test(symbol)) {
			var url = symbol.replace(regexp, replaceUrl);

			if(url.indexOf('://') == -1)
				url = 'http://' + url;

			return url;
		}
	}
}

function closeWindow() {
	window.close();
}

