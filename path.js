
global obstacle_list = getObstacles();

function getTopCell(cell) { return [ (cell - 17), "TOP" ]; }
function getRightCell(cell) { return [ (cell + 18), "RIGHT" ]; }
function getBottomCell(cell) { return [ (cell + 17), "BOTTOM" ]; }
function getLeftCell(cell) { return [ (cell - 18), "LEFT" ]; }

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

function compareDirection(keyA, valA, keyB, valB) {
  if ( keyA > keyB) { return 1; }
  else if ( keyA < keyB) { return -1; }
  return 0;
}

function getNearestDirectionCell(actualCell, destCell) {
  // On trouve toutes les cellules adjacentes.
  var topCell_tab = getTopCell(actualCell);
  var rightCell_tab = getRightCell(actualCell);
  var bottomCell_tab = getBottomCell(actualCell);
  var leftCell_tab = getLeftCell(actualCell);
  
  // Ensuite en calcule les distances entre ces cellules et la destination,
  // pour les trier.
  var NearCellDistance_tab = [];  
  NearCellDistance_tab[ getDistance( topCell_tab[0], destCell )] = topCell_tab;
  NearCellDistance_tab[ getDistance( rightCell_tab[0], destCell )] = rightCell_tab;
  NearCellDistance_tab[ getDistance( bottomCell_tab[0], destCell )] = bottomCell_tab;
  NearCellDistance_tab[ getDistance( leftCell_tab[0], destCell ) ] = leftCell_tab;
  arraySort(NearCellDistance_tab, compareDirection);
  
  // On retourne le premier résultat (la plus petite distance) qui n’est
  // pas un obscacle.
  for (var distance : var cell_tab in NearCellDistance_tab) {
    if ( not inArray( obstacle_list, cell_tab[0] ) ) {
      // -> return [cellule, direction, distance];
      return [cell_tab[0], cell_tab[1] , distance];
    }
  }
}

function isEdge(cell) {
  /* pas de bord        0
  bord haut :   X <= 17    1
  bord droit :  X % 35 = 17  2
  bord bas :    X >= 595    3
  bord gauche : X % 35 = 0  4 */

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

function add2Path(path_tab, cell, actualMP) {
  push(path_tab, cell);
  actualMP = actualMP - 1;
}

function makePath(myCell, destCell) {
  var actualCell = myCell;
  var path_tab = [];

  // Va chercher [cellule, direction, distance] pour la prochaine cellule.
  var nearestCell_tab = getNearestDirectionCell(actualCell, destCell);

  for (var MP = getMP(); MP > 0; MP-- ) {
        
  }
}

var myCell = getCell();
var enemy = getNearestEnemy();
//var enemy = getNearestEnemyToCell(cell);



