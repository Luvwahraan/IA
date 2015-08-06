include('array');
include('tools');

// On commence par déclarer deux tableaux, qui contiendrons les alliés
// et les ennemies tout le monde durant le combat, ainsi que l’id du
// poireau courant.
/*global allies = [], enemies = [], deadAllies = [],
  myLeek, alliesCell = [], enemiesCell = [];

if ( myLeek === null ) {
  myLeek = getLeek();
}*/

global allies = getAllies(),
  enemies = getEnemies(),
  deadAllies = [],
  myLeek = getLeek(),
  alliesCell = [] , enemiesCell = [];

debug(getOperations());


// Vérifie si un poireau est allié, non dépendant du niveau.
// Cela coûte le double d’opérations, en dessous du niveau 14.
if ( getLevel() < 14 ) {
  // 40 opérations
  isAlly = function (leek) {
    if ( getTeamID(leek) === getTeamID() ) {
      return true;
    }
    return false;
  };
}

/* Va chercher les alliés et ennemies, avant le niveau 16
 */
function processAllLeeks() {
  var leek = 0, cell = getCell(leek);
  do {
    //debug('On cherche '+getName(leek)+' ['+leek+']');
    if ( isAlly(leek) ) {
      push(allies, leek);
    } else {
      push(enemies, leek);
    }
    leek++;
    cell = getCell(leek);
  } while ( cell !== null );
}

function getEnemiesCell() {
  if ( enemiesCell[0] === null ) {
    for (var leek in enemies) {
      push(enemiesCell, getCell(leek));
    }
  }
  return enemiesCell;
}

function getAlliesCell() {
  if ( alliesCell[0] === null ) {
    for (var leek in allies) {
      push(alliesCell, getCell(leek));
    }
  }
  return alliesCell;
}


if ( getLevel() < 16 ) {
  getAllies = function () {
    return allies;
  };
  getEnemies = function () {
    return enemies;
  };

  if ( allies[0] === null and enemies[0] === null ) {
    processAllLeeks();
  }

} else if ( allies[0] === null and enemies[0] === null ) {
  allies = getAllies();
  enemies = getEnemies();
}

