// ==UserScript==
// @name          Smileys - DVP I/O
// @author				Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-autologin
// @description   Ajoute les smileys disponibles sur le dépôt de dvp.io à l'anochat
// @include       http://chat.developpez.com/
// @version       2015.03.24.1
// @downloadURL   http://dl.dvp.io/anocheat/Smileys.user.js
// @updateURL     http://dl.dvp.io/anocheat/Smileys.user.js
// @website       http://www.dvp.io
// ==/UserScript==
 
function getGlobal(callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = callback.name;
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

function Smileys() {
    var anochatURI = window.location.hostname;

    $("#identAction").on("click",function() {
        oldList = $("#apiSmileys");
        if(oldList.length > 0) {
            oldList.remove();
        }
        $.get("https://api.dvp.io/smileys/",function (obj) {
            var media = decodeURIComponent(obj.api.media);
            var $legendFs = $('<legend />').html(obj.api.count+' '+obj.api.name+' v'+obj.api.version);
            var $fsSmileys = $('<fieldset />').attr('id', 'apiSmileysTitle').append($legendFs);
            var $spanAllSmileys = $('<span />').attr('id', 'apiSmileys').append($fsSmileys);
            
            $.each(obj.data.public,function(ext,list) {
                $.each(list.split(","),function(offset,name){
                  var link = media+name+'.'+ext;
                  var $img = $('<img />').attr({ src: link, alt: name, title: name });
                  var $a = $('<a />').attr({ href: '#'}).on('click', function() {
                      $('#zoneSaisie').val( $('#zoneSaisie').val() + '[img]' + link + '[/img]'); 
                      $('#listeSmileys').dialog('close');
                      positionnerCurseurFin();
                  }).append($img);
                  $spanAllSmileys.append($a);
                });
            });
            
            var $imgAlerte = $('<img />').attr({ src: 'http://'+anochatURI+'/images/smileys/alerte.gif', alt: ''});
            var $legendPM = $('<legend />').append($imgAlerte).append('A utiliser en MP uniquement').append($imgAlerte);
            var $fsSmileysPM = $('<fieldset />').attr('id', 'apiSmileysPm').addClass('apiSmileysPm').append($legendPM);
            $spanAllSmileys.append($fsSmileysPM);
            
            var $spanWarn = $('<span />').addClass('apiSmileys').css( { display: 'block', textAlign: 'center'}).text('Toute utilisation de ces smileys dans un salon public entrainera une sanction de la modération du chat');
            $spanAllSmileys.append($spanWarn);
            var $labelCaution = $('<label />').attr({for: 'apiSmileysPmOk'}).addClass('apiSmileysPm').text('J\'ai compris et je ferai attention');
            var $checkCaution = $('<input />').attr({ type: 'checkbox', id: 'apiSmileysPmOk' }).on('change', function() {
                if($(this).prop('checked')) {
                    $('#apiSmileysPmList').show();
                } else {
                    $('#apiSmileysPmList').hide();
                }
            });
            $spanAllSmileys.append($checkCaution).append($labelCaution);
            
            var $listSmileysPrivate = $('<div />').attr('id', 'apiSmileysPmList').css('display', 'none');
            $.each(obj.data.private,function(ext,list) {
                $.each(list.split(","),function(offset,name){
                    var link = media+'pm/'+name+'.'+ext;
                    var $img = $('<img />').attr({ src: link, alt: name, title: name });
                    var $a = $('<a />').attr({ href: '#'}).on('click', function() {
                        $('#zoneSaisie').val( $('#zoneSaisie').val() + '[img]' + link + '[/img]'); 
                        $('#listeSmileys').dialog('close');
                        positionnerCurseurFin();
                    }).append($img);
                    $listSmileysPrivate.append($a);
                });
            });
            $spanAllSmileys.append($listSmileysPrivate);
            $('#listeSmileys').append($spanAllSmileys);
            $('#apiSmileysTitle').css({border:'none', borderTop:'1px solid #aaa', display:'block', textAlign:'center', padding:'5px',marginTop:'15px'});
            $('#apiSmileysPm').css({border:'none', borderTop:'1px solid red', display:'block', textAlign:'center', padding:'5px'});
            $('.apiSmileysPm').css({color:'red'});
            $('#listeSmileys').css({overflow:'hidden', overflowY:'scroll', marginRight:'0px'});
        });
    });
};

getGlobal(Smileys);
