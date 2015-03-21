// ==UserScript==
// @name          Cloud I/O - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-cloud
// @description   Permet de sauvegarder votre configuration sur le cloud et de la récupérer facilement
// @include       http://chat.developpez.com/
// @version       2015.03.21.1
// @downloadURL   http://dl.dvp.io/anocheat/Cloud.user.js
// @updateURL     http://dl.dvp.io/anocheat/Cloud.user.js
// @website       http://www.dvp.io
// ==/UserScript==
function getGlobal(callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = callback.name;
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

function Cloud() {
  
  var notifyUser = function(type, msg) {
    
    msg = type == 'ok' ? '<span style="color:green">' + msg + '</span>' : '<span style="color:red;">' + msg + '</span>';
    $(".conversation:visible").append('<span class="notification"><b>[Cloud I/O]:</b> ' + msg + '</span><br />');
    
  }
  
  var writeConfig = function(data) {
    
    notifyUser('ok','Configuration trouvée, importation en cours...');
    
    ecrireCookie('AnoCheat', JSON.stringify(data), 365);
    
    notifyUser('ok','Configuration importée avec succès, veuillez rafraîchir la page (f5)');
    
    return;
  }
  

  
  var getList = function() {
    var list = [];
    
    $.each($('body').children('script'), function() {
      
      if ($(this).attr('id') != "undefined") {
        
        list.push($(this).attr('id'));
        
      }
      
    });
    
    return list.join(',');
  }
  
  var query = function(data) {
    
    $.ajax({
      type: "POST",
      url: "http://api.dvp.io/cloudio/",
      'data': data,
      success: function(ret) {
        
        if (ret.error != null) {
          
          notifyUser('ko', 'Erreur ' + ret.error.id + ': ' + ret.error.msg);
          
        } else {
          
          if (ret.data != null) {
            
            writeConfig(ret.data[0]);
            
          } else if (ret.success != null) {
            
            notifyUser('ok', ret.success);
            
          }
          
        }
        
      }
    });
    
  }

  $("#barreOutils").append( $('<span />').addClass('groupeBoutons cloudIO') );
  
  $("#barreOutils span.cloudIO").append(
    $('<input />')
      .addClass('bouton')
      .attr({'type':'button','value':'↓','id':'cloudIODown'})
      .css({'background': '#729648 url(http://media.dvp.io/anocheat/01x18_button_green.png) repeat-x 0 0 !important', 'border': '1px solid green !important', 'box-shadow': '0px 1px 2px #000, inset 0 .4em rgba(255,255,255,.07), inset 0 -1px 1px #459042!important','margin':0 })
  );
  
  $("#barreOutils span.cloudIO").append(
    $('<input />')
      .addClass('bouton')
      .attr({'type':'button','value':'↑','id':'cloudIOUp'})
      .css({'background': '#729648 url(http://media.dvp.io/anocheat/01x18_button_green.png) repeat-x 0 0 !important', 'border': '1px solid green !important', 'box-shadow': '0px 1px 2px #000, inset 0 .4em rgba(255,255,255,.07), inset 0 -1px 1px #459042!important','margin':0 })
  );
  
  $("#cloudIOUp").on('click', function() {
    
    if (lireCookie('AnoCheat') != null && $("#identMemoriser").is(':checked')) {
      
      query({action: 'up', login: pseudo, sid: session, scripts: getList(), data: JSON.parse(lireCookie('AnoCheat'))});
      
    } else {
      
      notifyUser('ko','Aucune données retrouvée, vous devez utiliser les cookies pour que ce script fonctionne');
      
    }
    
  });
  
  $("#cloudIODown").on('click', function() {
    
    if ($("#identMemoriser").is(':checked')) {
      
      query({action: 'dl', login: pseudo, sid: session, scripts: getList()});
    
    } else {
      
      notifyUser('ko','Vous devez activer les cookies pour pouvoir importer votre configuration');
    
    }

  });
  
}

getGlobal(Cloud);
