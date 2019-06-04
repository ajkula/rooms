class AbstractFighter {
  constructor(objet, messager) {
    this.statsList = ["fullHealth", "strength", "avoid"];
    this.messager = messager;
    this.enemy = {};

    this.name = objet.name;
    this.health = objet.health;
    this.fullHealth = objet.fullHealth || objet.health;
    this.strength = objet.strength;
    this.msg = "";
    this.skill = objet.skill;
    this.lost = false;
    this.avoid = objet.avoid;
    this.dammage = objet.dammage
    this.inventory = {
      potions: objet.potions || 0,
      scroll: objet.scroll || 0,
      doll: objet.doll || 0,
      key: objet.key || 0,
      coins : objet.coins || 0,
      moonstone: objet.moonstone || 0,
    }
  }
  setEnemy(enemy) { this.enemy = enemy; console.log("enemy:", this.enemy) }
  sethealth(value) {
    this.health += value;
    this.health >= 1 ? null : this.lost = true;
    this.msg = this.name + " health: " + (this.health - value) + " ==> " + value + " points!";
    this.messager.runCursor(this.msg);
    this.lost ? this.messager.runCursor(this.name + " is DEAD.") : null;
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
  castSpell() {
    if (this.scroll > 0) {
      this.scroll--;
      this.enemy.sethealth(-Math.floor(Math.random() * 7) - 13);
    }
  }
  logInventory() {
    let res = [];
    for (let item in this.inventory) {
      if (this.inventory[item]) {
        res.push(`${'\n'}${item}: ${this.inventory[item]}`)
      }
    }
    return res.join('');
  }
  setInventory(item, str = null) {
    this[item.item] += item.quantity;
    this.inventory[item.item] += item.quantity;
    str === "buy" ? this.coins -= item.price : null;
  }
  heal() {
    if (this.inventory.potions > 0) {
    this.inventory.potions--;
    this.health += 20;
    if (this.fullHealth < this.health) this.health = this.fullHealth;
    this.msg =  this.name + " healed: " + 20 + " HP => " + this.health + " health and " + this.inventory.potions + " potions remaining!";
    this.messager.runCursor(this.msg);
    }
  }
  useSkill() {
    if (this.skill > 0) {
      this.skill--;
      this.enemy.sethealth(-Math.floor(Math.random() * 5) - 10)
    }
  }

  getEvent() { return this.msg; }
  pushEvent(str) { this.messager.runCursor(str) }

  setStats(statName, adjustment = false) {
    if (this.statsList.includes(statName)) {
      if (adjustment) {
        this.msg = `${statName} gets: ${adjustment}`;
        this.messager.runCursor(this.msg);
        this[statName] += adjustment;
      }
    }
  }
  useInventory(itemName) {
    switch (itemName) {
      case "potion":
        this.heal();
        break;
      case "key":
          // this.openChest(); -- to do
          break;
      case "scroll":
        this.castSpell();
        break;
    }
  }
}

class Enemy extends AbstractFighter {
  constructor(objet, messager) {
    super(objet, messager);
  }

  attack() {
    const that = this;
    this.enemy.sethealth((function() {return -Math.ceil(Math.random() * that.dammage)})());
    const {health, lost} = this.enemy.getState();
    this.msg = lost ? this.name + " won!" : ` ${this.name} hit ${this.enemy.name}: ${health} health remaining!`;
    this.messager.runCursor(this.msg);
  }
}

class Player extends AbstractFighter {
  constructor(objet, messager) {
    super(objet, messager);
  }

  attack() {
    const that = this;
    if (this.name === "Thieve") this.enemy.sethealth((function() {return -Math.ceil(Math.random() * that.dammage + Math.random() * that.dammage)})());
    else this.enemy.sethealth((function() {return -Math.ceil(Math.random() * that.dammage)})());
    const {health, lost} = this.enemy.getState();
    this.msg = lost ? this.name + " won!" : ` ${this.name} hit ${this.enemy.name}: ${health} health remaining!`;
    this.messager.runCursor(this.msg);
  }
}

module.exports = { Enemy, Player };