class AbstractFighter {
  constructor(objet, messager = []) {
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
  setEnemy(enemy) { this.enemy = enemy; }
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
    for (item in this.inventory) {
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
    if (this.potions > 0) {
    this.potions--;
    this.health += 20;
    if (this.fullHealth < this.health) this.health = this.fullHealth;
    this.msg =  this.name + " healed: " + 20 + " HP => " + this.health + " health and " + this.potions + " potions remaining!";
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
          // this.heal();
          break;
      case "scroll":
        this.castSpell();
        break;
    }
  }
}

class Enemy extends AbstractFighter {
  constructor(objet) {
    super(objet);
  }

  attack() {
    const that = this;
    this.enemy.sethealth((function() {return -Math.ceil(Math.random() * that.dammage)})());
    const {health, lost} = this.enemy.getState();
    this.msg = lost ? this.name + " won!" : "hit: " + health + " health remaining!";
    this.messager.runCursor(this.msg);
  }
}

class Player extends AbstractFighter {
  constructor(objet) {
    super(objet);
  }

  attack() {
    const that = this;
    if (this.name === "Thieve") this.enemy.sethealth((function() {return -Math.ceil(Math.random() * that.dammage + Math.random() * that.dammage)})());
    else this.enemy.sethealth((function() {return -Math.ceil(Math.random() * that.dammage)})());
    const {health, lost} = this.enemy.getState();
    this.msg = lost ? this.name + " won!" : "hit: " + health + " health remaining!";
    this.messager.runCursor(this.msg);
  }
}

module.exports = { Enemy, Player };