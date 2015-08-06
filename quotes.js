function randSay() {
  var quote = [
    "jothon, het fah zul aal hon",
    "Oslarth los norok nuz ol pagaas ol nir sivaas",
    "Vieux motard que jamais.",
    "Rien ne sert de pourrir, il faut rouler bien.",
    "Tu vois, le monde se divise en deux catégories : ceux qui ont un pistolet chargé et ceux qui creusent. Toi, tu creuses.",
    "Quand on tire, on raconte pas sa vie.",
    "Si j'ai l'occasion, j'aimerais mieux mourir de mon vivant.",
    "Pour survivre à la guerre, il faut devenir la guerre.",
    "En ville, tu fais la loi. Ici, c'est moi. Alors fais pas ch..r. Fais pas ch..r ou je te ferai une guerre comme t'en as jamais vue.",
    "Sleekiates ! Préparez-vous pour la gloire !",
    "Les morts ne savent qu'une chose : il vaut mieux être vivant.",
    "Un poireau vivant vaut mieux qu'une salade !"
    'There can be only one.',
    "Dans la vie on ne fait pas ce que l'on veut mais on est responsable de ce que l'on est.",
    'La nature fait les poireaux semblables, la vie les rend différents.',
    "La lama est parfois caché dans l'inconnu.",
    "Rien n'est stupide comme vaincre ; la vraie gloire est convaincre.",
    'Quand je tue des gens, ils sont supposés rester morts.',
    "C'est toujours interdit de pratiquer une autopsie sur quelqu'un de vivant ?",
    "La plupart des gens disent qu’on a besoin d’amour pour vivre. En fait, on a surtout besoin d’oxygène.",
    "C'est curieux chez les marins, ce besoin de faire des phrases.",
    "La cuillère n’existe pas.",
    "Vois en moi l’image d’un humble Vétéran de Vaudeville, distribué Vicieusement dans les rôles de Victime et de Vilain par les Vicissitudes de la Vie.",
    "N’as-tu jamais dansé avec le diable au clair de lune ?",
    "J’ai été interrogé par un employé du recensement. J’ai dégusté son foie avec des fèves au beurre et un excellent chianti.",
    "La seule question à te poser, c’est de savoir si c’est ton jour de chance. Alors, fumier, c’est ton jour de chance aujourd’hui ?",
  ];
  say( quote[ randInt(0, count(quote) - 1) ] );
}
