// ==UserScript==
// @name          OverDash - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       BEER-WARE (rev 42) https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-overdash
// @description   Ajoute une ligne en pointillé là où vous vous êtes arrêté de lire
// @include       http://chat.developpez.com/
// @version       2015.03.11.1
// @downloadURL   http://dl.dvp.io/anocheat/OverDash.user.js
// @updateURL     http://dl.dvp.io/anocheat/OverDash.user.js
// @website       http://www.dvp.io
// @grant         none
// ==/UserScript==
function getGlobal(callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}

function overdash() {
  var hidden = "hidden",
      config = {
        borderStyle: "dashed",
        fontSize: 7,
        borderColor: "#0074cd",
        autoScroll: 1
      };

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

  function onchange (evt) {
    var v = "visible", h = "hidden", evtMap = {focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h};
    if (!(evt.type in evtMap)) {
      if(optionsChat.indexOf('M')) {
        config.borderColor = "#000000";  
      }
      if(this[hidden]) {
        $("#conversation0 fieldset").remove();
        if (config.fontSize > 0) {
          var now = new Date();
          var time = ('0'+now.getHours()).slice(-2)+':'+('0'+now.getMinutes()).slice(-2)+':'+('0'+now.getSeconds()).slice(-2);
          $("#conversation0").append('<fieldset style="border-top: 1px '+config.borderStyle+' '+config.borderColor+'; border-bottom: none; border-left: none; border-right: none; display: block; text-align: center; padding:0;"><legend align="center" style="padding: 0px 10px; font-size:'+config.fontSize+'; color:'+config.borderColor+';">' + time +'</legend></fieldset>');
        } else {
          $("#conversation0").append('<fieldset style="border-top: 1px '+config.borderStyle+' '+config.borderColor+'; border-bottom: none; border-left: none; border-right: none; display: block; text-align: center; padding:0;"></fieldset>');
        }
      } else {
        $("#conversation0").animate({scrollTop: $("#conversation0")[0].scrollHeight}, 400);
      }
    }
  }
  
  // set the initial state (but only if browser supports the Page Visibility API)
  if( document[hidden] !== undefined )
    onchange({type: document[hidden] ? "blur" : "focus"});
}

getGlobal(overdash);
