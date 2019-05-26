const { diceRolls, range } = require('../functions/dice');

class Places {
  constructor(enemiesArray) {
    this.enemiesArray = enemiesArray;
    this.places1 = [
      " in an old foggy village, there's no soul here,",
      " near a forest, the trees seem to move,",
      " on a long road between green hills and a river,",
      " in front of a castle ruin's gate,",
      " the wasteland, everything is dead and dry here,",
      " the swamp, nauseous and poisonous, full of predators,",
    ]
    
    this.places2 = [
      " there are nobody around, only the wind.",
      " it's getting dark and you can see shadows moving..",
      " all is silent, there's not even wind!",
      " you don't feel safe but have to keep going on..",
      " suddenly you feel shivers, a noise, voice or wind?",
      " many noises around you, but can't see anyone...",
    ]

    this.situation = [
      { context: 'chest' },
      { context: 'enemy' },
      { context: 'seller' },
      // { context: 'ghost' },
    ];

    this.seller = [
        " a dwarf, with a bag full of goods",
        " an elf, he holds something in his hand",
        " a troll, he seems to propose an object",
      ];
    
    // this.goods = (function() { return [
    //   { item: "potions", quantity: Math.floor(Math.random() * 2) + 1, price: Math.floor(Math.random() * 15) + 5, description: "Heal 20 HP" },
    //   { item: "scroll", quantity: Math.floor(Math.random() * 2) + 1, price: Math.floor(Math.random() * 15) + 5, description: "40 Dammage to one enemy" },
    //   { item: "doll", quantity: Math.floor(Math.random() * 2), price: Math.floor(Math.random() * 15) + 5, description: "Will revive you with 30 HP" },
    //   { item: "key", quantity: Math.floor(Math.random() * 2 + 1), price: Math.floor(Math.random() * 15) + 5, description: "To open locks, chests" },
    //   { item: "coins", quantity: Math.floor(Math.random() * 5 + 1), price: 0, description: "A handful of silver and copper coins" },
    //   { item: "moonstone", quantity: Math.floor(Math.random() * 2 + 1), price: Math.floor(Math.random() * 15) + 5, description: "Increase your dammage by 5" },
    // ]})()
  }

  RAE(array) {
    return array[Math.floor(Math.random() * (array.length - 1))];
  }

  makeInventory(i) {
    if (i > 98) return "doll";
    else if (i > 96) return "moonstone";
    else if (i > 94) return "scroll";
    else if (i > 92) return "potions";
    else if (i > 90) return "key";
    else return "coins"
  }

  places(stituationDice = 1) {
    const context = this.RAE(this.situation).context;
    const i = range(100);

    const inventory = this.goods().find((e) => { return e.item === this.makeInventory(i) });
    const item = this.RAE(this.goods());


    return { 
      place: `You are${this.RAE(this.places1)}\n${this.RAE(this.places2)}\n`,
      context,
      enemy: this.RAE(this.enemiesArray),
      seller: `There is${this.RAE(this.seller)}`,
      goods: { inventory, item }
    }
  }

  goods() {
    return (function() { return [
      { item: "potions", quantity: Math.floor(Math.random() * 2) + 1, price: Math.floor(Math.random() * 15) + 5, description: "Heal 20 HP" },
      { item: "scroll", quantity: Math.floor(Math.random() * 2) + 1, price: Math.floor(Math.random() * 15) + 5, description: "15 Dammage to one enemy" },
      { item: "doll", quantity: Math.floor(Math.random() * 2), price: Math.floor(Math.random() * 15) + 5, description: "Will revive you with 30 HP" },
      { item: "key", quantity: Math.floor(Math.random() * 2 + 1), price: Math.floor(Math.random() * 15) + 5, description: "To open locks, chests" },
      { item: "coins", quantity: Math.floor(Math.random() * 5 + 1), price: 0, description: "A handful of silver and copper coins" },
      { item: "moonstone", quantity: Math.floor(Math.random() * 2 + 1), price: Math.floor(Math.random() * 15) + 5, description: "Increase your dammage by 5" },
    ]})()
  };
};



// console.clear()
// const a = new Places(require('../characters/Monsters').Monsters)
// console.log(a.places())

module.exports = Places;

// console.log(range(100) > 70)