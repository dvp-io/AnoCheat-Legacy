// ==UserScript==
// @name          Geck'SpArrow - DVP I/O
// @author	      Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://dl.dvp.io/anocheat/GeckSPArrow.user.js
// @description   Ajoute des flèches qui facilitent l'accès visuel aux interventsion sur le chat
// @include       http://chat.developpez.com/
// @version       2014.10.23.1
// @downloadURL   http://dl.dvp.io/anocheat/GeckSPArrow.user.js
// @updateURL     http://dl.dvp.io/anocheat/GeckSPArrow.user.js
// @website       http://www.dvp.io
// ==/UserScript==
 
var getGlobal = function(callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
};
 
var main = function() {
  $("#identAction").on("click",function() {
    
    $(document).ajaxComplete(function(event, xhr, settings) {
      
      var imgInc = 'http://media.dvp.io/anocheat/16x16_message_incoming_orange.png';
      var imgOut = 'http://media.dvp.io/anocheat/16x16_message_outgoing_blue.png';
      var imgInf = 'http://media.dvp.io/anocheat/16x16_message_info.png';
      
      if(settings.url == 'ajax.php') {
        
        var data = $.parseJSON(xhr.responseText);
        
        if(data.salon != ''){
          
          var selector = "#conversation0";
          var entry = data.salon;
	  		 
        } else if(data.pvs != ''){
          
          // Pour les MP on affiche pas les flèches (comportement natif)
          return;
          var selector = '#conversation'.concat(data.pvs[0].id);
          var entry = data.pvs[0].html;
          
        } else {
          
          // Si on est pas en conv c'est une erreur on skip
          return;
          
        }
        
        var conv = $(selector).html().toString();
        entry = entry.replace('<br />','<br>');
        if (entry.match(/images\/fleche.png/)) {
          $(selector).html(conv.replace('images/fleche.png',imgInc));
        } else {
          if ($(entry).text().indexOf("[" + pseudo + "]:") === 0) {
            var rep = conv.replace(entry, '<img src="' + imgOut + '" title="" alt="" />'.concat(entry));
          } else {
            var rep = conv.replace(entry, '<img src="' + imgInf + '" title="" alt="" />'.concat(entry));
          }
          $(selector).html(rep);
        }
        
      }
     
    });
    
  });
};
 
getGlobal(main);
