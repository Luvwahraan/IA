
/***************************************************************/
function canIBreak(value) {
   if ( value == USE_INVALID_TARGET or
    value == USE_INVALID_COOLDOWN or
    value == USE_INVALID_POSITION
    ) {
    return true;
  }
  return false;
}

function shotLeek(leek) {
  var ret = null;
  while ( ret != USE_NOT_ENOUGH_TP and getLife(leek) > 0) {
    ret = useWeapon(leek);
  if ( canIBreak(ret) ) { break; }
  }
}

function sparkLeek(leek) {
  var ret = null;
  while ( ret != USE_NOT_ENOUGH_TP and getLife(leek) > 0) {
    ret = useChip(CHIP_SPARK, leek);
  if ( canIBreak(ret) ) { break; }
  }
}


/***********************************************************/

global myLeek = getLeek();
global myWeapon = getWeapon();

// Infos sur l’ennemi.
var enemy = getNearestEnemy();
global enemyCell = getCell(enemy);
global enemyMP = getMP(enemy);
var enemyWeapon = getWeapon(enemy);
var enemyWeaponMinScope = getWeaponMinScope(enemyWeapon);
var enemyWeaponMaxScope = getWeaponMaxScope(enemyWeapon);
global enemyDistance;
global nextEnemyDistance;

function calcDistance() {
  enemyDistance = getCellDistance(getCell(), enemyCell);
  nextEnemyDistance = enemyDistance - enemyMP;
  debug('Distances ennemi : '+enemyDistance+', '+nextEnemyDistance);
}
calcDistance();

function equipWeapon( enemyDist ) {
  // On équipe s’il le faut, et on change si l’ennemie est trop près.
  if ( myWeapon == null ) {
    setWeapon(WEAPON_DOUBLE_GUN);
    myWeapon = WEAPON_DOUBLE_GUN;
  } else if ( enemyDist < 2 and myWeapon != WEAPON_PISTOL ) {
    setWeapon(WEAPON_PISTOL);
    myWeapon = WEAPON_PISTOL;
  } else if ( enemyDist >= 2 and myWeapon != WEAPON_DOUBLE_GUN ) {
    setWeapon(WEAPON_PISTOL);
    myWeapon = WEAPON_PISTOL;
  }
}


var it = 0;
while ( getTP() > 0 and getMP() > 0 ) {
  it++;
  debug("Itération " + it);

  /*if ( getLife(enemy) < 51 ) {
  if ( enemyDistance < 2 ) {
    moveAwayFrom(enemy, 2);
    calcDistance();
  }
  if ( nextEnemyDistance <= 7 + getMP() ) {
    while ( enemyDistance >= 5 ) {
      moveToward(enemy, 1);
      calcDistance();
    }
    equipWeapon(enemyDistance);
    shotLeek(enemy);
    useChip(CHIP_PEBBLE, enemy);
    calcDistance();
  }
  }

  /*if ( getLife() < 50 and enemyDistance + enemyMP < 10 + getMP() ) {
    moveAwayFrom(enemy);
  useChip(CHIP_SPARK, enemy);
  useChip(CHIP_BANDAGE, leek);
  helmetLeek(myLeek);
  }*/

  /*/ Si on va mourir, on tente une attaque suicide.
  if ( getLife() < 50 ) {
    if ( getLife(enemy) <= 51 ) {
    if ( enemyDistance < 2 ) {
      moveAwayFrom(enemy);
    } else if ( enemyDistance + getMP() >= 5 ) {
      moveToward(enemy);
    }
    useChip(CHIP_PEBBLE, enemy);
    shotLeek(enemy);
    calcDistance();
    } else {
    useChip(CHIP_BANDAGE, myLeek);
    useChip(CHIP_HELMET, myLeek);
    shotLeek(enemy);
    useChip(CHIP_PEBBLE, enemy);
    }
  }

  // Si trop près de l’ennemi, on s’éloigne.
  /*if ( enemyDistance < 2 ) {
    moveAwayFrom(enemy);
  }*/

  equipWeapon( enemyDistance );

  // L’ennemi approche… on se protège !
  if ( 11 >= nextEnemyDistance and nextEnemyDistance <= 13 ) {
    useChip(CHIP_HELMET, myLeek);
  useChip(CHIP_PROTEIN, myLeek);
  }

  // L’ennemi est loin, on cavale.
  if ( nextEnemyDistance > 10 + getMP() ) {
    debug("Enemy far away. Moving.");
    moveToward(enemy);
  calcDistance();
  }

  while ( enemyDistance > 10 and getMP() > 0 ) {
    debug("Moving a little");
    moveToward(enemy, 1);
    calcDistance();
  }

  // Selon la distance, on choisie son attaque.
  if ( enemyDistance <= 7 ) {
    shotLeek(enemy);
  } else if ( enemyDistance <= 10 ) {
    sparkLeek(enemy);
  }

  if ( isDead(enemy) ) {
    debug("Enemi mort. Suivant !");
    // On met à jour les donnée de l’ennemi.
    enemy = getNearestEnemy();
    enemyCell = getCell(enemy);
    if ( enemy === null or enemyCell === null ) { break; }

    enemyWeapon = getWeapon(enemy);
    enemyWeaponMinScope = getWeaponMinScope(enemyWeapon);
    enemyWeaponMaxScope = getWeaponMaxScope(enemyWeapon);
    calcDistance();
  } else if ( enemyDistance <= 10 ) {
    debug("L’ennemi est trop près… on s’éloigne.");
    moveAwayFrom(enemy);
  calcDistance();
  }

  if ( getTP() > 0 ) {
    // Si on est blessé on se soigne, ou un allié proche.
    if ( getLife() < 100 ) {
      useChip(CHIP_BANDAGE, myLeek);
    } else {
      var ally = getNearestAlly();
      var allyLife = getLife(ally);
      if ( allyLife < 100 ) {
        useChip(CHIP_BANDAGE, ally);
      } else if ( allyLife < 50 ) {
        useChip(CHIP_HELMET, ally);
      } else {
        useChip(CHIP_HELMET, myLeek);
    }
    }

    if ( enemyDistance <= 5 ) {
      useChip(CHIP_PEBBLE, enemy);
    }

    // plus rien à faire : on sort de la boucle.
    break;
  }

  debug( "Il reste " + getTP() + "TP et " + getMP() + "MP." );
}

debugE("Operations : " + getOperations());

include("quotes");
randSay();
