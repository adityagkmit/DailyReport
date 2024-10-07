// 4. Decorator pattern

// Good example

function Coffee() {
  this.cost = 10;
  this.description = "Basic Coffee";
}

Coffee.prototype.getCost = function() {
  return this.cost;
};

Coffee.prototype.getDescription = function() {
  return this.description;
};

function MilkDecorator(coffee) {
  this.coffee = coffee;
  this.cost = 2;
  this.description = " with Milk";
}

MilkDecorator.prototype.getCost = function() {
  return this.coffee.getCost() + this.cost;
};

MilkDecorator.prototype.getDescription = function() {
  return this.coffee.getDescription() + this.description;
};

// Usage
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
console.log(coffee.getCost()); // 12
console.log(coffee.getDescription()); // Basic Coffee with Milk



// Bad example

function Coffee() {
  this.cost = 10;
  this.description = "Basic Coffee";
}

function addMilk(coffee) {
  coffee.cost += 2;
  coffee.description += " with Milk";
  return coffee;
}

// Usage
let coffee = new Coffee();
coffee = addMilk(coffee);
console.log(coffee.cost); // 12
console.log(coffee.description); // Basic Coffee with Milk

