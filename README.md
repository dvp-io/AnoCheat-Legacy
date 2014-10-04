AnoCheat
========

Dans ce répertoire se trouvent tous les scripts qui permettent d'ajouter de nouvelles fonctionalités à l'AnoChat.

N'hésitez pas à me soumettre vos idées, j'essaie d'allouer 2-3h par semaine à la conception et au maintien de ces scripts.

Les scripts présents sur le FTP qui ne sont pas sur ce repo sont à utiliser avec prudence, je ne publie que les userscripts en bêta / stables

## Licence
Tous les scripts sont désormais sous licence BEER-WARE

## Participer à l'élaboration des scripts
Pour participer respectez ces règles:

- Le script ne doit pas casser le fonctionnement du chat
- La version doit être mise à jour lors de votre pull request dans le format suivant: AAAA.MM.JJ.ID (ID est le nombre de modification effectuées ce jour, 1 par défaut)
- Le script doit utiliser jQuery/jQuery UI
- Mettez votre nom sur le tag @contributors, exemple:
```javascript
/*
 *@contributors: Toto <mail>
 *               Tata <mail>
*/
```

## Les API I/O
Certains scripts utilisent les API I/O, il n'est pas prévu de changer de méthode dans l'immédiat, sans ça les scripts seraient trop lourds et surchargeraient le navigateur.

## Pré-requis

Pour utiliser ces script vous devez avoir installé une extension sur votre navigateur:

[GreaseMonkey](https://addons.mozilla.org/fr/firefox/addon/greasemonkey/) pour Firefox 

[TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) pour Chromium 

[ViolentMonkey](https://addons.opera.com/fr/extensions/details/violent-monkey/) pour Opera 

## INTALLATION

Pour installer un script il suffit de vous rendre sur le [FTP I/O] (http://dl.dvp.io/anocheat) et de cliquer sur le script qui vous intéresse, l'extension vous demandera si vous voulez l'installer, cliquez sur accepter.

Une fois le script installé vous devez fermer le chat et rafarichir la page en vidant le cache (ctrl + F5)

## MISES A JOUR

Les scripts sont conçus pour êtres mis à jours automatiquement, vérifiez la configuration de votre extension *Monkey.

Les scripts sont automatiquement mis à jour sur le FTP lorsqu'un push est effectué, les extensions peuvent mettre un certain temps avant de checker le FTP. Il est conseillé de paramétrer votre extension pour effectuer un check toutes les 24h minimum afin d'éviter tout problème d'incompatibilité avec les dernières versions du chat.

## Remerciements à:

- Anomaly, pour le travail fourni sur l'AnoChat et tout le reste
- SpaceFrog, ThomasR et CroftMan, pour les différentes phases de test et les nombreux retour
