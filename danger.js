
global myCell = [];
global myLife = [];

push( myCell, getCell() );
push( myLife, getLife() );

if ( count(myLife) > 3 ) {
  shift(myLife);
}


function getDanger(nextDistance, leek) {
  if ( isDead(leek) || leek === null ) { return 0; }
  var danger = 0;
  if ( nextDistance <= 10 ) {
    danger++;
  }
  if ( nextDistance <= 7 ) {
    danger++;
  }
  if ( nextDistance <= 7 ) {
    danger++;
  }

  // Si notre vie varie peu, on baisse le danger.
  var coef = 0.2;
  if ( average(myLife) >= 85 * getTotalLife() / 100  ) {
    coef = 2;
  }

  var life = getTotalLife(leek) / ( getLife(leek) + 1 );
  //debug('Danger de '+danger+'%, vie '+life);
  return danger + life - getTurn() * coef ;
}
