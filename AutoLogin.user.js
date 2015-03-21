// ==UserScript==
// @name          AutoLogin - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @contributor   Guillaume 'radicaldreamer' Raineri <raineri.guillaume@gmail.com>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-autologin
// @description   Permet de se connecter automatiquement quand la page du chat est chargée et de récupérer l'historique de conversation
// @include       http://chat.developpez.com/
// @version       2015.03.21.1
// @downloadURL   http://dl.dvp.io/anocheat/AutoLogin.user.js
// @updateURL     http://dl.dvp.io/anocheat/AutoLogin.user.js
// @website       http://www.dvp.io
// ==/UserScript==
function getGlobal(callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = callback.name;
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

function autoLogin() {
  
  // Default configuration
  var options = { auto: false, lines: 30 };
  
  // Saved configuration
  if (lireCookie('AnoCheat') != null) {
    
    // If user use cookie
    if ($("#identMemoriser").is(':checked')) {
      
      // Read the config cookie
      var cookie = JSON.parse(lireCookie('AnoCheat'));
      
      // If autoLogin options are defined
      if (typeof(cookie.autoLogin) != "undefined") {
        
        // Default configuration is crushed
        options = cookie.autoLogin;
        
      }
      
      delete cookie;
      
    } else {
      
      // Detele cookie
      ecrireCookie('AnoCheat', '', -1);
      
    }

  }
  
  var updateCookie = function(options) {
    var tmp_cookie = lireCookie('AnoCheat') != null ? JSON.parse(lireCookie('AnoCheat')) : {};
    tmp_cookie.autoLogin = options;
    ecrireCookie('AnoCheat', JSON.stringify(tmp_cookie), 365);
    delete tmp_cookie;
  }
  
  // Create options block for script if not already exists
  if(!($("#identTableau tr td:nth-child(2) div#AnoCheat").length)) {
    $('<div class="cadre" id="AnoCheat" style="border-color:#459045;"><i style="color: #459045;">AnoCheat - DVP I/O</i><br /></div>').insertBefore("#identTableau tr td:nth-child(2) div.cadre:nth-child(2)");
  }
  
  // Append options to login page
  $("#identTableau #AnoCheat").append('<input type="checkbox" id="autoLogin" name="autoLogin" min="0" max="100" value="1" ' + (options.auto == true ? 'checked="checked"' : '') + '/> <label for="autoLogin">Connexion automatique</label><br />');
  $("#identTableau #AnoCheat").append('<label for="autoBack">Récupérer automatiquement <input type="number" id="autoBack" name="autoBack" min="0" max="100" value="' + options.lines + '" style="width:40px; border:none;"/> lignes d\'historique</label><br />');
  
  // Apply new CSS rules to options modal, now user can scroll the box
  $("#dialogueOptions").css({"overflow-x":"hidden", "overflow-y":"scroll"});
  
  // If separator is not already append to options modal
  if (!($("#dialogueOptions fieldset#AnoCheat").length)) {
    
    // Append separator to options modal
    $('<fieldset style="border-top: 1px dashed #459042; border-bottom: none; border-left: none; border-right: none; display: block; text-align: center; padding:0;" id="AnoCheat"><legend align="center" style="padding: 0px 10px; font-size:7; color:#459042;">AnoCheat - DVP I/O</legend></fieldset>').insertBefore("#dialogueOptions p.valider");
      
  }
  
  // Append options to modal
  $('<p><input type="checkbox" id="autoLogin" name="autoLogin" min="0" max="100" value="1" ' + (options.auto == true ? 'checked="checked"' : '') + '/> <label for="autoLogin">Connexion automatique</label></p><br />').insertBefore("#dialogueOptions p.valider");
  $('<p><label for="autoBack">Récupérer automatiquement <input type="number" id="autoBack" name="autoBack" min="0" max="100" value="' + options.lines + '" style="width:40px; border:none;"/> lignes d\'historique</label></p><br />').insertBefore("#dialogueOptions p.valider");
  
  // When user change value from login page
  $("#identTableau #autoLogin").on('click', function() {
    options.auto = $(this).is('checked');
  });
  
  $("#identTableau #autoBack").bind('keyup mouseup', function() {
    options.lines = $(this).val() >= 0 && $(this).val() <= 100 ? $(this).val() : options.lines;
  });
  
  // When user click on login button
  $("#identAction").on('click', function() {
    
    // If user use cookie, we save the current config
    if ($("#identMemoriser").is(':checked')) {
      
      updateCookie(options);
      
    }
    
    // Auto back
    if (options.lines > 0) {
      
      setTimeout(function() {
        
        $("#zoneSaisie").val('/BACK ' + options.lines);
        $('#envoyer').click();
      
      }, 500);
    }
    
  });
  
  // When user click on options submit button
  $("#dlgOptionsAction").on('click', function() {
    
    // If user use cookie
    if ($("#identMemoriser").is(':checked')) {
      
      // Read the new config
      options.auto = $("#dialogueOptions #autoLogin").is(':checked');
      options.lines = $("#dialogueOptions #autoBack").val() >= 0 && $("#dialogueOptions #autoBack").val() <= 100 ? $("#dialogueOptions #autoBack").val() : options.lines;
    
      // Update cookie
      updateCookie(options);
      
    }
    
  });
  
  // If auto login is checked
  if (options.auto === true) {
    
    setTimeout(function() {
      
      $("#identAction").click();
        
    }, 500);
    
  }
}
getGlobal(autoLogin);
