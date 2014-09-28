// ==UserScript==
// @name          Smileys - DVP I/O
// @author				Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       No licence, you can modify an use this script as you want
// @namespace     http://www.dvp.io/fr/blog/anocheat-autologin
// @description   Ajoute les smileys disponibles sur le dépôt de dvp.io à l'anochat
// @include       http://chat.developpez.com/
// @version       2014.06.19.1
// @downloadURL   http://dl.dvp.io/anocheat/Smileys.user.js
// @updateURL     http://dl.dvp.io/anocheat/Smileys.user.js
// @website       http://www.dvp.io
// ==/UserScript==
 
function getGlobal(callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}

function main() {
	var anochatURI = window.location.hostname;
	
	$("#identAction").on("click",function() {
		oldList = document.getElementById("apiSmileys");
		if(oldList != null){
			oldList.parentNode.removeChild(oldList);
		}
		$.get("http://api.dvp.io/smileys/",function (obj) {
			var media = decodeURIComponent(obj.api.media);
			var data = '<span id="apiSmileys"><fieldset id="apiSmileysTitle"><legend>'+obj.api.count+' '+obj.api.name+' v'+obj.api.version+'</legend></fieldset>';
			$.each(obj.data.public,function(ext,list) {
        $.each(list.split(","),function(offset,name){
          var link = media+name+'.'+ext;
          data += '<a href="#" onclick="$(\'#zoneSaisie\').val($(\'#zoneSaisie\').val()+\'[img]'+link+'[/img]\'); $(\'#listeSmileys\').dialog(\'close\');positionnerCurseurFin();"><img src="'+link+'" alt="'+name+'" title="'+name+'" /></a>';
        });
			});
      data += '<fieldset id="apiSmileysPm" class="apiSmileysPm"><legend><img src="http://'+anochatURI+'/images/smileys/alerte.gif" alt="" /> A utiliser en MP uniquement <img src="http://'+anochatURI+'/images/smileys/alerte.gif" alt="" /></legend></fieldset>';
      data += '<span class="apiSmileysPm" style="display:block;text-align:center;">Toute utilisation de ces smileys dans un salon public entrainera une sanction de la modération du chat</span>';
			data += '<input type="checkbox" id="apiSmileysPmOk" /> <label for="apiSmileysPmOk" class="apiSmileysPm">J\'ai compris et je ferai attention</label>';
      data += '<div id="apiSmileysPmList" style="display:none;">';
			$.each(obj.data.private,function(ext,list) {
        $.each(list.split(","),function(offset,name){
          var link = media+'pm/'+name+'.'+ext;
          data += '<a href="#" onclick="$(\'#zoneSaisie\').val($(\'#zoneSaisie\').val()+\'[img]'+link+'[/img]\'); $(\'#listeSmileys\').dialog(\'close\');positionnerCurseurFin();"><img src="'+link+'" alt="'+name+'" title="'+name+'" /></a>';
        });
			});
			data += '</div></span>';
			$('#listeSmileys').append(data);
			$('#apiSmileysTitle').css({border:'none', borderTop:'1px solid #aaa', display:'block', textAlign:'center', padding:'5px',marginTop:'15px'});
			$('#apiSmileysPm').css({border:'none', borderTop:'1px solid red', display:'block', textAlign:'center', padding:'5px'});
			$('.apiSmileysPm').css({color:'red'});
			$('#listeSmileys').css({overflow:'hidden', overflowY:'scroll', marginRight:'0px'});
      $('#apiSmileysPmOk').change(function () {
        if($('#apiSmileysPmOk').is(':checked')) {
          $('#apiSmileysPmList').css({display:'block'});
        } else {
          $('#apiSmileysPmList').css({display:'none'});
        }
      });
		});
	});
}

getGlobal(main);
