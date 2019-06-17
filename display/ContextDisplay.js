const log = console.log.bind(console);

class ContextDisplay {
  constructor(map) {
    this.context = map.getLocation().data.context;
    this.mapPosition = map.readMap();
    this.place = map.getLocation().data.place;
  }

  displayMapPosition() {
      console.log([...[
        '                 ',
        '             Map:',
        '                 ',
      ], ...this.mapPosition.split('\n').map(ln => '          ' + ln)].join('\n'));
  }

  displayPlace() {
    console.log([...[
      'p'
    ],
      ...this.place.split('\n').map(ln => '     ' + ln)].join('\n'));
  }


  Render() {
    try {
      // All display methods
      // console.clear();

      this.displayMapPosition();
      this.displayPlace();

    } catch (e) {
      console.error(e);
    }
  }
}

module.exports.ContextDisplay = ContextDisplay;