var x = 0,
    y = 1;

function Car(location, direction, speed) {
  this.location = location;
  this.direction = direction;
  this.speed = speed;

  this.go = function() {
    switch (this.direction) {
      case 'n':
        this.location[y] += speed;
        break;
      case 'ne':
        this.location[x] += speed * .707;
        this.location[y] += speed * .707;
        break;
      case 'e':
        this.location[x] += speed;
        break;
      case 'se':
        this.location[x] += speed * .707;
        this.location[y] -= speed * .707;
        break;
      case 's':
        this.location[y] -= speed;
        break;
      case 'sw':
        this.location[x] -= speed * .707;
        this.location[y] -= speed * .707;
        break;
      case 'w':
        this.location[x] -= speed;
        break;
      case 'nw':
        this.location[x] -= speed * .707;
        this.location[y] += speed * .707;
        break;
    }
  }

  this.turn = function(heading) {
    this.direction = heading;
  }
}

var cars = [
  new Car([0,0], 'n', 3),
  new Car([10,10], 'se', 3)
];

function Map(element, width, height, items) {
  this.items = items
  this.element = element;
  this.width = width;
  this.height = height;
  this.items = items;
  this.context = element.getContext('2d');

  this.centerOrigin = function() {
    var moveX = this.element.width *.5;
    var moveY = this.element.height *.5;
    this.context.translate(moveX, moveY);
  }

  this.show = function(item) {
    this.context.fillStyle = 'red';
    this.context.fillRect(item.location[x], item.location[y], 10, 10);
  }

  this.update = function() {
    this.context.clearRect(0 - this.width * .5, 0 - this.height * .5, this.width, this.height);
    this.items.forEach(item => { item.go(); this.show(item) });
  }

  this.initialize = function() {
    this.element.setAttribute('width', this.width);
    this.element.setAttribute('height', this.height);
    this.centerOrigin();
  }
}

var theMap = new Map(document.getElementById('map'), 700, 700, cars);
theMap.initialize();
theMap.update(); //run this command multiple times from console to see cars move
