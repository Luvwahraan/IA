
function randSay() {
  var quote = [
    "jothon, het fah zul aal hon",
    "Oslarth los norok nuz ol pagaas ol nir sivaas",
    "Vieux motard que jamais.",
    "Rien ne sert de pourrir, il faut rouler bien.",
    "Tu vois, le monde se divise en deux catégories : ceux qui ont un pistolet chargé et ceux qui creusent. Toi, tu creuses.",
    "Quand on tire, on raconte pas sa vie.",
    "Si j’ai l’occasion, j’aimerais mieux mourir de mon vivant.",
    "Pour survivre à la guerre, il faut devenir la guerre.",
    "En ville, tu fais la loi. Ici, c’est moi. Alors fais pas ch..r. Fais pas ch..r ou je te ferai une guerre comme t’en as jamais vue.",
    "Sleekiates ! Préparez-vous pour la gloire !",
    "Les morts ne savent qu’une chose : il vaut mieux être vivant."
  ];

  say( quote[ randInt(0, count(quote) - 1) ] );
}


/***************************************************************/

function pistolLeek(leek) {
  var cost = 3;
  while ( getTP() >= cost and getLife(leek) > 0 ) {
    useWeapon(leek);
  }
}

function doubleGunLeek(leek) {
  var cost = 4;
  while ( getTP() >= cost and getLife(leek) > 0 ) {
    useWeapon(leek);
  }
}

function shotLeek(leek) {
  var cost = getWeaponCost(getWeapon());
  while ( getTP() >= cost and getLife(leek) > 0 ) {
    useWeapon(leek);
  }
}

function sparkLeek(leek) {
  var cost = 3;
  while ( getTP() >= cost  and getLife(leek) > 0) {
    useChip(CHIP_SPARK, leek);
  }
}

function healLeek(leek) {
  var cost = 2;
  while ( getTP() >= cost or getLife(leek) < 100 ) {
    useChip(CHIP_BANDAGE, leek);
  }
}

function pebbleLeek(leek) {
  var cost = 2;
  while ( getTP() >= cost  and getLife(leek) > 0) {
    useChip(CHIP_PEBBLE, leek);
  }
}

/***********************************************************/

global myLeek = getLeek();
var pistolMaxScope = 7;
var sparkMaxScope = 10;

// Infos sur l’ennemi.
var enemy = getNearestEnemy();
var enemyCell = getCell(enemy);
var enemyWeapon = getWeapon(enemy);
var enemyWeaponMinScope = getWeaponMinScope(enemyWeapon);
var cellDistance = getCellDistance(getCell(), enemyCell);

// On équipe s’il le faut, et on change si l’ennemie est trop près.
var myWeapon = getWeapon();
if ( myWeapon == null ) {
  setWeapon(WEAPON_DOUBLE_GUN);
  myWeapon = WEAPON_DOUBLE_GUN;
} else if ( cellDistance < 2 and myWeapon != WEAPON_PISTOL ) {
  setWeapon(WEAPON_PISTOL);
  myWeapon = WEAPON_PISTOL;
} else if ( cellDistance >= 2 and myWeapon != WEAPON_DOUBLE_GUN ) {
  setWeapon(WEAPON_PISTOL);
  myWeapon = WEAPON_PISTOL;
}

while ( getTP() > 0 and getMP() > 0 ) {
  //debug("New loop");
  //debug("Cellule ennemi : " + enemyCell);

  // On bouge en fonction de l’équipement de ennemi.
  /*if ( enemyWeaponMinScope > 1 ) {
    moveToward(enemy);
  } else*/ if ( cellDistance > sparkMaxScope ) {
    //debug("Enemy far away. Moving.");
    moveToward(enemy, 1);
    cellDistance = getCellDistance(getCell(), enemyCell);
  }

  // Selon la distance, on choisie son attaque.
  if ( cellDistance <= 7 ) {
    shotLeek(enemy);
  } else if ( cellDistance <= 10 ) {
    sparkLeek(enemy);
  }

  if ( isDead(enemy) ) {
    //debug("Enemy dead. Next one.");
    // On met à jour les donnée de l’ennemi.
    enemy = getNearestEnemy();
    if ( enemy == null ) { break; }

    enemyCell = getCell(enemy);
    enemyWeapon = getWeapon(enemy);
    enemyWeaponMinScope = getWeaponMinScope(enemyWeapon);
    cellDistance = getCellDistance(getCell(), enemyCell);
  } else if ( cellDistance <= 10 and enemyWeaponMinScope < 2 ) {
    //debug("Ennemi too close.");
    moveAwayFrom(enemy);
  }

  if ( getTP() > 0 ) {
    if ( getLife() < 91 ) {
      healLeek( myLeek );
    }

    if ( cellDistance <= 5 ) {
      pebbleLeek( enemy );
    } else {
      break;
    }
  }
}

debugE("Operations : " + getOperations());
randSay();
