// ==UserScript==
// @name          Notifier - DVP I/O
// @author        Antoine `Gecko` Pous <gecko@dvp.io>
// @contributor   Shikiryu
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-notify
// @description   Permet d'être notifié en cas de nouveau message qui vous est destiné
// @include       http://chat.developpez.com/
// @version       2015.03.26.2
// @downloadURL   http://dl.dvp.io/anocheat/Notify.user.js
// @updateURL     http://dl.dvp.io/anocheat/Notify.user.js
// @website       http://www.dvp.io
// ==/UserScript==

function getGlobal(callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
  script.id = callback.name;
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}
 
function Notifier() {

  var sound   = new Audio('http://media.dvp.io/anocheat/sounds/bleep.wav'),
      arrows  = 1, // merci le "Bonjour" d'entrée :) on le compte d'avance pour éviter le *bip*
      tabs    = 0,
      play    = true;
  
  // Ajout du bouton à la place du lien
  $("#barreOutils").append(
    $('<input />')
      .addClass('bouton')
      .attr({'type':'button','value':'Bip','id':'shikisound'})
      .click(function() {
        if(play){
          play = false;
          $(this).css({textDecoration: 'line-through'});
        }else{
          play = true;
          $(this).css({textDecoration: 'none'});
          sound.play();
        }  
      })
      .css({'background': '#729648 url(http://media.dvp.io/anocheat/01x18_button_green.png) repeat-x 0 0', 'border': '1px solid green', 'box-shadow': '0px 1px 2px #000, inset 0 .4em rgba(255,255,255,.07), inset 0 -1px 1px #459042' })
  );
  
  function checkNotifs() {
    
    if (play) {
      
      var tmp_tabs = $('.ongletMessage').length;
      var tmp_arrows = $('#conversation0 img[src="images/fleche.png"]').length;
      
      if (tmp_arrows || tmp_tabs) {
        
        if (tmp_arrows > arrows) {
          
          sound.play();
          arrows = tmp_arrows;
          
        }
        
        if (tmp_tabs > tabs) {
          
          sound.play();
          tabs = tmp_tabs;
          
        }
        
      }
      
    }
    
  }

  $(document).ajaxComplete(function(){ checkNotifs(); });	
}

getGlobal(Notifier);
