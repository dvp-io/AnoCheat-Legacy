// ==UserScript==
// @name          AutoLogin - DVP I/O
// @author	  Antoine 'Gecko' Pous <gecko@dvp.io>
// @contributor 	'radicaldreamer'
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-autologin
// @description   Permet de se connecter automatiquement quand la page du chat est chargée.
// @include       http://chat.developpez.com/
// @version       2014.10.04.2
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

function mainFunction() {

  /**
   * AutoLogin
   */
  setTimeout(function(){
  	$("#identAction").click();
  },500);

  /**
   * Affichage de l'historique en fonction de la valeur du cookie
   */
  var autoBackNumber = lireCookie('AnoCheat_AutoBack');
  if(autoBackNumber != null){
  	effacerCookie('AnoCheat_AutoBack');
  	ecrireCookie('AnoCheat_AutoBack', autoBackNumber, 365);
  	setTimeout(function(){
	    $("#zoneSaisie").val('/back ' + autoBackNumber.toString());
	    $('#envoyer').trigger('click');
  	},3000);
  }  

  /**
   * Intégration dans le menu Options
   */
  setTimeout(function(){
  	if(autoBackNumber != null){
  		var appendAutoBack = '<p><input id="dlgOptAutoBack" type="checkbox" value="1"><label for="dlgOptAutoBack">Auto/Back<br><small>Cette option permet de restaure l\'historique de conversation</small><br /></label><input type="text" id="autoBackText" value="'+ autoBackNumber +'" /></p>';
  	}else{
  		var appendAutoBack = '<p><input id="dlgOptAutoBack" type="checkbox" value="1"><label for="dlgOptAutoBack">Auto/Back<br><small>Cette option permet de restaure l\'historique de conversation</small><br /></label><input type="text" id="autoBackText" value="30" /></p>';
  	}
  	$('#dialogueOptions p:nth-last-child(2)').prepend(appendAutoBack);
  	$('#dialogueOptions').css({overflow:'hidden', overflowY:'scroll', marginRight:'0px'});
  }, 3000);

  /**
   * Gestion de la sauvegarde
   */
  $('#dlgOptionsAction').on('click', function(){
  	if($('#dlgOptAutoBack').is(':checked')){
  		ecrireCookie('AnoCheat_AutoBack', $('#autoBackText').val(), 365);
  	}else{
  		effacerCookie('AnoCheat_AutoBack');
  	}
  });

}

getGlobal(mainFunction);
