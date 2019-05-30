class Decision {
  constructor(enemy, target) {
    console.log("constructor enemy:", enemy.name, ' HP: ', enemy.health)
    console.log("constructor target:", target.name, ' HP: ', enemy.health)
    this.enemy = enemy;
    this.target = target;
    console.log("constructor this.enemy:", this.enemy.name, ' HP: ', this.enemy.health)
    console.log("constructor this.target:", this.target.name, ' HP: ', this.enemy.health)
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
  }

  rooting(tree = this.tree) {
console.log("TREE", tree)
    if (tree[0].label === "leaf") {
      console.log("LEAF ACTIONS: ", tree[0].actions); 
      console.log("*******************************");
      return this.enemy[tree[0].actions](this.target); 
    }

    if (tree[0].label  === "root") {
      if (this.between(tree[0].health, this.percent(this.enemy.fullHealth, this.enemy.health))) { this.rooting(tree[0].actions) }
      if (this.between(tree[1].health, this.percent(this.enemy.fullHealth, this.enemy.health))) { this.rooting(tree[1].actions) }
    }

    if (tree[0].label !== "leaf" && tree[0].label  !== "root") {
      console.log("CONDITION:", "(", tree[0].label, ")", this.enemy[tree[0].label], " >= ", tree[0][tree[0].label]);
      if (this.enemy[tree[0].label] >= tree[0][tree[0].label]) { console.log("TREE 0:", tree[0].actions); this.rooting(tree[0].actions) }
      else { console.log("TREE 1:", tree[1].actions); this.rooting(tree[1].actions) }
    }
  }

  percent(base, actual) { return (actual / base * 100) % 1 === 0 ? actual / base * 100 : Math.floor(actual / base * 100); }
  between(array, n) { return array[0] <= n && n <= array[1]; }
}

// ******************************* tests ********************************
const Monster = require('./Characters').Enemy;
const enemy = new Monster({
  name: "SKELETON", 
  health: Math.min(Math.floor(Math.random() * 15 + 10), 15),
  strength: 15,
  potions: Math.floor(Math.random() * 3 + 1),
  avoid: 20,
  dammage: 5,
  skill: 1
});

function percent(base, actual) {
  return (actual / base * 100) % 1 === 0 ?
   actual / base * 100 :
   Math.floor(actual / base * 100);
}
console.log("enemy health", percent(enemy.fullHealth, enemy.health) + '%');

// console.clear()
const a = new Decision(enemy, enemy)
console.log();
a.rooting()
console.log();
a.rooting()
console.log();
a.rooting()
console.log();
a.rooting()
console.log();
a.rooting()
console.log();
a.rooting()

module.exports = Decision;