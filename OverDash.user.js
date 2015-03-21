// ==UserScript==
// @name          OverDash - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @contributor   Cédric `Golgotha29` Salaun <cedric.salaun@gmail.com>
// @licence       BEER-WARE (rev 42) https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-overdash
// @description   Ajoute une ligne en pointillé là où vous vous êtes arrêté de lire
// @include       http://chat.developpez.com/
// @version       2015.03.12.1
// @downloadURL   http://dl.dvp.io/anocheat/OverDash.user.js
// @updateURL     http://dl.dvp.io/anocheat/OverDash.user.js
// @website       http://www.dvp.io
// @grant         none
// ==/UserScript==
function getGlobal(callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.id = callback.name;
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}

function OverDash() {
  
  var hidden = "hidden",
      config = {
        borderStyle: "dashed",
        fontSize: 7,
        borderColor: "#0074cd",
        autoScroll: 1
      };
  
  (function ($) {
    
    $.each(['show', 'hide'], function (i, ev) {
      
      var el = $.fn[ev];
      
      $.fn[ev] = function () {
        
        this.trigger(ev);
        return el.apply(this, arguments);
        
      };
      
    });
    
  })(jQuery);
  
  // Standards:
  if (hidden in document)
    document.addEventListener("visibilitychange", onchange);
  else if ((hidden = "mozHidden") in document)
    document.addEventListener("mozvisibilitychange", onchange);
  else if ((hidden = "webkitHidden") in document)
    document.addEventListener("webkitvisibilitychange", onchange);
  else if ((hidden = "msHidden") in document)
    document.addEventListener("msvisibilitychange", onchange);
  // IE 9 and lower:
  else if ("onfocusin" in document)
    document.onfocusin = document.onfocusout = onchange;
  // All others:
  else
    window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

    
  var separator = function() {
    
    borderColor = optionsChat.indexOf('M') > -1 ? "#000000" : "#0074cd";
    
    var legend = '';
    
    if (config.fontSize > 0) {
          
      var now = new Date();
      var time = ('0'+now.getHours()).slice(-2)+':'+('0'+now.getMinutes()).slice(-2)+':'+('0'+now.getSeconds()).slice(-2);
      legend = '<legend align="center" style="padding: 0px 10px; font-size:' + config.fontSize + '; color:' + borderColor + ';">' + time +'</legend>';
        
    }
    
    return '<fieldset style="border-top: 1px ' + config.borderStyle + ' ' + borderColor + '; border-bottom: none; border-left: none; border-right: none; display: block; text-align: center; padding:0;">' + legend + '</fieldset>';
  }
  function onchange (evt) {
    
    var v = "visible", h = "hidden", evtMap = {focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h};
    
    if (!(evt.type in evtMap)) {
        
      if(this[hidden]) {
        
        $("#conversation0 fieldset.read, #conversation-1 fieldset.read").remove();
        
        if ($('#conversation-1').length && !($("#conversation-1 fieldset").length)) {
          
          $('#conversation-1').append(separator);
          
        }
        
        if (!($('#conversation0 fieldset').length)) {
          
          $('#conversation0').append(separator);
          
        }
        
      } else {
        
        $('.conversation:visible fieldset').addClass('read');
        $("#conversation0").animate({scrollTop: $("#conversation0")[0].scrollHeight}, 400);
      
      }
    }
  }

  $('#conversations').on('show', '#conversation-1, #conversation0', function() {

    if ($(this).children('fieldset').not('read').length) {
      
      $(this).children('fieldset').addClass('read');
      
    }
  
  }).on('hide', '#conversation-1, #conversation0', function() {
    
    if ($(this).children('fieldset.read').length) {
      
      $(this).children('fieldset.read').remove();
      $(this).append(separator);
      
    } else if (!($(this).children('fieldset').length)) {
      
      $(this).append(separator);
      
    }
    
  });
    
    
  // set the initial state (but only if browser supports the Page Visibility API)
  if( document[hidden] !== undefined )
    onchange({type: document[hidden] ? "blur" : "focus"});
}

getGlobal(OverDash);
