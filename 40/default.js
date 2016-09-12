var x = 0,
    y = 1;

function Car(location, direction, speed) {
  this.location = location;
  this.direction = direction;
  this.speed = speed;

  this.go = function(bounds) {
    switch (this.direction) {
      case 'n':
        this.location[y] -= speed;
        if (this.location[y] < 0) {
          this.turn('s');
        }
        break;
      case 'ne':
        this.location[x] += speed * .707;
        this.location[y] -= speed * .707;
        if (this.location[y] < 0) {
          this.turn('se');
        }
        if (this.location[x] > bounds[x]) {
          this.turn('nw');
        }
        break;
      case 'e':
        this.location[x] += speed;
        if (this.location[x] > 0) {
          this.turn('w');
        }
        break;
      case 'se':
        this.location[x] += speed * .707;
        this.location[y] += speed * .707;
        if (this.location[y] > bounds[y]) {
          this.turn('ne');
        }
        if (this.location[x] > bounds[x]) {
          this.turn('sw');
        }
        break;
      case 's':
        this.location[y] += speed;
        if (this.location[y] > bounds[y]) {
          this.turn('n');
        }
        break;
      case 'sw':
        this.location[x] -= speed * .707;
        this.location[y] += speed * .707;
        if (this.location[y] > bounds[y]) {
          this.turn('nw');
        }
        if (this.location[x] < 0) {
          this.turn('se');
        }
        break;
      case 'w':
        this.location[x] -= speed;
        if (this.location[x] < 0) {
          this.turn('e');
        }
        break;
      case 'nw':
        this.location[x] -= speed * .707;
        this.location[y] -= speed * .707;
        if (this.location[y] < 0) {
          this.turn('sw');
        }
        if (this.location[x] < 0) {
          this.turn('ne');
        }
        break;
    }
  }

  this.turn = function(heading) {
    this.direction = heading;
  }
}

var cars = [
  new Car([0,0], 'n', 1),
  new Car([100,10], 'ne', 2)
];

function Map(element, width, height, items) {
  this.items = items
  this.element = element;
  this.width = width;
  this.height = height;
  this.items = items;
  this.context = element.getContext('2d');

  this.show = function(item) {
    this.context.fillStyle = 'red';
    this.context.fillRect(Math.floor(item.location[x]), Math.floor(item.location[y]), 10, 10);
  }

  this.update = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].go([this.width,this.height]);
      this.show(items[i]);
    }
  }

  this.initialize = function() {
    this.element.setAttribute('width', this.width);
    this.element.setAttribute('height', this.height);
  }
}

function update() {
  theMap.update();
}

var theMap = new Map(document.getElementById('map'), 700, 700, cars);
theMap.initialize();
setInterval(update, 33); //run this command multiple times from console to see cars move
