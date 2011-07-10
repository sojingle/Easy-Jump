/*////////////////////////////////////////////////////////////////////////
//																		//
// EasyJump (c) 2011 sojingle.net all rights reserved.					//
//																		//
////////////////////////////////////////////////////////////////////////*/

var extension;
var Settings;
var DefaultRules;

function init() {

	extension = chrome.extension.getBackgroundPage();
	Settings = extension.Settings;
	DefaultRules = extension.DefaultRules;

	loadOptions();
}

function saveOptions() {

	//Jump Rules
	var rules = new Array();
	var rows = $("#rulesTable .ruleRow");
	for(var i = 0; i < rows.length; i++) {
		var row = rows[i];

		var name = row.getElementsByClassName("ruleName")[0].value;
		var symbol = row.getElementsByClassName("symbolPattern")[0].value;
		var replaceUrl = row.getElementsByClassName("replaceUrl")[0].value;
		var ruleType = "r";

		var rule = new Array(name, symbol, replaceUrl, ruleType);

		rules[i] =rule;
	}

	Settings.setObject("rules", rules);

	// Update status to let user know options were saved.
	showTooltip("Option saved.");

	loadOptions();
}

// Load options from localStorage.
function loadOptions() {

	// Jump Rules
	var rules = Settings.getObject("rules");
	loadRulesOption(rules);	
}

function loadRulesOption(rules) {

	if(!rules) {
		return;
	}
	// clear rules
	var rows = $("#rulesTable .ruleRow");
	rows.remove();
	// append rules
	var rulesTable = $("#rulesTable");
	for (var i = 0; i < rules.length; i++) {
		var rule = rules[i];

		var ruleRow = generateRuleRow(rule[0], rule[1], rule[2]);
		rulesTable.append(ruleRow);
	}
}

// Restore options from default file.
function restoreOptions() {

	var restore = confirm("Restore will set all the rules to default, sure to continue?");
	if(restore == true) {
		Settings.setValue("rules", DefaultRules);
		loadOptions();
		showTooltip("Option Restored.");
	}
}

function generateRuleRow(name, symbol, replaceUrl) {
	var ruleRow = '<tr class="ruleRow">';
	ruleRow += '<td><input class="ruleName" type="text" value="' + name + '"/></td>';
	ruleRow += '<td><input class="symbolPattern" type="text" value="' + symbol + '"/></td>';
	ruleRow += '<td><input class="replaceUrl" type="text" value="' + replaceUrl + '"/></td>';
	ruleRow += '<td><button class="removeButton" onclick="deleteRow()">Delete</button></td></tr>';

	return ruleRow;
}

function newRow() {
	var ruleRow = generateRuleRow('','','');
	$("#rulesTable").append(ruleRow);
}

function deleteRow() {
	var row = event.target.parentNode.parentNode;
	$(row).remove();

	saveOptions();
	loadOptions();
}

function closeWindow() {
	window.close();
}

function showTooltip(text) {
	var status = document.getElementById("status");
	status.innerHTML = text;
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}

