const use = "use";
const attack = "attack";
const skill = "skill";

const key = "key";
const potion = "potion";
const scroll = "scroll";

module.exports.use = use;
module.exports.attack = attack;
module.exports.skill = skill;

module.exports.key = key;
module.exports.potion = potion;
module.exports.scroll = scroll;

module.exports.Objects = [key, potion, scroll];
module.exports.Commands = {
  list: [use, attack, skill],
  get: {use, attack, skill},
  methods: {use: 'useInventory', attack, skill: 'useSkill'},
};