require('./Prototypes');
const mapClass = require("./Map");
const Map = new mapClass("roomsDef.txt");
const readline = require('readline');
const Playerlist = require('./PlayerList').PlayerList;
const { Player, Enemy } = require('./Characters');
const Objects = require('./Constants').Objects;
const Commands = require('./Constants').Commands;

const CURSOR = [];
let player = {};

const heroSelection = (heroesSelectionList, hero) => {
    for (let i = 0; i < heroesSelectionList.length; i++) {
        if (heroesSelectionList[i].values.includes(hero)) {
            let heroName = heroesSelectionList[i].name;
            let heroObject = Playerlist.find(p => p.name === heroName);
            console.log(`You are a: ${heroName}`);
            return new Player(heroObject,CURSOR);
        };
    };
};

const makeInputCases = name => [ name, name.substring(0,1), name.toLowerCase(), name.substring(0,1).toLowerCase() ];
const makeSelectionObjects = Playerlist => Playerlist.map(h => { return { name: h.name, values: makeInputCases(h.name) } });
function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
};

async function main() {
    let enemy = {};

    const contextListener = (data) => {
        switch (data.context) {
            case "chest":
                break;
            case "enemy":
                enemy = new Enemy(data.enemy, CURSOR);
                console.log(JSON.stringify(enemy, null, 2));
                break;
            case "seller":
                break;
            case "ghost":
                break;
        }
    };

    // console.clear();
    console.log(Map.readMap());
    console.log(Map.getLocation().data.place);
    console.log(JSON.stringify(Map.getLocation().data, null, 2));

    // context listener here...
    contextListener(Map.getLocation().data);

    const ans = await askQuestion("You go: n, s, e, w ? ");
    Map.moveTo(ans);

    main();
}

async function start() {
    let heroesSelectionList = [];
    let hero = false;
    let startAwait = false;
    
    heroesSelectionList = makeSelectionObjects(Playerlist);
    hero = await askQuestion(`Select your hero:${heroesSelectionList.map(h => ` ${h.values[0]} (${h.values[1]})`)}\n ===> `);
    player = heroSelection(heroesSelectionList, hero);
    startAwait = await askQuestion(`Press [Enter] to continue...`);

    main();
}

start();



const Fight = async (player, enemy) => {
    Objects
    const decision = new Decision(enemy, player);
    
    do {
      const playerAction = await askQuestion(`You can: ${Commands.list.join(' ')} ${'\n'} items: ${player.logInventory()}${'\n'} ?`);
      if (Commands.list.includes(playerAction)) {
        player
      }
    } while (!player.lost && !enemy.lost);
  }