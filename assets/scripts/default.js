/*////////////////////////////////////////////////////////////////////////
//																		//
// EasyJump (c) 2011 sojingle.net all rights reserved.					//
//																		//
////////////////////////////////////////////////////////////////////////*/

var DefaultRules = '[["Bilibili","av[0-9]+","bilibili.tv/$&","r"],["Nico","sm[0-9]+","www.nicovideo.jp/watch/$&","r"],["Acfun","ac[0-9]+","acfun.tv/$&","r"],["115","115(.+)","u.115.com/file/$1","r"],["Youtube","tube(.+)","www.youtube.com/watch?v=$1","r"]]';

var details = chrome.app.getDetails();

var currVersion = details.version;
var prevVersion = Settings.getValue('version');

// Check if the version has changed.
if(currVersion != prevVersion) {

	// Check if just installed this extension.
	if (typeof prevVersion == 'undefined') {
		// on install
		Settings.setValue("rules", DefaultRules);
	} else {
		// on update
	}
	Settings.setValue('version', currVersion);
}
