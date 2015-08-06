include('array');

global myWeapons; // Géré plus loin.
global myWeapon;

/* Donne toutes les infos d’une arme par son id.
 * @param   weaponId_int
 * @return  weaponInfo_hash
 */
function getWeaponInfo(weapon) {
  var info = [];
            //   [type, min, max, turns, targets]
  info['effects']   = getWeaponEffects(weapon);
  info['area']      = getWeaponArea(weapon);
  info['cost']      = getWeaponCost(weapon);
  info['minScope']  = getWeaponMinScope(weapon);
  info['maxScope']  = getWeaponMaxScope(weapon);
  info['failure']   = getWeaponFailure(weapon);
  info['name']      = getWeaponName(weapon);

  return info;
}

/* Classe la liste par ratio dégats/coût.
 * @param   weaponId_tab
 * @return  weapon_hash by damage ratio
 */
function sortByDamages(weapon_list) {
  var validWeapon_list = [], ratio_hash = [];
  for ( var weapon in weapon_list ) {
    // On récupère la moyenne des effets dégats.
    var damage = 0;
    for ( var info in myWeapons[weapon]['effects'] ) {
      if ( info[0] === EFFECT_DAMAGE ) {
        damage = damage + ( (info[1]+info[2])/2 );
      }
    }
    ratio_hash[damage] = weapon;
  }
  keySort(ratio_hash, SORT_DESC );
  return getAssocValues(ratio_hash);
}

/* Classe la liste par max scope
 * @param   weaponId_tab
 * @return  weapon_hash by scope
 */
function sortByMaxScope(weapon_list) {
  var scope_hash = [];
  for ( var weapon in weapon_list ) {
    scope_hash[myWeapons[weapon]['maxScope']] = weapon;
  }
  return getAssocValues(scope_hash);
}

/* Classe la liste par min scope
 * @param   weaponId_tab
 * @return  weapon_hash by scope
 */
function sortByMinScope(weapon_list) {
  var scope_hash = [];
  for ( var weapon in weapon_list ) {
    scope_hash[myWeapons[weapon]['minScope']] = weapon;
  }
  return getAssocValues(scope_hash);
}

// Renvoie la liste des armes utilisable à une distance donnée.
function checkScope(weapon_list, distance) {
  var validWeapon_list = [];
  for ( var weapon in weapon_list ) {
    if ( myWeapons[weapon]['minScope'] <= distance and
        distance <= myWeapons[weapon]['maxScope'] ) {
      push(validWeapon_list, weapon);
    }
  }
  return validWeapon_list;
}



function chooseWeapon( enemy_assoc ) {
}


/* Au premier tour, on récupère les infos de toutes nos armes.
 *   Ce sera toujours ça de fait. */
if ( myWeapons === null ) {
  myWeapons = [];
  for ( var weapon in getWeapons() ) {
    myWeapons[weapon] = getWeaponInfo(weapon);
  }

  // Premier tour : on équipe le flingue qui tire le plus loin
  if (getWeapon() === null ) {
    setWeapon( shift(sortByMaxScope( getAssocKeys(myWeapons) )) );
    myWeapon = getWeapon();
  }
}

/* Utilise l’arme courante.
 * @param   leek_id
 * @return  useWeapon return
 */
function shotLeek(leek) {
  var ret = useWeapon(leek);
  while ( ret == USE_SUCCESS || ret == USE_FAILED ) {
    ret = useWeapon(leek);
  }
  return ret;
}

