include('tools');

/* gestion de mon poireau *************************************/

global myLeek;

if ( myLeek == null ) {
  myLeek = getLeek();
}

global myWeapon;
if ( myWeapon == null ) {
  setWeapon(WEAPON_DOUBLE_GUN);
  myWeapon = getWeapon();
}

/************************************************************/



// Infos sur l’ennemi.
global target = [];
if ( target === null or isDead(target['id']) ) {
  target['id'] = getNearestEnemy();
  target['mp'] = getTotalMP( target['id'] );
}
target['weapon']    = getWeapon(target['id']);
target['cell']      = getCell(target['id']);
target['minScope']  = getWeaponMinScope(target['weapon']);
target['maxScope']  = getWeaponMaxScope(target['weapon']);

debug(target);

function targetDistance() {
  target['distance'] = getCellDistance( getCell(), target['cell'] );
  target['nextDistance'] = target['distance'] - target['mp'];
  debug('Distances de la cible : '+target['distan,e']+', '+target['nextDistance']);
}
targetDistance();

function shotLeek(leek) {
  var ret = useWeapon(leek);
  while ( ret == USE_SUCCESS || ret == USE_FAILED ) {
    ret = useWeapon(leek);
  }
  return ret;
}

function sparkLeek(leek) {
  var ret = useChip(CHIP_SPARK, leek);
  while ( ret == USE_SUCCESS || ret == USE_FAILED ) {
    ret = useChip(CHIP_SPARK, leek);
  }
  return ret;
}

function moveToCell(cell, distance, mp) {
  var cellDistance = getCellDistance( getCell(), cell );
  while ( distance > cellDistance or getMP() > mp ) {
    moveTowardCell(cell);
    cellDistance = getCellDistance( getCell(), cell );
  }
  targetDistance();
}


/* Gestion cooldown */

global lastUse;
if ( lastUse === null ) {
  for ( var chip in getChips() ) {
    lastUse[chip] = 0;
  }
}

for ( var chip : var turn in lastUse ) {
  lastUse[chip]--;
}

function useChip_(chip, leek) {
  var ret = useChip(chip, leek);
  if ( ret == USE_SUCCESS || ret == USE_FAILED ) {
    lastUse[chip] = getChipCooldown(chip);
  }
  return ret;
}


/* fin gestion cooldown */


if ( lastUse[CHIP_HELMET] <= 0 ) {
  useChip_(CHIP_HELMET, myLeek);
}
if ( lastUse[CHIP_PROTEIN] <= 0 ) {
  useChip_(CHIP_PROTEIN, myLeek);
}

if ( target['nextDistance'] > 10 + getMP() ) {
  debug( 'La cible est loin : '+target['nextDistance']+'.' );
  moveToward(target['id']);

}

// Si la vie a baissé, on se soigne.
if ( getLife() < getTotalLife() ) {
  useChip( CHIP_BANDAGE, myLeek );
}

if ( target['distance'] <= 7 ) {
  if ( target['distance'] < 2 and myWeapon != WEAPON_PISTOL ) {
    setWeapon(WEAPON_PISTOL);
    myWeapon = WEAPON_PISTOL;
  } else if ( target['distance'] >= 2 and myWeapon != WEAPON_DOUBLE_GUN ) {
    setWeapon(WEAPON_PISTOL);
    myWeapon = WEAPON_PISTOL;
  }

  shotLeek( target['id'] );
} else if ( target['distance'] <= 10 ) {
  sparkLeek( target['id'] );
}

// S’il reste des points, on jette un caillou.
if ( getTP() >= 2 && target['distance'] <= 5 ) {
  useChip(CHIP_PEBBLE, target['id']);
}



debugE("Operations : " + getOperations());

include("quotes");
randSay();
