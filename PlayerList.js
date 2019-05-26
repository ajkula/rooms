
module.exports.PlayerList = [
  { 
    name: "Thieve", 
    health: Math.min(Math.floor(Math.random() * 45 + 10), 35),
    strength: 15,
    potions: Math.floor(Math.random() * 3 + 1),
    avoid: 50,
    dammage: 3,
    skill: 0
  },
  { 
    name: "Paladin", 
    health: Math.min(Math.floor(Math.random() * 50 + 10), 40),
    strength: 10,
    potions: Math.min(Math.floor(Math.random() * 5 + 1), 2),
    avoid: 20,
    dammage: 6,
    skill: 0
  },
  { 
    name: "Wizzard", 
    health: Math.min(Math.floor(Math.random() * 45 + 10), 35),
    strength: 20,
    potions: Math.min(Math.floor(Math.random() * 5 + 1), 2),
    avoid: 30,
    dammage: 8,
    skill: 0
  },
  { 
    name: "Barbarian", 
    health: Math.min(Math.floor(Math.random() * 70 + 20), 50),
    strength: 30,
    potions: Math.min(Math.floor(Math.random() * 5 + 1), 2),
    avoid: 10,
    dammage: 10,
    skill: 0
  }
];