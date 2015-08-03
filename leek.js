include('array');
include('tools');

// On commence par déclarer deux tableaux, qui contiendrons les alliés
// et les ennemies tout le monde durant le combat.
global allies, enemies;


if ( getLevel() < 14 ) {
  isAlly = function (leek) {
    if ( getTeamID(leek) === getTeamID() ) {
      return true;
    }
    return false;
  };
}

// Renvoie un tableau associatif de la forme leek -> cell
function processAllLeeks() {
  var enemies_assoc = [],  allies_assoc = [], 
      leek = 0, cell = getCell(leek);
  do {
    //debug('On cherche '+getName(leek)+' ['+leek+']');
    if ( isAlly(leek) ) {
      allies_assoc[leek]['cell'] = cell;
    } else {
      enemies_assoc[leek]['cell'] = cell;
    }
    leek++;
    cell = getCell(leek);
  } while ( cell !== null );
  allies = allies_assoc;
  enemies = enemies_assoc;
}

if ( getLevel() < 16 ) {
  getAllies = function () {
    return getAssocKeys(allies);
  };
  getEnemies = function () {
    return getAssocKeys(enemies);
  };
}



// Si les deux sont vides, on cherche tout le monde.
if ( allies === null and enemies === null ) {
  processAllLeeks();
}
