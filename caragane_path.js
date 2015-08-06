function _getPath(courant, arrivee) {
  var path = [];
  if (getCellContent(arrivee) != CELL_OBSTACLE && arrivee != null) {
    var depart = -1;
    /* ajout de courant dans la liste ouverte */
    var liste_ouverte = [];
    var liste_ouverte_bu = [];
    liste_ouverte[courant] = depart;
    var liste_fermee = [];
    liste_fermee[courant] = depart;
    var weight = [];
    weight[courant] = [0, 99];
    _addAdjacentCells(courant, liste_ouverte, liste_fermee, weight, arrivee);
    //tant que la destination n'a pas été atteinte et qu'il reste des noeuds à explorer dans la liste ouverte
    var stopLoop = 0;
    while (!(courant == arrivee) && count(liste_ouverte) > 0 && stopLoop < 1000) {
      stopLoop++;
      //on cherche le meilleur noeud de la liste ouverte, on sait qu'elle n'est pas vide donc il existe
      var ops = getOperations();
      var m_coutf = 9999;
      for (var key: var node in liste_ouverte) {
        if (weight[key][1] < m_coutf) {
          //optimisation du nombre d'element dans la liste ouverte
          /*liste_ouverte_bu[courant] = liste_ouverte[courant];
          removeKey(liste_ouverte, courant);*/
          m_coutf = weight[key][1];
          courant = key;
        } else {
          //optimisation du nombre d'element dans la liste ouverte
          liste_ouverte_bu[key] = liste_ouverte[key];
          removeKey(liste_ouverte, key);
        }
      }

      //on le passe dans la liste fermee, il ne peut pas déjà y être
      liste_fermee[courant] = liste_ouverte[courant];
      removeKey(liste_ouverte, courant);
      //Optimisation de la taille du tableau
      removeKey(weight, courant);

      //on recommence la recherche des noeuds adjacents
      _addAdjacentCells(courant, liste_ouverte, liste_fermee, weight, arrivee);
      if(count(liste_ouverte) == 0) {
        debug("plop");
        liste_ouverte = liste_ouverte_bu;
        liste_ouverte_bu = [];
      }
      debug("cout en opération for: " + (getOperations() - ops - 2) + "\n");
    }
    /* si la destination est atteinte, on remonte le chemin */
    if (courant == arrivee) {
      _getBackPath(depart, arrivee, path, liste_fermee);
      debug("path: " + path);
    }
  }
  return path;
}

function _addAdjacentCells(courrant, @liste_ouverte, @liste_fermee, @weight, arrivee) {
  //on met tous les noeud adjacents dans la liste ouverte (+vérif)
  var courrantX = getCellX(courrant);
  var courrantY = getCellY(courrant);
  for (var cell in [getCellFromXY(courrantX + 1, courrantY), getCellFromXY(courrantX, courrantY + 1), getCellFromXY(courrantX - 1, courrantY), getCellFromXY(courrantX, courrantY - 1)]) {
    if (cell == null) { /* en dehors de l'image, on oublie */
      continue;
    }
    if (getCellContent(cell) == CELL_OBSTACLE) {
      continue;
    }


    if (liste_fermee[cell] == null) {
      // le noeud n'est pas déjà présent dans la liste fermée
      //calcul du cout G du noeud en cours d'étude : cout du parent + distance jusqu'au parent
      var tmpWeight = [weight[courrant][0] + getCellDistance(cell, courrant)];
      tmpWeight[1] = tmpWeight[0] + getCellDistance(cell, arrivee);
      if (liste_ouverte[cell] != null) {
        //le noeud est déjà présent dans la liste ouverte, il faut comparer les couts
        if (tmpWeight[1] < weight[cell][1]) {
          //si le nouveau chemin est meilleur, on met à jour
          liste_ouverte[cell] = courrant;
          weight[cell] = tmpWeight;
        }
        //le noeud courant a un moins bon chemin, on ne change rien
      } else {
        //le noeud n'est pas présent dans la liste ouverte, on l'y ajoute
        liste_ouverte[cell] = courrant;
        weight[cell] = tmpWeight;
      }
    }
  }
}

function _getBackPath(depart, arrivee, @path, @liste_fermee) {
  //l'arrivée est le dernier élément de la liste fermée
  var tmp = liste_fermee[arrivee];
  var point = arrivee;
  var prec = tmp;

  push(path, point);

  while (prec != depart[1]) {
    point = prec;
    push(path, point);
    tmp = liste_fermee[tmp];
    prec = tmp;
  }
  reverse(path);
}



function _getPathLength(cell1, cell2) {
  return count(_getPath(cell1, cell2));
}
