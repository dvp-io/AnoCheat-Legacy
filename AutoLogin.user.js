// ==UserScript==
// @name          AutoLogin - DVP I/O
// @author	  Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-autologin
// @description   Permet de se connecter automatiquement quand la page du chat est chargée.
// @include       http://chat.developpez.com/
// @version       2014.10.04.1
// @downloadURL   http://dl.dvp.io/anocheat/AutoLogin.user.js
// @updateURL     http://dl.dvp.io/anocheat/AutoLogin.user.js
// @website       http://www.dvp.io
// ==/UserScript==
function getGlobal(callback) {
	
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
	
}

function autoLogin() {
  setTimeout(function(){
    $("#identAction").click();
  },500);
}

getGlobal(autoLogin);
