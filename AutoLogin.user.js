// ==UserScript==
// @name          AutoLogin - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @contributor   radicaldreamer <raineri.guillaume@gmail.com>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-autologin
// @description   Permet automatiquement de se connecter quand la page du chat est chargée et de récupérer l'historique du chat
// @include       http://chat.developpez.com/
// @version       2014.10.24.1
// @downloadURL   http://dl.dvp.io/anocheat/AutoLogin.user.js
// @updateURL     http://dl.dvp.io/anocheat/AutoLogin.user.js
// @website       http://www.dvp.io
// ==/UserScript==
function getGlobal(callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

function mainFunction() {
    /**
     * AutoLogin
     */
    setTimeout(function() {
        $("#identAction").click();
    }, 500);
    /**
     * Affichage de l'historique en fonction de la valeur du cookie
     */
    var autoBackNumber = lireCookie('AnoCheat_AutoLogin');
    if (autoBackNumber != null) {
        effacerCookie('AnoCheat_AutoLogin');
        ecrireCookie('AnoCheat_AutoLogin', autoBackNumber, 365);
        setTimeout(function() {
            $("#zoneSaisie").val('/BACK ' + autoBackNumber.toString());
            $('#envoyer').trigger('click');
        }, 3000);
    }
    /**
     * Intégration dans le menu Options
     */
    setTimeout(function() {
        var autoBackCount = 30;
        if (autoBackNumber != null) {
            autoBackCount = autoBackNumber;
        }
        var appendAutoBack = '<p><input id="dlgOptAutoBack" type="checkbox" value="1"><label for="dlgOptAutoBack">Auto/Back<br><small>Cette option permet de restaurer l\'historique de conversation</small><br /></label><input type="text" id="autoBackText" value="' + autoBackCount + '" /></p>';
        $('#dialogueOptions p:nth-last-child(2)').prepend(appendAutoBack);
        $('#dialogueOptions').css({
            overflow: 'hidden',
            overflowY: 'scroll',
            marginRight: '0px'
        });
    }, 3000);
    /**
     * Gestion de la sauvegarde
     */
    $('#dlgOptionsAction').on('click', function(e) {
        var newValNumber = parseInt($('#autoBackText').val());
        if (newValNumber >= 15 && newValNumber <= 100) {
            if ($('#dlgOptAutoBack').is(':checked')) {
                ecrireCookie('AnoCheat_AutoLogin', $('#autoBackText').val(), 365);
            } else {
                effacerCookie('AnoCheat_AutoLogin');
            }
        } else {
            if (autoBackNumber != null) {
                $('#autoBackText').val(autoBackNumber);
            } else {
                $('#autoBackText').val('30');
                $('#dlgOptAutoBack').prop('checked', false);
            }
            alert('La nombre de message à afficher pour l\'autoBack doit être compris entre 15 et 100 (inclus).');
        }
    });
}
getGlobal(mainFunction);
