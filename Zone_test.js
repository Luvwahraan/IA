include('move');
include('tools');
include('leek');
include('danger');
include('array');
include('chip');
include('team.heal');


goHeal();
debugE("Operations : " + getOperations());

include('Simple_IA');

debug( "Il reste " + getTP() + "TP et " + getMP() + "MP." );
debugE("Operations : " + getOperations());

include("quotes");
randSay();
