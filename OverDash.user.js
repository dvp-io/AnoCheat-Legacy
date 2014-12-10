// ==UserScript==
// @name          OverDash - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-overdash
// @description   Ajoute une ligne en pointillé là où vous vous êtes arrêté de lire et où vous êtes revenus
// @include       http://chat.developpez.com/
// @version       2014.12.10.5
// @downloadURL   http://dl.dvp.io/anocheat/OverDash.user.js
// @updateURL     http://dl.dvp.io/anocheat/OverDash.user.js
// @website       http://www.dvp.io
// ==/UserScript==
function getGlobal(callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}

function overDash() {
  var hidden = "hidden";

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
    if (!(evt.type in evtMap))
      if (!$("#conversation0").children().last().is("fieldset"))
        var now = new Date();
        var time = ('0'+now.getHours()).slice(-2)+':'+('0'+now.getMinutes()).slice(-2)+':'+('0'+now.getSeconds()).slice(-2);
        if(this[hidden]) {
          $("#conversation0 fieldset").remove();
          $("#conversation0").append('<fieldset style="border-top: 1px dashed #0074cd; border-bottom: none; border-left: none; border-right: none; display: block; text-align: center; padding:0;"><legend align="center" style="padding: 0px 10px; font-size:7pt; color:#0074cd;">' + time +'</legend></fieldset>');
        } else {
          $("#conversation0").scrollTop($("#conversation0")[0].scrollHeight);
        }
  }

  // set the initial state (but only if browser supports the Page Visibility API)
  if( document[hidden] !== undefined )
    onchange({type: document[hidden] ? "blur" : "focus"});
}

getGlobal(overDash);
