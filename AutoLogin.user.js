// ==UserScript==
// @name          AutoLogin - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @contributor   Guillaume 'radicaldreamer' Raineri <raineri.guillaume@gmail.com>
// @licence       BEER-WARE https://github.com/Antoine-Pous/AnoCheat/blob/master/LICENSE-BEER-WARE
// @namespace     http://www.dvp.io/fr/blog/anocheat-autologin
// @description   Permet de se connecter automatiquement quand la page du chat est chargée et de récupérer l'historique de conversation
// @include       http://chat.developpez.com/
// @version       2015.03.12.1
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

function autoLogin() {
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
            $("#zoneSaisie").val('/BACK ' + autoBackNumber);
            $('#envoyer').trigger('click');
        }, 3000);
    }
    /**
     * Intégration dans le menu Options
     */
    setTimeout(function() {
        var autoBackCount = 30;
        var autoBackCheckbox = '';
        if (autoBackNumber != null) {
            autoBackCount = autoBackNumber;
            autoBackCheckbox = ' checked';
        }
        var appendAutoBack = '<p><input id="dlgOptAutoBack" type="checkbox" value="1"'+ autoBackCheckbox +'><label for="dlgOptAutoBack">Auto/Back<br><small>Cette option permet de restaurer l\'historique de conversation</small><br /></label><input type="text" id="autoBackText" value="' + autoBackCount + '" /></p>';
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
        var newValNumber = parseInt(Math.trunc($('#autoBackText').val()));
        if (newValNumber >= 15 && newValNumber <= 100) {
            if ($('#dlgOptAutoBack').is(':checked')) {
                ecrireCookie('AnoCheat_AutoLogin', newValNumber, 365);
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
getGlobal(autoLogin);
