
global getTurn_; ( getTurn_ === null ) ? getTurn_=1 : getTurn_++;
global getTurn = function() { return getTurn_; };

/*function xor(A, B) {
  if ( ( A and !B ) or ( !A and B )  ) {
    return true;
  }
  return false;
}*/

global color = [
    getColor(0, 0, 63),     getColor(0, 0, 126),    getColor(0, 0, 189),
    getColor(0, 0, 252),    getColor(0, 63, 0),     getColor(0, 63, 63),
    getColor(0, 63, 126),   getColor(0, 63, 189),   getColor(0, 63, 252),
    getColor(0, 126, 0),    getColor(0, 126, 63),   getColor(0, 126, 126),
    getColor(0, 126, 189),  getColor(0, 126, 252),  getColor(0, 189, 0),
    getColor(0, 189, 63),   getColor(0, 189, 126),  getColor(0, 189, 189),
    getColor(0, 189, 252),  getColor(0, 252, 0),    getColor(0, 252, 63),
    getColor(0, 252, 126),  getColor(0, 252, 189),  getColor(0, 252, 252),
    getColor(63, 0, 0),     getColor(63, 0, 63),    getColor(63, 0, 126),
    getColor(63, 0, 189),   getColor(63, 0, 252),   getColor(63, 63, 0),
    getColor(63, 63, 63),   getColor(63, 63, 126),  getColor(63, 63, 189),
    getColor(63, 63, 252),  getColor(63, 126, 0),   getColor(63, 126, 63),
    getColor(63, 126, 126), getColor(63, 126, 189), getColor(63, 126, 252),
    getColor(63, 189, 0),   getColor(63, 189, 63),  getColor(63, 189, 126),
    getColor(63, 189, 189), getColor(63, 189, 252), getColor(63, 252, 0),
    getColor(63, 252, 63),  getColor(63, 252, 126), getColor(63, 252, 189),
    getColor(63, 252, 252), getColor(126, 0, 0),    getColor(126, 0, 63),
    getColor(126, 0, 126),  getColor(126, 0, 189),  getColor(126, 0, 252),
    getColor(126, 63, 0),   getColor(126, 63, 63),  getColor(126, 63, 126),
    getColor(126, 63, 189), getColor(126, 63, 252), getColor(126, 126, 0),
    getColor(126, 126, 63), getColor(126, 126, 126),getColor(126, 126, 189),
    getColor(126, 126, 252),getColor(126, 189, 0),  getColor(126, 189, 63),
    getColor(126, 189, 126),getColor(126, 189, 189),getColor(126, 189, 252),
    getColor(126, 252, 0),  getColor(126, 252, 63), getColor(126, 252, 126),
    getColor(126, 252, 189),getColor(126, 252, 252),getColor(189, 0, 0),
    getColor(189, 0, 63),   getColor(189, 0, 126),  getColor(189, 0, 189),
    getColor(189, 0, 252),  getColor(189, 63, 0),   getColor(189, 63, 63),
    getColor(189, 63, 126), getColor(189, 63, 189), getColor(189, 63, 252),
    getColor(189, 126, 0),  getColor(189, 126, 63), getColor(189, 126, 126),
    getColor(189, 126, 189),getColor(189, 126, 252),getColor(189, 189, 0),
    getColor(189, 189, 63), getColor(189, 189, 126),getColor(189, 189, 189),
    getColor(189, 189, 252),getColor(189, 252, 0),  getColor(189, 252, 63),
    getColor(189, 252, 126),getColor(189, 252, 189),getColor(189, 252, 252),
    getColor(252, 0, 0),    getColor(252, 0, 63),   getColor(252, 0, 126),
    getColor(252, 0, 189),  getColor(252, 0, 252),  getColor(252, 63, 0),
    getColor(252, 63, 63),  getColor(252, 63, 126), getColor(252, 63, 189),
    getColor(252, 63, 252), getColor(252, 126, 0),  getColor(252, 126, 63),
    getColor(252, 126, 126),getColor(252, 126, 189),getColor(252, 126, 252),
    getColor(252, 189, 0),  getColor(252, 189, 63), getColor(252, 189, 126),
    getColor(252, 189, 189),getColor(252, 189, 252),getColor(252, 252, 0),
    getColor(252, 252, 63), getColor(252, 252, 126),getColor(252, 252, 189),
    getColor(252, 252, 252),
    //COLOR_RED, COLOR_BLUE, COLOR_GREEN
  ];
function colorize(array) {
  mark(array, color[ getTurn() % (count(color)-1) ], 3);
}
