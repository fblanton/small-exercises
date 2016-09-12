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
        if (this.location[y] < -bounds[y]) {
          this.turn('s');
        }
        break;
      case 'ne':
        this.location[x] += speed * .707;
        this.location[y] -= speed * .707;
        if (this.location[y] < -bounds[y]) {
          this.turn('se');
        }
        if (this.location[x] > bounds[x]) {
          this.turn('nw');
        }
        break;
      case 'e':
        this.location[x] += speed;
        if (this.location[x] > bounds[x]) {
          this.turn('w');
        }
        break;
      case 'se':
        this.location[x] += speed * .707;
        this.location[y] += speed * .707;
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
        break;
      case 'w':
        this.location[x] -= speed;
        if (this.location[x] < -bounds[x]) {
          this.turn('e');
        }
        break;
      case 'nw':
        this.location[x] -= speed * .707;
        this.location[y] -= speed * .707;
        break;
    }
  }

  this.turn = function(heading) {
    this.direction = heading;
  }
}

var cars = [
  new Car([0,0], 'e', 3),
  new Car([-100,10], 'ne', 3)
];

function Map(element, width, height, items) {
  this.items = items
  this.element = element;
  this.width = width;
  this.height = height;
  this.items = items;
  this.context = element.getContext('2d');

  this.centerOrigin = function() {
    var moveX = this.element.width/2;
    var moveY = this.element.height/2;
    this.context.translate(moveX, moveY);
  }

  this.show = function(item) {
    this.context.fillStyle = 'red';
    this.context.fillRect(Math.floor(item.location[x]), Math.floor(item.location[y]), 10, 10);
  }

  this.update = function() {
    console.log(this);
    this.context.clearRect(this.width/-2, this.height/-2, this.width, this.height);
    //this.items.forEach(item => { item.go(); this.show(item) });
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].go([this.width/2,this.width/2]);
      this.show(items[i]);
    }
  }

  this.initialize = function() {
    this.element.setAttribute('width', this.width);
    this.element.setAttribute('height', this.height);
    this.centerOrigin();
  }
}

var theMap = new Map(document.getElementById('map'), 700, 700, cars);
theMap.initialize();
setInterval(theMap.update, 5000); //run this command multiple times from console to see cars move
