include('array');

/* Vérifie si deux cellules sont alignées.
 * @param   cellcoordA cellcoordB  Deux tableaux de coordonnées de cellules en ligne.
 * @return  int
 *          1   alignées sur l’axe x
 *          2   alignées sur y
 *          3   alignées en diagonales
 *          0   non alignées
 *          -1  superposées
 */
function cellsAreInline(cellCoordA, cellCoordB) {
  if ( cellCoordA[0] == cellCoordB[0]  ) {
    return 1; // x
  } else if ( cellCoordA[1] == cellCoordB[1]  ) {
    return 2; // y
  } else if ( cellCoordA[0] == cellCoordB[1] or
        cellCoordA[1] == cellCoordB[0] ) {
    return 3; // diagonale
  } else if ( cellCoordA === cellCoordB ) {
    return -1; // même cellule O_o'
  }
  return 0;
}

/* Vérifie si deux cellules sont alignées.
 * @param   cellcoordA cellcoordB  Deux tableaux de coordonnées de cellules en ligne.
 * @return  true|false
 */
function cellsAreInlineSimple(cellCoordA, cellCoordB) {
  if ( cellCoordA[0] == cellCoordB[0] or cellCoordA[1] == cellCoordB[1] ) {
    return true;
  }
  return false;
}

/* Donne la liste des cellules entres deux cellules en ligne.
 * @param cellcoordA cellcoordB  Deux tableaux de coordonnées de cellules en ligne.
 * @return celltab Retourne un tableau d’id de cellules.
 */
function getLineCells(cellCoordA, cellCoordB) {
  // On définie d’abord sur quel axe les cellules sont alignées.
  var align = cellsAreInline(cellCoordA, cellCoordB),
    axeAlign, axeVar, coord, cell_tab;

  // Pour savoir sur quel axe chercher des cellules.
  if ( align == 0 || align == 3 ) {
    return []; // Pas alignées.
  } else if ( align == 1 ) {
    // Alignées sur x. On va donc faire varier y.
    axeAlign = 0;
    axeVar = 1;
  } if ( align == 2 ) {
    // Alignées sur x. On va donc faire varier y.
    axeAlign = 1;
    axeVar = 10;
  }

  for (var a = min(cellCoordA[axeVar], cellCoordB[axeVar]);
      a >= max(cellCoordA[axeVar], cellCoordB[axeVar]);
      a++ ) {
    coord[axeVar] = a;
    coord[axeAlign] = cellCoordA[axeAlign];
    push(cell_tab, getCellFromXY(coord[0], coord[1]) );
  }

  return cell_tab;
}

/* Donne les coordonnées du périmètre d’un cercle.
 * @param   coordOrigine_tab, rayon
 * @return  un tableau de coordonées de cellules
 */
function getCircleRadiusCoord(cellCoord, rayon) {
  var coord = [],
    x, y,
    cellId,
    avance = (2*PI / (1+rayon*4) );

  // 0.0923997839 = Pi / ( 17 x 2 cellules, deux fois )
  //for (var angle = 0; angle <= (2*PI); angle = angle + 0.0923997839) {
  for (var angle = 0; angle <= (2*PI); angle = angle + avance) {
    x = round( cellCoord[0] + rayon * cos(angle) );
    y = round( cellCoord[1] + rayon * sin(angle) );
    cellId = getCellFromXY(x, y);

    if (cellId === null ) { continue; }
    coord[ cellId ][0] = x;
    coord[ cellId ][1] = y;
    //debug( cellId + ' : X('+ x +') Y('+ y +')           '+angle );
  }
  return coord;
}

function getCircleArea(rayon) {
  var area = rayon * rayon * PI;
}












/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/*
gauche        droite        haut        bas
cell - 18     cell + 18     cell - 17   cell + 17

bord haut :   X <= 17
bord gauche : X % 35 = 0
bord droit :  X % 35 = 17
bord bas :    X >= 595
*/

/* Liste des obstacles, dénifie une fois pour toutes.
 */
global obstacles_celltab;
if ( obstacles_celltab === null ) {
  obstacles_celltab = getObstacles();
}

/* Détermine une cellule adjacente.
 * @param   cell_id
 * @return  cell_id
 */
function getNorthCell(cell) { return (cell - 17); }
function getEastCell(cell) { return (cell + 18); }
function getSouthCell(cell) { return (cell + 17); }
function getOuestCell(cell) { return (cell - 18); }

/* Détermine si une cellule se trouve au bord de la carte.
 * @param   cell_id
 * @return  -1  no cell
 *          0   map cell
 *          1   north edge
 *          2   east edge
 *          3   south edge
 *          4   ouest edge
 */
function isEdge(cell) {
  if      ( cell <= 17 )      { return 1; }
  else if ( cell % 35 == 17 ) { return 2; }
  else if ( cell >= 595 )     { return 3; }
  else if ( cell % 35 == 0 )  { return 4; }
  else if ( 17 < cell and cell < 595 ) { return 0; }
  return -1;
}

/*
 */
function checkCellInPath(@position, @endCell, @invalid_celltab, @path, @lastCell, @distance) {
    distance = getCellDistance(position, endCell);
    var cell_assoc = [];

    // On cherche les cellules proches, classées par distances.
    for ( var cell in [ getNorthCell(position), getEastCell(position), getOuestCell(position), getSouthCell(position) ] ) {
      // Si la cellules n’est pas joignable, on la laisse.
      if ( inArray(invalid_celltab, cell)
            or inArray(obstacles_celltab, cell)
            or isEdge(cell) != 0
            or isLeek(cell) ) {
        // manque les invocations à tester
        continue;
      }

      cell_assoc[ cell ] = getCellDistance(cell, endCell);
    }

    // S’il n’y a pas de cellules valides, on revient à la position précédente, et on invalide celle-ci.
    if ( count( cell_assoc ) < 1 ) {
      push(invalid_celltab, position);
      pop(path);
      position = pop(lastCell);
    } else {
      // Sinon on se prépare à l’itération suivante.
      assocSort(cell_assoc, SORT_ASC);
      //debug( 'adjacentes : ' + cell_assoc);
      push(lastCell, position);
      position = shift( getAssocKeys(cell_assoc) );
      push(path, position);
    }

    return position;
}

/* Retourne un chemin de cellules, sous forme d’un tableau.
 * @param   start_cellId,  end_cellId
 * @return  cell_tab
 */
if ( getLevel() < 54 ) {
  getPath = function(startCell, endCell) {
    if ( startCell === null || endCell === null ) { return []; }

    var position = startCell,
      maxMove = getTotalMP() + 10,
      invalid_celltab = [],
      cell_assoc = [],
      lastCell = [],
      path = [],
      distance = 50;

    //if ( isLeek( getCellContent(endCell) ) )

    while ( distance > 0 && count(path) < maxMove ) {
      checkCellInPath( position, endCell, invalid_celltab, path, lastCell, distance);
      //debug( 'Count(' + count(path) + ') distance(' + distance + ')' );
    }

    return path;
  };
}


