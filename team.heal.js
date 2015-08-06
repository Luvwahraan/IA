include('array');
include('leek');
include('move');
include('danger');
include('chip');

/* Définie l’ordre dans lequel les alliés devront être soignés.
 * @return  allies_tabId
 */
function manageBonus() {
  /* On pondère en pourcentage selon la vie, la distance, et le danger
  que court le poireau. */
  var leek_assoc = [], life, bonusCoef,
      distance, danger, cell, leek;

  for (leek in allies) {
    // On ne s’occupe pas des bulbes ou des morts.
    if ( isSummon(leek) ) {
      removeElement(allies, leek);
      continue;
    } else if ( isDead(leek) ) {
      push( deadAllies, leek );
      removeElement(allies, leek);
    }
    //debug('On pondère ' + getName(leek) +']['+leek+']');

    cell = getCell(leek);
    life = getTotalLife(leek) / getLife(leek);
    distance = getCellDistance( getCell(myLeek), cell );
    danger = getDanger( getCellDistance( cell, getNearestEnemyTo(leek) ), leek );

    //debug( 'Life :['+getTotalLife(leek)+']['+getLife(leek)+']['+life+']' );

    // On change les coefs pour son propre poireau, histoire de ne pas
    // passer son temps à se soigner.
    if ( leek == myLeek ) {
      bonusCoef = life * 50 / 100 + life * 50 / 100;
    } else {
      bonusCoef = life      * 75 / 100
                + distance  * 15 / 100
                + danger    * 10 / 100;
    }

    //debug(bonusCoef+'%');
    leek_assoc[leek] = bonusCoef;
  }

  assocSort(leek_assoc, SORT_DESC);
  return getAssocKeys(leek_assoc);
}

/* Se déplace pour aller soigner ou distribuer des bonus, selon l’ordre définie
 * par manageBonus().
 */
function goHeal() {
  var alliesToHeal = manageBonus(),
    keepTP = 0, ret, life, tlife,
    ally = shift(alliesToHeal),
    destCell = getCell(ally),
    allyCell = destCell,
    path = getPath( getCell(), destCell ),
    myTP = getTP(),
    myMP = getMP(),
    distance = getCellDistance( getCell(), allyCell );

  // On va soigner les alliés qui en ont besoin.
  while (ally != null ) {
    // Si guérison est lançable sur l’allié, on se garde des TP pour le faire.
    if ( lastUse[CHIP_CURE] < 1 && myTP >= 4 && distance + myMP <= 5 ) {
      keepTP = 4;
    }

    // Si on ne peut pas lancer guérison, et qu’on pourra lancer bandage, pareil
    if ( ( myTP >= 2 && distance + myMP <= 6 ) or lastUse[CHIP_CURE] > 0 ) {
      keepTP = 2;
    }

    // On boucle tant qu’on a des MP ou qu’il reste du chemin à faire.
    while ( getMP() && count(path) ) {
      //var life = getLife(ally) * 100 / getTotalLife(ally);
      life = getLife(ally);
      tlife = getTotalLife(ally);

      // La cible est guérissable ?
      if ( lastUse[CHIP_CURE] < 1 && distance <= 5 && life < tlife - 47 ) {
        ret = useChip_(CHIP_CURE, ally);
      } else if ( distance <= 4 && life < tlife - 12 ) {
        ret = useChip_(CHIP_BANDAGE, ally);
        if ( ret == USE_SUCCESS || ret == USE_FAILED ) {
          myTP = getTP();
        } else {
            debug( 'On bande '+getName(ally) );
            debug( getName(ally)+' bandage : '+ret );
        }
      } else {
        ret = null;
      }

      if ( ret == USE_SUCCESS || ret == USE_FAILED ) {
        debug( 'On soigne et bande '+getName(ally) );
        myTP = getTP();
      } else if ( ret != null ) {
          debug( 'Soin de '+getName(ally)+' écouché : '+ret );
      }


      // On regarde s’il y a quelque chose à faire sur un allié, dans le coin.
      for (var subAlly in alliesToHeal ) {
        var subAllyCell = getCell(subAlly),
          subAllyDistance = getCellDistance( getCell(), subAllyCell );
        life = getLife(ally);
        tlife = getTotalLife(ally);

        debug( 'On teste '+getName(subAlly)+' distance['+subAllyDistance+']' );

        // Du soin ?
        if (  lastUse[CHIP_CURE] <= 0 && myTP >= 4 + keepTP &&
              subAllyDistance <= 4 &&  life < tlife - 47 ) {
          ret = useChip(CHIP_CURE, subAlly);
          if ( ret == USE_SUCCESS || ret == USE_FAILED ) {
            myTP = getTP();
            debug( 'On soigne '+getName(subAlly) );
            removeElement(alliesToHeal, subAlly);
          } else {
            debug( getName(subAlly)+' soin : '+ret );
          }
        } else if ( myTP >= 2 + keepTP &&  life < tlife - 12 && subAllyDistance <= 5) {
          ret = useChip(CHIP_BANDAGE, subAlly);
          if ( ret == USE_SUCCESS || ret == USE_FAILED ) {
            myTP = getTP();
            debug( 'On bande '+getName(subAlly) );
            removeElement(alliesToHeal, subAlly);
          } else {
            debug( getName(subAlly)+' bandage : '+ret );
          }
        }

        // De la protection ?
        if ( lastUse[CHIP_HELMET] <= 0 && myTP >= keepTP + 3 && subAllyDistance <= 4 ) {
          ret = useChip_(CHIP_HELMET, subAlly);
          if ( ret == USE_SUCCESS || ret == USE_FAILED ) {
            myTP = getTP();
            debug( 'On casque '+getName(subAlly) );
          }
        }
        if ( lastUse[CHIP_SHIELD] <= 0 && myTP >= keepTP + 4 && subAllyDistance <= 4 ) {
          ret = useChip_(CHIP_SHIELD, subAlly);
          if ( ret == USE_SUCCESS || ret == USE_FAILED ) {
            myTP = getTP();
            debug( 'On bouclier '+getName(subAlly) );
          } else {
            debug( getName(subAlly)+' bouclier : '+ret );
          }
        }
        if ( lastUse[CHIP_WALL] <= 0 && myTP >= keepTP + 3 && subAllyDistance <= 3 ) {
          ret = useChip_(CHIP_WALL, subAlly);
          if ( ret == USE_SUCCESS || ret == USE_FAILED ) {
            myTP = getTP();
            debug( 'On mur '+getName(subAlly) );
          } else {
            debug( getName(subAlly)+' mur : '+ret );
          }
        }
        if ( lastUse[CHIP_PROTEIN] <= 0 && myTP >= keepTP + 3 && subAllyDistance <= 4 ) {
          ret = useChip_(CHIP_PROTEIN, subAlly);
          if ( ret == USE_SUCCESS || ret == USE_FAILED ) {
            myTP = getTP();
            debug( 'On booste '+getName(subAlly) );
          } else {
            debug( getName(subAlly)+' booste : '+ret );
          }
        }

        //debug('Fin de '+getName(subAlly)+'. Il reste TP:'+getTP()+' Opé:'+getOperations() );
      }
      //debug('Fin de '+getName(ally));

      distance = getCellDistance( getCell(), allyCell );
      moveTowardCell( shift(path), 1 );
    }

    if ( myMP < 1 ) {
      // On ne peut plus se déplacer, on arrête là. (:
      return;
    }

    ally = shift(alliesToHeal);
    if ( ally != null ) {
      destCell = getCell(ally);
      allyCell = destCell;
      path = getPath( getCell(), destCell );
      myTP = getTP();
      myMP = getMP();
      distance = getCellDistance( getCell(), allyCell );
    }
  }
}
