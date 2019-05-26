require('./Prototypes');
const mapClass = require("./Map");
const Map = new mapClass("roomsDef.txt");
const readline = require('readline');
const Playerlist = require('./PlayerList').PlayerList;
const { Player, Enemy } = require('./Characters');

const heroSelection = (heroesSelectionList, hero) => {
    for (let i = 0; i < heroesSelectionList.length; i++) {
        if (heroesSelectionList[i].values.includes(hero)) {
            let heroName = heroesSelectionList[i].name;
            let heroObject = Playerlist.find(p => p.name === heroName);
            console.log(`You are a: ${heroName}`);
            return new Player(heroObject);
        };
    };
};

const makeInputCases = name => [ name, name.substring(0,1), name.toLowerCase(), name.substring(0,1).toLowerCase() ];
const makeSelectionObjects = Playerlist => Playerlist.map(h => { return { name: h.name, values: makeInputCases(h.name) } });

async function main() {
    let enemy = {};
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

    const contextListener = (data) => {
        switch (data.context) {
            case "chest":
                break;
            case "enemy":
                enemy = new Enemy(data.enemy);
                console.log(JSON.stringify(enemy, null, 2));
                break;
            case "seller":
                break;
            case "ghost":
                break;
        }
    };

    const heroesSelectionList = makeSelectionObjects(Playerlist);
    const hero = await askQuestion(`Select your hero:${heroesSelectionList.map(h => ` ${h.values[0]} (${h.values[1]})`)}\n ===> `);
    const player = heroSelection(heroesSelectionList, hero);
    let startAwait = await askQuestion(`Press [Enter] to continue...`);

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

main();
