# real-time-signal-monitoring-poc
PoC crèè en utilisant **Node.js** **Angular.js**

# Description 

Le PoC consiste à benchmarker le nombre de collisions entre deux datasources numériques à output aléatoire. Plus précisément, on voudrait tracer en temps réel les collisions entre randomBytes du module Crypto (NodeJS), ci-après DataSource #1 (ou similaire selon le langage), qui généralement est considéré comme pseudo aléatoire, et /dev/urandom du noyau Linux, ci après DataSource #2, qui est basé sur un entropy pool alimenté par le comportement du hardware, les interactions de l'utilisateur avec les périphériques d'entrée, etc.

**Etape 1** : Le résultat ressemblerait à une interface web, comportant un graphe (discret) montrant les outputs périodiques de en pseudo-temps-réel de DataSource #1 et DataSource #2, tout en mettant l'accent sur les collisions entre DS1 et DS2 (collision étant définie comme étant DS1(t) == DS2(t)). Toutes les minutes, un bar chart incrémental, au dessous de ce graphe sera mis à jour afin de préciser et tracer le nombre de collisions entre DS1 et DS2.

Pour une expérience utilisateur fluide, il est recommendé de générer une paire de valeurs toutes les 50ms sur le graphe. De plus, afin que les résultats soient pertinents, on normalisera les valeurs de DS1 et DS2 entre -127 et 127 (pour une plage totale de 255 valeurs entières possibles).

Il est à ajouter que l'interface doit disposer de deux inputs HTML de type number, permettant de dynamiser le taux et la plage d'échantillonnage fixés initialement (e.g. 255 valeurs à 20Hz). Un changement de ces valeurs au runtime doit mettre à l'échelle la courbe en temps réel afin de pouvoir être adapé à la grandeur des valeurs calculées. 

Il devrait être possible par la suite de générer un rapport PDF résumant quelques métadonnées sur l'interface (date de début, nombre d'échantillons, nombre de collisions, etc), ainsi qu'un aperçu des graphes déjà générés.

Il est fort essentiel que le le backend soit à base de NodeJS, et soit orienté REST, et que le frontend soit à base de AngularJS. Il est préférable que la performance frontend puisse garantir un framerate d'au moins 30FPS pour un échantillonnage inférieur ou égal à 20Hz (à vérifier via le Timeline de Chrome Developer Tools)

**Etape 2** : Reproduire le même PoC avec comme entropy pool, un parcours aléatoire d'un écrit de Shakespeare: http://ocw.mit.edu/ans7870/6/6.006/s08/lecturenotes/files/t8.shakespeare.txt

La commande :

 curl http://ocw.mit.edu/ans7870/6/6.006/s08/lecturenotes/files/t8.shakespeare.txt | wc -w

.. montre que ce flux est composé de 901325 mots. On se propose de ce fait de générer depuis les même DS1 et DS2 des entiers entre 0 et 901324 sur une fréquence arbitraire (on maintiendra initialement 20Hz). Les deux courbes illustrent le nombre incrémental de mots distincts parcourus par les index aléatoires générés. Une checkbox activable/désactivable devrait afficher/masquer une sous-interface supplémentaire composée de deux colonnes affichera en temps réel le texte autogénéré par DS1 et DS2, séparé par des espaces. Il doit être possible de stopper ce processus à tout moment pour qu'il soit par la suite possible de télécharger les deux textes autogénérés.

# Screenshots
![Screen1](sig1.png?raw=true "Screen1")

![Screen2](sig2.png?raw=true "Screen2")

![Screen3](sig3.png?raw=true "Screen3")

![Screen4](sig4.png?raw=true "Screen4")
