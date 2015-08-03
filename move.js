include('array');

/* Vérifie si deux cellules sont alignées.
 * @param cellcoordA cellcoordB  Deux tableaux de coordonnées de cellules en ligne.
 * @return  int 1  alignées sur l’axe x
 *        2  alignées sur y
 *        3  alignées en diagonales
 *        0  non alignées
 *        -1  superposées
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
}

function getCircleArea(rayon) {
  var area = rayon * rayon * PI;
}

debug("Coordonnées selon l’angle :");
debug( getAssocKeys( getCircleRadiusCoord([0,0], 1) ) );






/*function getObstacles_() {
  

  for (var cell = 0; cell <= 612; cell++ ) {
    
    //lineOfSight(start, end)
  }
}

if ( getLevel() < 21 ) {
  global getObstacles = getObstacles_();
}*/

//lineOfSight(Nombre start , Nombre end , Nombre leekToIgnore) : Booléen los


function getReachableCells() {
  //getCellFromXY( getCellX(myCell) , getCellY(myCell) );
  var myMP = getMP(), myCell = getCell(),
    myCellCoord = [ getCellX(myCell), getCellY(myCell) ],
    cellArray = [];


  /* On cherche d’abord toutes cellules périphériques du cercle de rayon
    correspondant au points de mouvement disponibles, puis on en déduit
    toutes les cellules entre son origine et ce périmètre.
  */
  
  

  /*for (var mp = 1; mp < myMP; mp++  ) {
    push(cellArray, myCellCoord[0] );
  }

  var x = myCellCoord[0], y = myCellCoord[1];
  while ( getCellFromXY(x, y) !== null ) {

    x++;
  }
    
  /*for (var mp = 1; i < myMP; mp++  ) {
    //for (  )
  }*/
}