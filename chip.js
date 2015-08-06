
global lastUse = [];
if ( getTurn() <= 1 ) {
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

function sparkLeek(leek) {
  var ret = useChip(CHIP_SPARK, leek);
  while ( ret == USE_SUCCESS || ret == USE_FAILED ) {
    ret = useChip(CHIP_SPARK, leek);
  }
  return ret;
}
