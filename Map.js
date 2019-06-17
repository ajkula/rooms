require('./Prototypes');
const fs = require('fs');
const AreaCreator = require("./AreaCreator");

module.exports = class Map {
    constructor(filename) {
        const allInString = fs.readFileSync(__dirname + `\\${filename}`)
        .toString();
        const chariotReturn = allInString.getEOL();

        this.mapGrid = allInString.split(chariotReturn)
        .map(ln => ln.split(""));

        console.log(this.mapGrid.map(l => l.join(' ')));

        this.maxY = this.mapGrid.length - 1
        this.maxX = this.mapGrid[0].length - 1
        this.startPosition = {
            x: Math.ceil(this.maxX / 2),
            y: this.maxY,
        };
        this.location = this.startPosition;
        this.mapping = {
            f: "forest",
            d: "desert",
            l: "plains",
            c: "castle",
        };
        
        // this.mappingDataToArea = {
        //     f: new AreaCreator("f").getArea(),
        //     d: new AreaCreator("d").getArea(),
        //     l: new AreaCreator("l").getArea(),
        //     c: new AreaCreator("c").getArea(),
        // };

        this.completeMapData = this.mapGrid.forEachCell(item => new AreaCreator(item).getArea())
        // console.log("completeMapData:", this.completeMapData)
        console.log(`Start: ${this.mapping[this.mapGrid[this.location.y][this.location.x]]}`);
    }

    getLocation() {
        return {
            bloc:     this.mapGrid[this.location.y][this.location.x],
            position: { y: this.location.y, x: this.location.x },
            location: this.mapping[this.mapGrid[this.location.y][this.location.x]],
            data: this.completeMapData[this.location.y][this.location.x],
        };
    }

    readMap() {
        let mapRender = Array.from(this.mapGrid.map(e => e.map(i => i)));
        mapRender[this.location.y][this.location.x] = '.';
        return mapRender.map(ln => ln.join(' ')).join('\n');
    }

    moveTo(str) {
        switch(str) {
            case "n":
                this.location.y > 0 ? --this.location.y : null;
                break;
            case "s":
                this.location.y < this.maxY ? ++this.location.y : null;
                break;
            case "w":
                this.location.x > 0 ? --this.location.x : null;
                break;
            case "e":
                this.location.x < this.maxX ? ++this.location.x : null;
                break;
            default:
                console.log("Can't go " + str)
                break;
        }
    }
}