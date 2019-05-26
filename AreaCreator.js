require('./Prototypes');
const { diceRolls, range } = require('./functions/dice');

class AreaCreator {
  constructor(caseName) {
    this.caseName = caseName;

    this.enemiesArray = [
      () => { return {
        name: "SKELETON", 
        health: Math.min(Math.floor(Math.random() * 15 + 10), 15),
        strength: 15,
        potions: Math.floor(Math.random() * 3 + 1),
        avoid: 20,
        dammage: 5,
        skill: 0
      }},
      () => { return {
        name: "GOBLIN", 
        health: Math.min(Math.floor(Math.random() * 20 + 10), 20),
        strength: 10,
        potions: Math.min(Math.floor(Math.random() * 5 + 1), 2),
        avoid: 30,
        dammage: 4,
        skill: 0
      }},
      () => { return {
        name: "SORCERER", 
        health: Math.min(Math.floor(Math.random() * 30 + 10), 30),
        strength: 20,
        potions: Math.min(Math.floor(Math.random() * 5 + 1), 2),
        avoid: 20,
        dammage: 6,
        skill: 0
      }},
      () => { return {
        name: "ORC", 
        health: Math.min(Math.floor(Math.random() * 50 + 20), 50),
        strength: 30,
        potions: Math.min(Math.floor(Math.random() * 5 + 1), 2),
        avoid: 10,
        dammage: 8,
        skill: 0
      }}
    ];

    this.placesRootObject = {
      v: " in an old foggy village, there's no soul here,",
      f: " the forest, there trees seem to move,",
      l: " on a long road between green hills and a river,",
      c: " in front of a castle ruin's gate,",
      d: " the wasteland, everything is dead and dry here,",
      s: " the swamp, nauseous and poisonous, full of predators,",
    };
    
    this.ambianceArray = [
      " there are nobody around, only the wind.",
      " it's getting dark and you can see shadows moving..",
      " all is silent, there's not even wind!",
      " you don't feel safe but have to keep going on..",
      " suddenly you feel shivers, a noise, voice or wind?",
      " many noises around you, but can't see anyone...",
    ];

    this.situation = [
      { context: 'chest' },
      { context: 'enemy' },
      { context: 'seller' },
      // { context: 'ghost' },
    ];

    this.sellers = [
      " a dwarf, with a bag full of goods",
      " an elf, he holds something in his hand",
      " a troll, he seems to propose an object",
    ];
  };

  RAE(array, bool = false) {
    let len = array.length;
    let index = Math.floor(Math.random() * len);
    let result = array[index];
bool ? console.log('\n' + len, index, result) : null;
    return result;
  };

  makeNPCInventoryFromRange(i) {
    if (i > 98) return "doll";
    else if (i > 96) return "moonstone";
    else if (i > 94) return "scroll";
    else if (i > 92) return "potions";
    else if (i > 90) return "key";
    else return "coins"
  };

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

  contextMapper(ctx, item) {
    let mapping = {
      chest: item,
      enemy: this.RAE(this.enemiesArray)(),
      seller: { description: `There is${this.RAE(this.sellers)}` },
    };
    return Object.assign(mapping[ctx], {context: ctx});
  }
  
  getArea() {
    const context = this.RAE(this.situation).context;
    const inventory = this.goods().find((e) => { return e.item === this.makeNPCInventoryFromRange(range(100)) });
    const item = Object.assign(this.RAE(this.goods()), {context});
    
    return { 
      place: `You are${this.placesRootObject[this.caseName]}\n${this.RAE(this.ambianceArray)}\n`,
      [context]: this.contextMapper(context, item),
      context,
      goods: { inventory, item }
    }
  }
};

module.exports = AreaCreator;