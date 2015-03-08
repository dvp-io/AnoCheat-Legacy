AnoCheat
========
Dans ce répertoire se trouvent tous les scripts qui permettent d'ajouter de nouvelles fonctionalités à l'AnoChat.

N'hésitez pas à me soumettre vos idées, j'essaie d'allouer 2-3h par semaine à la conception et au maintien de ces scripts.

Les scripts présents sur le [FTP I/O](http://dl.dvp.io/anocheat/) qui ne sont pas sur ce repo sont à utiliser avec prudence, je ne publie que les userscripts en bêta / stables

## Licence
Tous les scripts sont sous licence BEER-WARE (Rev 42)
```
/*
 * ----------------------------------------------------------------------------
 * "LICENCE BEER-WARE" (Révision 42):
 * <gecko@dvp.io> a créé ce fichier. Tant que vous conservez cet avertissement,
 * vous pouvez faire ce que vous voulez de ce truc. Si on se rencontre un jour et
 * que vous pensez que ce truc vaut le coup, vous pouvez me payer une bière en
 * retour. Antoine `Gecko` Pous
 * ----------------------------------------------------------------------------
 */
 ``` 

## Participer à l'élaboration des scripts
Pour participer respectez ces règles:

- Le script ne doit pas casser le fonctionnement du chat et des autres scripts publiés sur ce repo
- Le code doit rester lisible et auto-documenté 
- La version doit être mise à jour lors de votre pull dans le format suivant: AAAA.MM.JJ.ID (ID est le nombre de modification effectuées ce jour, 1 par défaut)
- Le script doit utiliser les mêmes version jQuery/jQuery UI que le chat
- Le script ne doit en aucun cas modifier les fonctions natives du chat
- Mettez votre nom sur le tag @contributors en suivant une de ces méthodes:
```javascript
/*
 *@contributors: Prénom `Pseudo` Nom <mail>
 *               Pseudo <mail>
 *               Pseudo <lien vers le profil développez>
*/
```

## Les API I/O
Certains scripts utilisent les API I/O, il n'est pas prévu de changer de méthode dans l'immédiat, sans ça les scripts seraient trop lourds et surchargeraient le navigateur. Si vous voulez concevoir une API contactez moi je vous fournirais les informations concernant le gestionnaire.

## Pré-requis
Pour utiliser ces scripts vous devez avoir installé une extension sur votre navigateur:

[GreaseMonkey](https://addons.mozilla.org/fr/firefox/addon/greasemonkey/) pour Firefox 

[TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) pour Chromium 

[ViolentMonkey](https://addons.opera.com/fr/extensions/details/violent-monkey/) pour Opera 

## INSTALLATION
Pour installer un script il suffit de vous rendre sur le [FTP I/O] (http://dl.dvp.io/anocheat) et de cliquer sur le script qui vous intéresse, l'extension vous demandera si vous voulez l'installer, cliquez sur accepter.

Une fois le script installé vous devez fermer le chat et rafarichir la page en vidant le cache (Ctrl + F5)

## MISES A JOUR
Les scripts sont conçus pour êtres mis à jours automatiquement, vérifiez la configuration de votre extension *Monkey.

Les scripts sont automatiquement mis à jour sur le FTP lorsqu'un push est effectué, les extensions peuvent mettre un certain temps avant de checker le FTP. Il est conseillé de paramétrer votre extension pour effectuer un check toutes les 24h minimum afin d'éviter tout problème d'incompatibilité avec les dernières versions du chat et des API I/O.

## UTILISATION:
Les différents guides d'utilisation des scripts est disponible sur le wiki du repo

## Je tiens à remercier:
- Anomaly, pour le travail fournit sur l'AnoChat et tout le reste
- SpaceFrog, ThomasR et CroftMan, pour les différentes phases de tests et les nombreux retours
