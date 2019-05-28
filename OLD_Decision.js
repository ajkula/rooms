class Decision {
  constructor(enemy, target) {
    console.log("constructor enemy:", enemy)
    console.log("constructor target:", target)
    this.enemy = enemy;
    this.target = target;
    console.log("constructor this.enemy:", this.enemy)
    console.log("constructor this.target:", this.target)
    // this.fullHealth = enemy.fullHealth;
    // this.health = enemy.health;
    // this.strength = enemy.strength;
    // this.lost = enemy.lost;
    // this.potions = enemy.potions;
    this.tree = [
      {
        label: "root",
        health: [50, 100],
        actions: [
          {
            label: "leaf",
            actions: "attack"
          }
        ]
      },
      {
        label: "root",
        health: [0, 49],
        actions: [
          {
            label: "potions",
            potions: 1,
            actions: [
              {
                label: "leaf",
                actions: "heal"
              }
            ]
          },
          {
            label: "potions",
            potions: 0,
            actions: [
              {
                label: "spell",
                spell: 1,
                actions: [
                  {
                    label: "leaf",
                    actions: "useSkill"
                  }
                ]
              },
              {
                label: "spell",
                spell: 0,
                actions: [
                  {
                    label: "leaf",
                    actions: "attack"
                  }
                ]
              }
            ]
          }
        ]
      }
    ];
  }

  rooting(tree) {
    // if (tree[0].label === "leaf") { return enemy[tree.actions]() }
    // console.log("tree", tree)
    if (tree[0].label === "leaf") { 
      console.log("*******************************"); 
      console.log("actions: ", tree[0].actions); 
      return this.enemy[tree[0].actions](this.target); 
    }

    if (tree[0].label  === "root") {
      if (this.between(tree[0].health, this.percent(this.enemy.fullHealth, this.enemy.health))) { this.rooting(tree[0].actions) }
      if (this.between(tree[1].health, this.percent(this.enemy.fullHealth, this.enemy.health))) { this.rooting(tree[1].actions) }
    }
    if (tree[0].label !== "leaf" && tree[0].label  !== "root") {
      if (this.enemy[tree[0].label] >= tree[0][tree[0].label]) { this.rooting(tree[0].actions) }
      else { this.rooting(tree[1].actions) }
    }
  }

  percent(base, actual) { 
    return (actual / base * 100) % 1 === 0 ? actual / base * 100 : Math.floor(actual / base * 100);
  }

  between(array, n) {
    return array[0] <= n && n <= array[1];
  }
}

// ******************************* tests ********************************


const tree = [
  {
    label: "root",
    health: [50, 100],
    actions: [
      {
        label: "leaf",
        actions: "attack"
      }
    ]
  },
  {
    label: "root",
    health: [0, 49],
    actions: [
      {
        label: "potions",
        potions: 1,
        actions: [
          {
            label: "leaf",
            actions: "heal"
          }
        ]
      },
      {
        label: "potions",
        potions: 0,
        actions: [
          {
            label: "skill",
            skill: 1,
            actions: [
              {
                label: "leaf",
                actions: "useSkill"
              }
            ]
          },
          {
            label: "skill",
            skill: 0,
            actions: [
              {
                label: "leaf",
                actions: "attack"
              }
            ]
          }
        ]
      }
    ]
  }
];

function between(array, n) {
  return array[0] <= n && n <= array[1];
}

const Monster = require('./Characters').Enemy

const enemy = new Monster({ 
  name: "SKELETON", 
  fullHealth: 40,
  health: 10,
  strength: 15,
  potions: 0,
  avoid: 20,
  spell: 1,
  dammage: 5,
  skill: 1,
});

console.log(percent(enemy.fullHealth, enemy.health) + '%');

function percent(base, actual) { 
  console.log(actual, base, enemy.fullHealth, enemy.health)
  return (actual / base * 100) % 1 === 0 ? actual / base * 100 : Math.floor(actual / base * 100);
}

function rooting(enemy, tree) {
  // if (tree[0].label === "leaf") { return enemy[tree.actions]() }
  console.log()
  console.log("tree", tree)
  if (tree[0].label === "leaf") { console.log(tree[0].actions); return 0 }
  if (tree[0].label  === "root") {
    if (between(tree[0].health, percent(enemy.fullHealth, enemy.health))) { rooting(enemy, tree[0].actions) }
    if (between(tree[1].health, percent(enemy.fullHealth, enemy.health))) { rooting(enemy, tree[1].actions) }
  }
  if (tree[0].label !== "leaf" && tree[0].label  !== "root") {
    if (enemy[tree[0].label] >= tree[0][tree[0].label]) { rooting(enemy, tree[0].actions) }
    else { rooting(enemy, tree[1].actions) }
  }
}

// console.clear()
const a = new Decision(enemy, enemy)
a.rooting(a.tree)
console.log(percent(3600, 120) + '%');
console.log(percent(enemy.fullHealth, enemy.health) + '%');
rooting(enemy, tree)

module.exports = Decision;