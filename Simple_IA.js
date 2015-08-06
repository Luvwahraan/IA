include('tools');
include('leek');
include('weapons');
include('chip');
include('danger');

global i = 0;



// Infos sur l’ennemi.
global target = [];

function targetDistance() {
  target['distance'] = getCellDistance( getCell(), target['cell'] );
  target['nextDistance'] = target['distance'] - target['mp'];
  debug('Distances de la cible : '+target['distance']+', '+target['nextDistance']);
}

function getTarget(newTarget) {
  if (newTarget) {
    target['id'] = getNearestEnemy();
    target['mp'] = getTotalMP( target['id'] );
  }

  target['weapon']    = getWeapon(target['id']);
  target['cell']      = getCell(target['id']);
  target['minScope']  = getWeaponMinScope(target['weapon']);
  target['maxScope']  = getWeaponMaxScope(target['weapon']);
  targetDistance();
}



if ( target['id'] == null || isDead(target['id']) ) {
  getTarget(true);
} else {
  getTarget(false);
}


if ( lastUse[CHIP_HELMET] <= 0 ) {
  useChip_(CHIP_HELMET, myLeek);
}
if ( lastUse[CHIP_WALL] <= 0 ) {
  useChip_(CHIP_WALL, myLeek);
}
if ( lastUse[CHIP_PROTEIN] <= 0 ) {
  useChip_(CHIP_PROTEIN, myLeek);
}

// Si la vie a baissé, on se soigne.
if ( lastUse[CHIP_CURE] <= 0 and getLife() < getTotalLife() - 47 ) {
  useChip_( CHIP_CURE, myLeek );
}
if ( getLife() < getTotalLife() - 12 ) {
  useChip( CHIP_BANDAGE, myLeek );
}


// Si la vie est pleine, on attend qu’on la cible se rapproche.
var distance = 7; // double gun
if ( getLife() == getTotalLife() ) {
  debug('On attendra que la '+getName(target['id'])+' se rapproche.');
  distance = 11 + target['mp']; // spark + mp + 1
}

// On se rapproche de la cible, si on peut attaquer ensuite.
//while ( target['distance'] >=7 and getMP() > 0  ) {
var tp = getTP(),
  dg = getDanger( target['nextDistance'], myLeek );


//if ( ( tp >= 3 and dg > 20 ) or ( tp > 0 ) or ( tp < 3 and dg <= 0 ) ) {
if ( ( dg <= 60 && tp >= 3 ) or ( dg <= 20 ) ) {
  debug('On peut évoquer un déplacement.');
  for (i = 0; i <= getTotalMP(); i++ ) {
    if ( target['distance'] <= distance || getMP() == 0 ) { break; }
    debug('On se rapproche.');
    moveTowardCell( target['cell'], 1 );
    targetDistance();
  }
} else {
  if ( average(myCell) == shift(myCell) ) {
    moveTowardCell( target['cell'], 1 );
  } else {
    debug('TP bof ('+tp+'), et danger présent ('+dg+'%) : on ne se rapproche pas.');
  }
}


// Ou bien on s’en éloigne.
/*if ( target['distance'] < 2 ) {
  while ( target['distance'] >=7 && getMP() > 0 ) {
    moveAwayFrom( target['id'], 1 );
    targetDistance();
  }
}*/

if ( target['distance'] <= 7 ) {
  if ( target['distance'] < 2 and myWeapon != WEAPON_PISTOL ) {
    debug('On équipe le pistolet.');
    setWeapon(WEAPON_PISTOL);
    myWeapon = WEAPON_PISTOL;
  } else if ( target['distance'] >= 2 and myWeapon != WEAPON_DOUBLE_GUN ) {
    debug('On équipe le double canon.');
    setWeapon(WEAPON_PISTOL);
    myWeapon = WEAPON_PISTOL;
  }

  shotLeek( target['id'] );
}
if ( target['distance'] <= 10 ) {
  debug( 'On brûle '+ getName(target['id']) );
  sparkLeek( target['id'] );
}

/*// S’il reste des points, on jette un caillou.
if ( getTP() >= 2 && target['distance'] <= 5 ) {
  debug( 'On caillaisse '+ getName(target['id']) );
  useChip(CHIP_PEBBLE, target['id']);
}*/

// s’il reste des points de mouvement, on fuit.
for (i=0; i <= (getDanger(target['nextDistance'], myLeek) - 15); i++ ) {
  moveAwayFrom( target['id'], 1 );
  if ( getMP() == 0 || getLife() >= getTotalLife() / 2 ) { break; }
  debug('On s’éloigne.' );
}


