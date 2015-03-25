// ==UserScript==
// @name          Buddy - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-buddy
// @description   Met en avant vos amis DVP sur le chat et customise le comportement du chat
// @include       http://chat.developpez.com/
// @version       2015.03.25.1
// @downloadURL   http://dl.dvp.io/anocheat/Buddy.user.js
// @updateURL     http://dl.dvp.io/anocheat/Buddy.user.js
// @website       http://www.dvp.io
// ==/UserScript==

function getGlobal(callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = callback.name;
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

function Buddy() {

  var buddyConfig = {
      icon: 2,
      bold: 0,
      italic: 1,
      underline: 0,
      color: '',
      pm:0
    },
    buddyPM = true,
    buddyList = [],
    buddyCount = 0,
    buddyRegColour = /[A-Fa-f0-9]{6}/gm;
    
  var updateCookie = function(options) {
    var tmp_cookie = lireCookie('AnoCheat') != null ? JSON.parse(lireCookie('AnoCheat')) : {};
    tmp_cookie.buddy = options;
    ecrireCookie('AnoCheat', JSON.stringify(tmp_cookie), 365);
  }
  
  if(jQuery('#identMemoriser').is(':checked') && lireCookie('AnoCheat') != null) {
    var cookie = JSON.parse(lireCookie('AnoCheat'));
    if (typeof(cookie.buddy) != "undefined") {
      buddyConfig = cookie.buddy;
    }
  }
  
  // Ajout du compteur d'amis dans la barre d'état  
  jQuery('#nombreConnectes + #etatConnexion').before('<span id="buddyCount">' + buddyCount + ' amis</span> - ');
    
  // Ajout du panneau de configuration
  jQuery('body').append('<div id="dialogueBuddyUI" style="height:100%; display:none;"><div id="buddyPreview" style="width: 374px; border: 1px solid #475E8C; float: right; background: white; -moz-border-radius: 10px 10px 10px 10px; -webkit-border-radius: 10px 10px 10px 10px; border-radius: 10px 10px 10px 10px; padding-bottom: 5px;"><a href="#" class="nomSalon">Preview</a><a href="#" class="buddyFriend" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-niv4" title="Administrateur"></span><span style="color: #E00E0E"> Anomaly <span class="icone icone-absent" title="Non disponible"></span> (.mode = \'sleep\';)</span></a><a href="#" class="" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-niv3" title="Modérateur"></span><span style="color: #004444"> Bibeleuh </span></a><a href="#" class="buddyFriend" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-niv3" title="Modérateur"></span><span style="color: #8800AA"> ThomasR </span></a><a href="#" class="buddyFriend" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-vide" title=""></span><span style="color: #459045"> Gecko <span class="icone icone-nopv" title="Pas de messages privés"></span></span></a><a href="#" class="" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-vide" title=""></span><span style="color: #000000"> rawsrc </span></a><a href="#" class="buddyFriend" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-vide" title=""></span><span style="color: #005EFF"> Rotrevrep <span class="icone icone-nopv" title="Pas de messages privés"></span></span></a><a href="#" class="" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-vide" title=""></span><span style="color: #008844"> Shikiryu </span></a></div><h4 style="margin: 0 0 0 0;">Pastille</h4><i>Vous permet de distinguer vos amis grâce à une pastille</i><p id="buddyIcon" style="margin: 0 0 5px 20px;"><select id="buddySelIcon"><option value="0">Désactivé</option><option value="1">Etoile mauve</option><option value="2">Pastille +</option></select></p><h4 style="margin: 0 0 0 0;">Décoration</h4><i>Vous permet de changer le style du pseudonyme de vos amis</i><p id="buddyDecoration" style="margin: 0 0 5px 20px;"><input type="checkbox" id="buddyBold"/><label for="buddyBold"><b>Gras</b></label><input type="checkbox" id="buddyItalic"/><label for="buddyItalic"><i>Italique</i></label><input type="checkbox" id="buddyUnderline"/><label for="buddyUnderline"><u>Souligné</u></label></p><h4 style="margin: 0 0 0 0;">Highlight</h4><i>Vous permet de différencier vos amis grâce à un highlight personalisé</i><p id="buddyHighlight" style="margin: 0 0 5px 20px;"><label for="buddyHighlightColor">Code couleur #</label><input type="text" id="buddyHighlightColor" placeholder="D0F0B0" size="4" maxlength="6" /></p><h4 style="margin: 0 0 0 0;">Allow MP</h4><i>Vous permet de définir le comportement à adopter quand un ami se connecte et que vous refusez les MP</i><p style="margin: 0 0 5px 20px;"><select id="buddySelAllow"><option value="0">Ne rien faire</option><option value="1">Tout autoriser</option><option value="2">Tout refuser</option></select></p><p class="valider"><input type="button" id="buddySubmit" value="Valider" class="bouton"></p><hr /><i>Vous pouvez me <a href="https://github.com/Antoine-Pous/AnoCheat/issues" target="_blank">contacter</a> pour toute suggestion ou bogue, Gecko</i></div>');
  
  // Quand on ferme le panneau de config  
  jQuery('#buddySubmit').click(function() {  
    buddyConfig = {
      icon: jQuery('#buddySelIcon').val(),
      bold: jQuery('#buddyBold').is(':checked') ? 1 : 0,
      italic: jQuery('#buddyItalic').is(':checked') ? 1 : 0,
      underline: jQuery('#buddyUnderline').is(':checked') ? 1 : 0,
      color: jQuery('#buddyHighlightColor').val(),
      pm: jQuery('#buddySelAllow').val()
    };
      
    if(jQuery('#identMemoriser').is(':checked') && lireCookie('AnoCheat') != null) {
      updateCookie(buddyConfig);
    }
    
    jQuery('#dialogueBuddyUI').dialog('close');
    
    // Mise à jour du visuel
    buddyUpdate();
  });
 
  // Mise à jour de la live preview au changement des options
  jQuery('#buddySelIcon').on('change', function () {
    jQuery('.buddyFriend').find('.buddyPreviewIcon').remove();
    if (jQuery('#buddySelIcon').val() > 0) {
      jQuery('.buddyFriend > .icone').append('<img src="http://media.dvp.io/anocheat/11x11_chip_' + jQuery('#buddySelIcon').val() + '.png" alt="" class="buddyPreviewIcon buddyPreviewIcon' + jQuery('#buddySelIcon').val() + '" />');
    }
  });
  jQuery('#buddyBold').on('change', function () {
    jQuery('.buddyFriend').children('span:nth-child(2)').css('font-weight', jQuery(this).prop('checked') ? 'bold' : '');
  });
  jQuery('#buddyItalic').on('change', function () {
    jQuery('.buddyFriend').children('span:nth-child(2)').css('font-style', jQuery(this).prop('checked') ? 'italic' : '');
  });
  jQuery('#buddyUnderline').on('change', function () {
    jQuery('.buddyFriend').children('span:nth-child(2)').css('text-decoration', jQuery(this).prop('checked') ? 'underline' : 'none');
  });
  jQuery('#buddyHighlightColor').on('keyup', function () {
    if (jQuery(this).val().match(buddyRegColour)) {
      jQuery('.buddyFriend').css('background-color', '#' + jQuery(this).val());
    } else {
      jQuery('.buddyFriend').css('background-color', '');
    }
  });
 
  // Chargement de la configuration pour la preview du panneau de config
  buddyGetConfig = function buddyGetConfig() {
    jQuery('.buddyFriend').find('.buddyPreviewIcon').remove();
    jQuery('#buddySelIcon').val(buddyConfig.icon);
    buddyConfig.bold == 1 ? jQuery('#buddyBold').prop('checked', 'checked') : jQuery('#buddyBold').prop('checked', '');
    buddyConfig.italic == 1 ? jQuery('#buddyItalic').prop('checked', 'checked') : jQuery('#buddyItalic').prop('checked', '');
    buddyConfig.underline == 1 ? jQuery('#buddyUnderline').prop('checked', 'checked') : jQuery('#buddyUnderline').prop('checked', '');
    jQuery('#buddyHighlightColor').val(buddyConfig.color);
    jQuery('#buddySelAllow').val(buddyConfig.pm);
    if(buddyConfig.icon > 0) {
      jQuery('.buddyFriend').children('.icone').append('<img src="http://media.dvp.io/anocheat/11x11_chip_'+buddyConfig.icon+'.png" alt="" class="buddyPreviewIcon buddyPreviewIcon'+buddyConfig.icon+'" />');
    }
    jQuery('.buddyFriend').children('span:nth-child(2)').css('font-weight', jQuery('#buddyBold').prop('checked') ? 'bold' : 'normal');
    jQuery('.buddyFriend').children('span:nth-child(2)').css('font-style', jQuery('#buddyItalic').prop('checked') ? 'italic' : 'normal');
    jQuery('.buddyFriend').children('span:nth-child(2)').css('text-decoration', jQuery('#buddyUnderline').prop('checked') ? 'underline' : 'none');
    if(buddyConfig.color.match(buddyRegColour)) {
      jQuery('.buddyFriend').css('background-color','#'+buddyConfig.color);
    }
  };

  jQuery('#dialogueBuddyUI').dialog({
    autoOpen: false,
    open: buddyGetConfig,
    title: "Gecko's buddy",
    resizable: false,
    width: 950,
    height: 475
  });

  // Récupéarion de la liste des amis
  buddyLoad = function buddyLoad() {
    jQuery(".nomConnecte").each(function(){
      var user = jQuery(this).attr('onclick').split(new RegExp("[\(\",]+", "g"));
      if(user[2] === jQuery('#zonePseudo').text()) {
        if(jQuery(this).find('span.icone-nopv').length === 1 || jQuery(this).find('span.icone-niv4').length === 1 || jQuery(this).find('span.icone-niv3').length === 1) {
          buddyPM = false;
        }
        jQuery.getJSON('https://api.dvp.io/buddy/?sid='+session, function(data) {
          buddyList = [];
          if (typeof(data.data) != "undefined") {
            $.each(data.data,function(key,val){ 
              buddyList.push(val);
            });
            
            $(".conversation:visible").append('<span class="notification"><b>[Buddy I/O]:</b> <span style="color:green;">' + buddyList.length + ' amis importés avec succès :-)</span></span><br />');
          }
          
          if (typeof(data.error) != "undefined") {
            $(".conversation:visible").append('<span class="notification"><b>[Buddy I/O]:</b> <span style="color:red;">Erreur ' + data.error.id + ': ' + data.error.msg + '</span></span><br />');
          }
        });
      }
    });
  }
 
  buddyUpdate = function buddyUpdate() {    
    buddyCount = 0;
    if(lireCookie('AnoCheat') != null) {     
      var cookie = JSON.parse(lireCookie('AnoCheat'));
      if (typeof(cookie.buddy) != "undefined") {  
        buddyConfig = cookie.buddy;
      }
    }  
    jQuery(".nomConnecte").each(function(){ 
      var user = jQuery(this).attr('onclick').split(new RegExp("[\(\",]+", "g"));
      if(jQuery.inArray(user[2], buddyList) > -1) {
        buddyCount++;  
	if(buddyConfig.icon > 0 && !(jQuery(this).children('.buddyFriendIcon'+buddyConfig.icon).length)) {
	  jQuery(this).find('.buddyFriendIcon').remove();
	  jQuery(this).children('.icone').append('<img src="http://media.dvp.io/anocheat/11x11_chip_'+buddyConfig.icon+'.png" alt="" class="buddyFriendIcon buddyFriendIcon'+buddyConfig.icon+'" />');
	} else {
	  jQuery(this).find('.buddyFriendIcon').remove();
	}
	jQuery(this).children('span:nth-child(2)').css('font-weight', buddyConfig.bold == 1 ? 'bold' : 'normal');
	jQuery(this).children('span:nth-child(2)').css('font-style', buddyConfig.italic == 1 ? 'italic' : 'normal');
	jQuery(this).children('span:nth-child(2)').css('text-decoration', buddyConfig.underline == 1 ? 'underline' : 'none');
	if(buddyConfig.color.length === 6) {
          jQuery(this).css('background-color','#'+buddyConfig.color);
	}
	if(!buddyPM && !(jQuery(this).find('span.icone-niv4').length) && !(jQuery(this).find('span.icone-niv3').length)) {
	  if(buddyConfig.pm == 1 && !(jQuery(this).children('span:nth-child(2)').find('span.icone-pv').length)) { envoyerCommande('/ALLOW ON ' + user[2]); }
	  if(buddyConfig.pm == 2 && jQuery(this).children('span:nth-child(2)').find('span.icone-pv').length)    { envoyerCommande('/ALLOW OFF ' + user[2]); }
	}
      }
    });
    jQuery('#buddyCount').text(buddyCount + ' amis');
  };
  
  $("#barreOutils").append(
    $('<input />')
      .addClass('bouton')
      .attr({'type':'button','value':'Amis','id':'btnBuddy'})
      .click(function() { $("#zoneSaisie").focus(); $('#dialogueBuddyUI').dialog('open'); })
      .css({'background': '#729648 url(http://media.dvp.io/anocheat/01x18_button_green.png) repeat-x 0 0', 'border': '1px solid green', 'box-shadow': '0px 1px 2px #000, inset 0 .4em rgba(255,255,255,.07), inset 0 -1px 1px #459042' })
  );

 
  jQuery(document).ajaxComplete(function(event, xhr, settings) {
      if(settings.url == 'ajax.php') {
        buddyUpdate();
      }
  });
  
  jQuery('#identAction').click(function() {
    setTimeout(function() {
      buddyLoad();
      buddyUpdate();
    }, 800);
  });
  
};
  
getGlobal(Buddy);
