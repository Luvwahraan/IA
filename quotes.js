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
    "Les morts ne savent qu’une chose : il vaut mieux être vivant.",
  "Un poireau vivant vaut mieux qu’une salade !"
  ];
  say( quote[ randInt(0, count(quote) - 1) ] );
}