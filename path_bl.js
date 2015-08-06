
global obstacle_list = [];


/* Cellules adjacentes *****************************************************************/

function getTopCell(cell) { return [ (cell - 17), "TOP" ]; }
function getRightCell(cell) { return [ (cell + 18), "RIGHT" ]; }
function getBottomCell(cell) { return [ (cell + 17), "BOTTOM" ]; }
function getLeftCell(cell) { return [ (cell - 18), "LEFT" ]; }

/* Fin cellules adjacentes *************************************************************/


/* Mouvements directionnels ************************************************************/

function move2TopCell(cell, nb_cell) {
  var nCell = cell - (nb_cell*17);
  return [ moveTowardCell( nCell ), nCell ];
}

function move2RightCell(cell, nb_cell) {
  var nCell = cell + (nb_cell*18);
  return [ moveTowardCell( nCell ), nCell ];
}

function move2BottomCell(cell, nb_cell) {
  var nCell = cell + (nb_cell*17);
  return [ moveTowardCell( nCell ), nCell ];
}

function move2LeftCell(cell, nb_cell) {
  var nCell = cell - (nb_cell*18);
  return [ moveTowardCell( nCell ), nCell ];
}

/*Fin mouvements directionnels *********************************************************/


function moveDirection(direction, mp, actualCell) {
  //debug("On essaie de bouger vers " + direction );
  var return_tab;

  if ( direction == "TOP" ) {
    return_tab = move2TopCell(actualCell, mp);
  } else if ( direction == "RIGHT" ) {
    return_tab = move2RightCell(actualCell, mp);
  } else if ( direction == "BOTTOM" ) {
    return_tab = move2BottomCell(actualCell, mp);
  } else if ( direction == "LEFT" ) {
    return_tab = move2LeftCell(actualCell, mp);
  } else {
    return_tab = [ -1, actualCell ];
  }

  debug("On est sur " + getCell());
  return return_tab;
}

function findDirection(actualCell, nextCell) {
  if ( actualCell - 17 == nextCell ) {
    return "TOP";
    //return 0; // vers le haut
  } else if ( actualCell + 18 == nextCell ) {
    return "RIGHT";
    //return 1; // vers la droite
  } if ( actualCell + 17 == nextCell ) {
    return "BOTTOM";
    //return 2; // vers le bas
  } if ( actualCell - 18 == nextCell ) {
    return "LEFT";
    //return 3; // vers la gauche
  }
}

function compareDirectionTab(keyA, valA, keyB, valB) {
  //debug("On compare " +keyA+ " et " +keyB );
  if ( keyA > keyB) { return 1; }
  else if ( keyA < keyB) { return -1; }
  return 0;
}

function getNearestDirectionCell(actualCell, destCell) {
  debug("On cherche une direction.");

  // On trouve toutes les cellules adjacentes.
  var topCell_tab = getTopCell(actualCell);
  var rightCell_tab = getRightCell(actualCell);
  var bottomCell_tab = getBottomCell(actualCell);
  var leftCell_tab = getLeftCell(actualCell);

  // Ensuite en calcule les distances entre ces cellules et la destination,
  // pour les trier.
  var nearCellDistance_tab = [];
  nearCellDistance_tab[ getDistance( topCell_tab[0], destCell )] = topCell_tab;
  nearCellDistance_tab[ getDistance( rightCell_tab[0], destCell )] = rightCell_tab;
  nearCellDistance_tab[ getDistance( bottomCell_tab[0], destCell )] = bottomCell_tab;
  nearCellDistance_tab[ getDistance( leftCell_tab[0], destCell ) ] = leftCell_tab;
  nearCellDistance_tab = arraySort(nearCellDistance_tab, compareDirectionTab);

  for (var distance : var cell_tab in nearCellDistance_tab) {
    debug( "distanc[" + distance + "] cellulle[" + cell_tab[0] + "] direction[" + cell_tab[1] + "]" );
  }

  /* Pas de liste des obstacle avant lvl 21
  // On retourne le premier résultat (la plus petite distance) qui n’est
  // pas un obscacle.
  for (var distance : var cell_tab in nearCellDistance_tab) {
    if ( not inArray( obstacle_list, cell_tab[0] ) ) {
      // -> return [cellule, direction, distance];
      return [cell_tab[0], cell_tab[1] , distance];
    }
  }*/

  // Du coup on retourne tout.
  return nearCellDistance_tab;
}

function isEdge(cell) {
  if ( cell <= 17 ) {
    return 1; // haut
  } else if ( cell % 35 == 17 ) {
    return 2; // droite
  } else if ( cell >= 595 ) {
    return 3; // bas
  } else if ( cell % 35 == 0 ) {
    return 4; // gauche
  } else if ( 17 < cell and cell < 595 ) {
    return 0; // cellule valide, mais pas au bord
  }

  // La cellule n’existe pas.
  return -1;
}

function makePath(myCell, destCell, maxMP) {
  debug("On est sur "+myCell+" et on veut aller vers "+destCell);
  var actualCell = myCell;
  var path_tab = [];
  var direction = null;
  var actualMP = maxMP;

  // Va chercher les cellules proches, classer par distances.
  var nearestCell_tab = getNearestDirectionCell(actualCell, destCell);

  // On essaie maintenant de se déplacer dessus, sauf si c’est un bord de carte.
  // Sinon on essaie la suivante.
  var costMP = 0;
  var cell_tab;
  do {
    cell_tab = shift( nearestCell_tab );

    // Bah… où est le tableau ?
    if ( cell_tab == null ) {
      return -1;
    }

    if ( isEdge(cell_tab[0]) == 0 ) {
      debug( cell_tab[0] + " est valide, à la distance " + cell_tab[2] );
      direction = cell_tab[1];
      costMP = moveTowardCell( cell_tab[0], 1 );

      // On vérifie qu’on ait bougé.
      if ( costMP > 0 ) {
        actualCell = cell_tab[0];
        actualMP = actualMP - costMP;
        debug("On est sur " + getCell());
      }
    } else {
      debug("Cell " +cell_tab[0]+ " est au bord ; on choisie une autre cellule.");
    }
  }
  while ( costMP < 1 );

  // On utilise le reste des MP alloué pour se déplacer dans la même direction.
  for (actualMP=actualMP; actualMP > 0; actualMP-- ) {
    debug( "Il reste " + actualMP + " MP. On bouge vers " + cell_tab[1] );

    var moveReturn = moveDirection( cell_tab[1], 1, actualCell );

    // S’il y a un obscacle, on change de direction.
    if ( moveReturn[0] < 1 and actualMP < maxMP ) {
      debug("Impossible de bouger dans cette direction ; on en change");
      actualMP = makePath( actualCell, destCell, actualMP );
      break;
    } else {
      // Sinon on a bougé : on met à jour la position.
      actualCell = moveReturn[1];
    }
  }

  return (maxMP - actualMP);
}

var myCell = getCell();
var enemyCell = getNearestEnemy();

makePath( myCell, enemyCell, getMP() );

debugE("Operations : "+ getOperations());
