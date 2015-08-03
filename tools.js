
global getTurn_; ( getTurn_ === null ) ? getTurn_=1 : getTurn_++;
global getTurn = function() { return getTurn_; };