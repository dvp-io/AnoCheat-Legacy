// ==UserScript==
// @name          Search - DVP I/O
// @author	  Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-autologin
// @description   Ajoute des fonctions de recherche via l'API Search DVP I/O à l'AnoChat
// @include       http://chat.developpez.com/
// @version       2014.10.21.1
// @downloadURL   http://dl.dvp.io/anocheat/Search.user.js
// @updateURL     http://dl.dvp.io/anocheat/Search.user.js
// @website       http://www.dvp.io
// ==/UserScript==

function getGlobal(callback) {

	var script = document.createElement("script");

	script.type = "text/javascript";
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);

}

function main() {
	
	var cmds = [];
	var autoScroll = function() { $(".conversation:visible").scrollTop($(".conversation:visible")[0].scrollHeight); };
	var pushCmd = function(cmds) { $.each(cmds, function(idx,cmd) { listeCompletion.push(cmd); }); };
	
	function notifyUser(data) {
		if($.isArray(data)) {
			$.each(data, function(i,msg) {
				notifyUser(msg);
			});
		} else {
			if(typeof(data.msg) == "undefined"){
				return;
			}
			if(typeof(data.type) != "undefined"){
				switch(data.type){
					case 'error':
						data.msg = '<span style="color:red;">' + data.msg + '</span>';
						break;
					case 'warn':
						data.msg = '<span style="color:#ff9900;">' + data.msg + '</span>';
						break;
					case 'success':
						data.msg = '<span style="color:green">' + data.msg + '</span>';
					  break;
				}
			}
			$(".conversation:visible").append('<span class="notification"><b>[I/O Search]:</b> ' + data.msg + '</span><br />');
			autoScroll();
		}
	}
	
	function getMan(engine) {
		
		if(typeof(engine) == "undefined" || engine == ""){
			
			notifyUser({'type':'error','msg':'Error Search x00 : you must specifie one engine'});
			
			return;
		}
		
		engine = engine.replace('!','');
		
		$.get("http://api.dvp.io/search/?get=manpage&engine="+engine,function(obj) {
			
			if(typeof(obj.error) != "undefined"){
				
				notifyUser({'type':'error','msg':'Error ' + obj.error.id + ' : ' + obj.error.msg});
				
				if(obj.error.id != 'Search x05'){
					
					return;
					
				}
				
			} else {
				
				$.each(obj.data.manpage,function(index,value) {
					
					notifyUser({'msg':value});
					
				});
				
			}
			
			notifyUser({'msg':'<b>Utilisations possibles:</b><pre>!' + engine + ' termes // Envoie le résultat dans le canal sans cibler d\'utilisateur<br />!' + engine + ' pseudo termes // Envoie le résultat à un membre du canal<br />!' + engine + ' ' + pseudo + ' termes // Effectue une recherche privée, le résultat est affiché comme une notification système</pre>'});
			
		});
	}
	
	var updateCommands = function() {
		
		
		$.get("http://api.dvp.io/search/",function(obj) {
			
			if(typeof(obj.error) != "undefined") {
				
				notifyUser({'type':'error','msg':'Echec du chargement des moteurs, veuillez rafraichir la page du chat'});
				notifyUser({'type':'error','msg':'Si le problème persiste contactez Gecko'});
				
			} else {
				cmds = ['!search'];
				
				notifyUser({'msg':'Récupération de la liste des moteurs disponibles en cours...'});
				
				engines = obj.data.engines.split(',');
				
				$.each(engines,function(index,value) {
					
					cmds.push('!' + value);
					
				});
				
				notifyUser({'type':'success','msg':'Récupération des moteurs disponibles terminée, ' + (cmds.length -1) + ' moteurs intégrés au chat'});
				
				if(typeof(nbMessagesEnTout) == "undefined" || nbMessagesEnTout < 10){
					
					notifyUser({'msg':'Pour obtenir de l\'aide tapez <span style="color:black;font-style:normal;">!search</span>'});
					
				}
				
				pushCmd(cmds);
				
			}
			
		});
	}
	
  var search = function(engine, query, target) {
    
		var uri = "http://api.dvp.io/search/?engine="+engine+"&query="+encodeURIComponent(query);
    
		$.get(uri,function(obj) {
      
			if(typeof(obj.error) != "undefined"){
				
				notifyUser({'type':'error','msg':'Error ' + obj.error.id + ' : ' + obj.error.msg});
				
			} else {
				
				if(target == pseudo+'>'){
					
					link = '<a href="'+decodeURIComponent(obj.data.result.uri)+'" target="_blank">'+obj.data.result.alt+'</a>';
					notifyUser({'msg':'<span style="font-style:normal;">' + link + '</span>'});
					
				} else {
					
					link = target+' [IMG]'+obj.api.logo+'[/IMG] [URL='+decodeURIComponent(obj.data.result.uri)+']'+obj.data.result.alt+'[/URL]';
					$("#zoneSaisie").val(link);
					$("#envoyer").click();
					
				}
		  }
			
		});
    
		return;
	}
	
  $(document).ajaxComplete(function(event, xhr, settings) {
    
		if(settings.url == 'ajax.php') {
			
      var msg = '', engine = '', target = '';
			var data = jQuery.parseJSON(xhr.responseText);
			
      if(data.listeCompletion !== '' || data.etat !== 1) {
				
				pushCmd(cmds);
				
      }
			
      if((data.salon !== '' || data.pvs !='') && data.etat === 1){
        
        if(data.salon != ''){
					
          msg = $(data.salon).text();
					
        } else if(data.pvs != ''){
					
          msg = $(data.pvs[0].html).text();
					
        } else {
					
          $("#dialogueMessage").dialog("open");
          $("#dlgMessageTexte").html('Erreur lors de la reception de la commande');
					
        }
				
				msgTab = msg.split(' ');
        
				if(msgTab[0] == '['+pseudo+']:') {
					
					msgCmd = msgTab[1];
          
					if($.inArray(msgCmd, cmds) > -1) {
						
						if(msgCmd == '!search'){
							
							switch(msgTab[2]){
								case 'engines':
									eList = cmds.join(' ');
									notifyUser({'msg':'Liste des commandes disponibles :'});
									notifyUser({'msg':'<span style="color:black;font-style:normal;">' + eList.replace('!search ','')  + '</span>'});
									break;
								case 'man':
									getMan(msgTab[3]);
									break;
								case 'update':
									updateCommands();
									break;
								case 'topengine':
									notifyUser({'type':'error','msg':'Error Search x00 : Development in progress'});
									break;
								case 'topquery':
									notifyUser({'type':'error','msg':'Error Search x00 : Development in progress'});
									return;
								case 'download':
									notifyUser({'type':'success','msg':'La dernière version du script est disponible sur le <a href="http://dl.dvp.io/anocheat/">FTP I/O</a> et sur <a href="https://github.com/Antoine-Pous/AnoCheat/blob/master/Search.user.js">Github</a>'});
									break;
								default:
									notifyUser({'msg':'Utilisation <span style="font-style:normal;color:black;">!search [engines|man [engine]|update|topengine|topquery|download]</span>'});
									break;
							}
							
						} else {
							
							msgTarget = msgTab[2].replace('_',' ');
							
							query = msg.replace(msgTab[0]+' '+msgTab[1]+' ','');
							
							if($.inArray(msgTarget, listeCompletion) > -1) {
								
								target = msgTarget+'>';
								query = msg.replace(msgTab[0]+' '+msgTab[1]+' '+msgTab[2]+' ','');
								
							}
							
							engine = msgCmd.replace('!','');
							query = query.replace(' ','+');
							search(engine, query, target);
						}
						
					}
					
				}
				
			}
		 
		}
		
	});
	
  $('#identAction').click(function() {
    
		setTimeout(function() {
			
			updateCommands();
			
		},1000);
		
	});

}

getGlobal(main);
