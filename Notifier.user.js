// ==UserScript==
// @name          Notifier - DVP I/O
// @author        Antoine `Gecko` Pous <gecko@dvp.io>
// @contributor   Shikiryu
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-notify
// @description   Permet d'être notifié en cas de nouveau message qui vous est destiné
// @include       http://chat.developpez.com/
// @version       2015.04.10.1
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


  var options = {
        soundFile: 'bleep.wav',
        alertFile: 'tardis.wav',
        playSound: true,
        playAlert: true,
      },
      arrows = 1,
      tabs   = 0;
  
  var updateCookie = function(options) {
    var tmp_cookie = lireCookie('AnoCheat') != null ? JSON.parse(lireCookie('AnoCheat')) : {};
    tmp_cookie.notifier = options;
    ecrireCookie('AnoCheat', JSON.stringify(tmp_cookie), 365);
  }
  
  if(jQuery('#identMemoriser').is(':checked') && lireCookie('AnoCheat') != null) {
    var cookie = JSON.parse(lireCookie('AnoCheat'));
    if (typeof(cookie.notifier) != "undefined") {
      options = cookie.notifier;
    }
  }
  
  var soundNotif = new Audio('http://media.dvp.io/anocheat/sounds/' + options.soundFile),
      soundAlarm = new Audio('http://media.dvp.io/anocheat/sounds/' + options.alertFile);
  
  
  $("#barreOutils").append(
    $('<input />')
      .addClass('bouton')
      .attr({'type':'button','id':'shikisound'})
      .val(function() {
        if (options.playSound) {
          var val = 'Bip';
          $(this).css({textDecoration: 'none'});
        } else if (!options.playSound && $('#modcp').is(':visible') && options.playAlert) {
          var val = 'Alert';
          $(this).css({textDecoration: 'none'});
        } else {
          var val = 'Bip';
          $(this).css({textDecoration: 'line-through'});
        }
        return val;
      })
      .click(function() {
        
        if(options.playSound) {
          
          options.playSound = false;
          if ($('#modcp').is(':visible')) {
            $(this).val('Alert');
          } else {
            $(this).css({textDecoration: 'line-through'});
          }
          
        } else if (!options.playSound && $('#modcp').is(':visible') && options.playAlert) {
          
          options.playAlert = false;
          $(this).val('Bip');
          $(this).css({textDecoration: 'line-through'});
          
        } else {
          
          options.playSound = true;
          options.playAlert = true;
          $(this).css({textDecoration: 'none'});
          soundNotif.play();
          
        }
        
        updateCookie(options);
      })
      .css({'background': '#729648 url(http://media.dvp.io/anocheat/01x18_button_green.png) repeat-x 0 0', 'border': '1px solid green', 'box-shadow': '0px 1px 2px #000, inset 0 .4em rgba(255,255,255,.07), inset 0 -1px 1px #459042' })
  );
  
  function checkNotifs(is_alert) {
    
    if (options.playAlert && is_alert) {
      
        soundAlarm.play();
        
    }
    
    if (options.playSound) {
      
      var tmp_tabs = $('.ongletMessage').length;
      var tmp_arrows = $('#conversation0 img[src$="fleche.png"], #conversation-1 img[src$="fleche.png"], #conversation0 img[src$="incoming.png"], #conversation-1 img[src$="incoming.png"]').length;
        
      if (tmp_arrows || tmp_tabs) {
          
        if (tmp_arrows > arrows) {
            
          soundNotif.play();
          arrows = tmp_arrows;
            
        }
          
        if (tmp_tabs > tabs) {
            
          soundNotif.play();
          tabs = tmp_tabs;
          
        }
        
      }
      
    }
    
  }

  $(document).ajaxComplete(function(event, xhr, settings){
    
    if(settings.url == 'ajax.php') {
      
      var data = $.parseJSON(xhr.responseText);
      
      if(data.pvs.length > 0) {
        
        if (data.pvs.id == '-1') {
          
          if (data.pvs[0].html.match(/(\[Alerte aux modérateurs\])/gi)) {
            
            checkNotifs(true);          
          
          }
        
        }
        
      } else {
      
        checkNotifs(false);
    
      }
      
    }
    
  });	
}

getGlobal(Notifier);
