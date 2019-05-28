class AbstractFighter {
  constructor(objet) {
    this.name = objet.name;
    this.health = objet.health;
    this.fullHealth = objet.fullHealth || objet.health;
    this.strength = objet.strength;
    this.msg = "";
    this.skill = objet.skill;
    this.lost = false;
    this.avoid = objet.avoid;
    this.potions = objet.potions;
    this.scroll = objet.scroll || null;
    this.doll = objet.doll || null;
    this.key = objet.key || null;
    this.coins = objet.coins || null;
    this.dammage = objet.dammage
    this.moonstone = objet.moonstone || null;
    this.inventory = {
      potions: this.potions,
      scroll: Number(this.scroll),
      doll: Number(this.doll),
      key: Number(this.key),
      coins : Number(this.coins), 
      moonstone: Number(this.moonstone)
    }
  }
  sethealth(value) { 
    console.log("before: health ", this.health, " dammage " + value)
    this.health += value;
    this.health >= 1 ? null : this.lost = true;
    console.log("after ", this.health, value)
  }
  getState() {
    return { name: this.name, health: this.health, lost: this.lost, strength: this.strength, potions: this.potions, inventory: this.inventory } 
  }
  getInventory() {
    this.inventory.coins = this.coins;
    this.inventory.doll = this.doll;
    this.inventory.key = this.key;
    this.inventory.moonstone = this.moonstone;
    this.inventory.potions = this.potions;
    this.inventory.scroll = this.scroll;
    return { inventory: this.inventory };
  }
  setInventory(item, str) {
    this[item.item] += item.quantity;
    this.inventory[item.item] += item.quantity;
    str === "buy" ? this.coins -= item.price : null;
  }
  heal() {
    if (this.potions > 0) {
    this.potions--;
    this.health += 20;
    if (this.fullHealth < this.health) this.health = this.fullHealth;
    }
  }
  useSkill(enemy) {
    if (this.scroll > 0) {
      this.scroll--;
      enemy.sethealth(-15)
    }
  }
}

class Enemy extends AbstractFighter {
  constructor(objet) {
    super(objet);
  }

  attack(enemy) {
    const that = this;
    enemy.sethealth((function() {return -Math.ceil(Math.random() * that.dammage)})());
    const {health, lost} = enemy.getState();
    this.msg = lost ? this.name + " won!" : "hit: " + health + " health remaining!"
  } 
}

class Player extends AbstractFighter {
  constructor(objet) {
    super(objet);
  }

  attack(enemy) {
    const that = this;
    if (this.name === "Thieve") enemy.sethealth((function() {return -Math.ceil(Math.random() * that.dammage + Math.random() * that.dammage)})());
    else enemy.sethealth((function() {return -Math.ceil(Math.random() * that.dammage)})());
    const {health, lost} = enemy.getState();
    this.msg = lost ? this.name + " won!" : "hit: " + health + " health remaining!"
  } 
}

module.exports = { Enemy, Player };