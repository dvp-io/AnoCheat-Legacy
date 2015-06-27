// ==UserScript==
// @name          Ultimate Mono - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @description   Permet d'avoir un mode monochrome rétroactif, qui puisse être (dés)activé sur l'ensemble du chat
// @include       http://chat.developpez.com/*
// @version       2015.06.27.1
// @resource      mono_CSS  http://dl.dvp.io/anocheat/css/mono.css?v7
// @downloadURL   http://dl.dvp.io/anocheat/UltimateMono.user.js
// @updateURL     http://dl.dvp.io/anocheat/UltimateMono.user.js
// @website       http://www.dvp.io
// @grant         GM_addStyle
// @grant         GM_getResourceText
// ==/UserScript==

var src_mono_CSS = GM_getResourceText ("mono_CSS");
GM_addStyle (src_mono_CSS);

function getGlobal(callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.id = callback.name;
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}

function UltimateMono() {
  $("#barreOutils").append(
    $('<input />')
      .addClass('bouton')
      .attr({'type':'button','id':'ModMono'})
      .val('Mono')
      .click(function() {
        if ($("body").hasClass("mono")) {
          $("body").removeClass("mono");
        } else {
          $("#zoneSaisie").val('/MODE -M');
          $("#envoyer").click();
          $("body").addClass("mono");
        }
      })
      .css({'color':'', 'background': '#729648 url(http://media.dvp.io/anocheat/01x18_button_green.png) repeat-x 0 0', 'border': '1px solid green', 'box-shadow': '0px 1px 2px #000, inset 0 .4em rgba(255,255,255,.07), inset 0 -1px 1px #459042' })
  );
};
getGlobal(UltimateMono);
