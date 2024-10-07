// Design Principles


// 1. Singleton pattern


// bad code 
class BadSingleton {
  static getInstance(){
    return new BadSingleton()
  }
}
const s1 = BadSingleton.getInstance();
const s2 = BadSingleton.getInstance();
console.log(s1 === s2); // false


// good code
class Singleton {
  static getInstance(){
    if(!this.instance){
      this.instance = new Singleton()
    }
    return this.instance
  }
}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2); // true



// 2. Factory method pattern


// BAD CODE
class Add {
    constructor(a, b){
        this.addition = a+b;
    }
    add(){
        console.log(this.addition);
    }
}

class Sub {
    constructor(a, b){
        this.subtraction = a-b;
    }
    sub(){
        console.log(this.subtraction);
    }
}

const ans = new Add(24, 13);
ans.add();
const result = new Sub(24,13);
result.sub();


// GOOD CODE


class Add {
    constructor(a, b){
        this.addition = a+b;
    }
    getAns(){
        console.log(this.addition);
    }
}


class Sub {
    constructor(a, b){
        this.subtraction = a-b;
    }
    getAns(){
        console.log(this.subtraction);
    }
}


class MathFactory {
    static math(operation, a, b){
        switch (operation){
            case 'Add':
        return new Add(a,b);
            case 'Sub':
        return new Sub(a,b);
            break;
        }
    }
}
const add1 = MathFactory.math("Add", 24, 13);
add1.getAns();
const sub1 = MathFactory.math("Sub", 24, 13);
sub1.getAns();



// 3. Observer pattern

// Good example

class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} received data: ${data}`);
  }
}

const subject = new Subject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify("Hello from Subject!"); 


// Bad example
let observers = [];

function subscribe(callback) {
  observers.push(callback);
}

function unsubscribe(callback) {
  observers = observers.filter(cb => cb !== callback);
}

function notify(data) {
  observers.forEach(callback => callback(data));
}

// Usage
subscribe(data => console.log("Observer 1 received:", data));
subscribe(data => console.log("Observer 2 received:", data));

notify("Hello from Subject!"); 


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



//5. Logging Proxy

// Good example

const targetObject = {
  name: "John",
  age: 30,
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

const loggingProxy = new Proxy(targetObject, {
  get(target, prop, receiver) {
    console.log(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },

  set(target, prop, value, receiver) {
    console.log(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
});

loggingProxy.name = "Jane"; // Logs: Setting property: name to Jane
loggingProxy.greet(); // Logs: Accessing property: greet, Hello, I'm Jane


// Bad example: Overcomplicated Proxy

const target = {};

const proxy = new Proxy(target, {
  get(target, prop) {
    if (prop === 'foo') {
      // Complex logic here...
    } else if (prop === 'bar') {
      // More complex logic...
    }
    // ...
  },
  set(target, prop, value) {
    if (prop === 'foo') {
      // Even more complex logic...
    }
    // ...
  }
});


// 6. Command Pattern

// Good example

class Light {
  constructor() {
    this.isOn = false;
  }

  on() {
    this.isOn = true;
    console.log('Light is on');
  }

  off() {
    this.isOn = false;
    console.log('Light is off');
  }
}

class LightOnCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.on();
  }
}

class LightOffCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.off();
  }
}

const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);

const remoteControl = {
  executeCommand: function(command) {
    command.execute();
  }
};

remoteControl.executeCommand(lightOnCommand); 
remoteControl.executeCommand(lightOffCommand); 


// Bad example

function turnLightOn() {
  console.log('Light is on');
}

function turnLightOff() {
  console.log('Light is off');
}

const remoteControl = {
  on: turnLightOn,
  off: turnLightOff
};

remoteControl.on(); 
remoteControl.off(); 






// SOLID Principles


// 1. Single Responsibility Principle

// Use Case :-  a single UserManager class handling user authentication, data validation, and profile management
// Before (Violates SRP):
class UserManager {
  constructor(authService, db) {
    this.authService = authService;
    this.db = db;
  }
  authenticate(username, password) {
    // Authentication logic using authService
  }
  validateUserData(data) {
    // Data validation logic
  }
  createUserProfile(data) {
    // Profile creation logic using db
  }
  getUserProfile(userId) {
    // Profile retrieval logic using db
  }
}

// After (SRP Applied):
class AuthenticationService {
  authenticate(username, password) {
    // Authentication logic
  }
}
class UserDataValidator {
  validate(data) {
    // Data validation logic
  }
}
class UserDatabase {
  createUserProfile(data) {
    // Profile creation logic
  }
  getUserProfile(userId) {
    // Profile retrieval logic
  }
}

// 2. Open/Closed Principle

// Use Case :-  Create an AbstractShape interface with methods for calculating area and perimeter.
//        Concrete shapes like Circle and Square can implement this interface without modifying the original code.
  // Before (Violates OCP):
class ManageSalaries {
  constructor() {
    this.salaryRates = [
      { id: 1, role: 'developer', rate: 100 },
      { id: 2, role: 'architect', rate: 200 },
      { id: 3, role: 'manager', rate: 300 },
    ];
  }
  calculateSalaries(empId, hoursWorked) {
    let salaryObject = this.salaryRates.find((o) => o.id === empId);
    return hoursWorked * salaryObject.rate;
  }
}
const mgtSalary = new ManageSalaries();
console.log("Salary : ", mgtSalary.calculateSalaries(1, 100));
// After (OCP Applied):
class ManageSalaries {
  constructor() {
    this.salaryRates = [
      { id: 1, role: 'developer', rate: 100 },
      { id: 2, role: 'architect', rate: 200 },
      { id: 3, role: 'manager', rate: 300 },
    ];
  }
  calculateSalaries(empId, hoursWorked) {
    let salaryObject = this.salaryRates.find((o) => o.id === empId);
    return hoursWorked * salaryObject.rate;
  }
  addSalaryRate(id, role, rate) {
    this.salaryRates.push({ id: id, role: role, rate: rate });
  }
}
const mgtSalary = new ManageSalaries();
mgtSalary.addSalaryRate(4, 'developer', 250);
console.log('Salary : ', mgtSalary.calculateSalaries(4, 100));
}

// 3. Liskov’s Substitution Principle

// UseCase:-   If a function expects a Shape object to calculate its area, any valid subtype like Circle or
//             Square should seamlessly replace it, maintaining the expected behavior.
 // Before (LSP Violates):
interface Shape {
  calculateArea(): number;
}
class Rectangle implements Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  calculateArea(): number {
    return this.width * this.height;
  }
}
class Square extends Rectangle {
  constructor(size: number) {
    // The Square class incorrectly uses the Rectangle constructor
    super(size, size);
  }
  // Violates LSP by changing the behavior of `setWidth` and `setHeight` methods
  setWidth(width: number) {
    this.width = width;
    this.height = width; // Forces the height to be the same as width
  }
  setHeight(height: number) {
    this.width = height; // Forces the width to be the same as height
    this.height = height;
  }
}

// Breaking LSP

function drawShape(shape: Shape) {
  const area = shape.calculateArea();
  // Draw the shape based on its area
}
const mySquare = new Square(5);
mySquare.setWidth(4); // Unexpectedly alters both width and height
drawShape(mySquare); // Now this function is confused, as the behavior of the square changes unpredictably

 // (LSP Applied):
  
 interface Shape {
  calculateArea(): number;
}
class
Rectangle
implements
Shape
{
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  calculateArea(): number {
    return
this.width * this.height;
  }
}
// Correctly substitutable (LSP adhered to)
function drawShape(shape: Shape) {
  const area = shape.calculateArea();
  // Draw the shape based on its area
}
drawShape(new Rectangle(5, 4)); // Valid

// 4. Interface Segregation Principle

// Use Case:-
// Instead of a single UserInterface with methods for both admin and user features,
// create separate interfaces (AdminInterface and UserInterface) exposing only relevant methods for each type of user.
//////  Before (Violates ISP):
Class DrivingTest {
  constructor(userType) {
    this.userType = userType;
  }
  startCarTest() {
    console.log(“This is for Car Drivers”’);
  }
  startTruckTest() {
    console.log(“This is for Truck Drivers”);
  }
}
class CarDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
  startCarTest() {
    return “Car Test Started”;
  }
  startTruckTest() {
    return null;
  }
}
class TruckDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
  startCarTest() {
    return null;
  }
  startTruckTest() {
    return “Truck Test Started”;
  }
}
const carTest = new CarDrivingTest(carDriver );
console.log(carTest.startCarTest());
console.log(carTest.startTruckTest());
const truckTest = new TruckDrivingTest( ruckdriver );
console.log(truckTest.startCarTest());
console.log(truckTest.startTruckTest());

/////// After (ISP Applied):

Class DrivingTest {
  constructor(userType) {
    this.userType = userType;
  }
}
class CarDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
}
class TruckDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
}
const carUserTests = {
  startCarTest() {
    return ‘Car Test Started’;
  },
};
const truckUserTests = {
  startTruckTest() {
    return ‘Truck Test Started’;
  },
};
Object.assign(CarDrivingTest.prototype, carUserTests);
Object.assign(TruckDrivingTest.prototype, truckUserTests);
const carTest = new CarDrivingTest(carDriver );
console.log(carTest.startCarTest());
console.log(carTest.startTruckTest()); // Will throw an exception
const truckTest = new TruckDrivingTest( ruckdriver );
console.log(truckTest.startTruckTest());
console.log(truckTest.startCarTest()); // Will throw an exception

// 5. Dependency Inversion Principle

// Instead of directly referencing a specific data storage implementation in your application logic, rely on an abstract DataStore interface.
// Before (Violates DIP):
class EmailController {
  sendEmail(emailDetails) {
     // Need to change this line in every controller that uses YahooAPI.const response = YahooAPI.sendEmail(emailDetails);
    if (response.status == 200) {
       return true;
    } else {
       return false;
    }
  }
}

// After (DIP Applied):

class EmailController {
  sendEmail(emailDetails) {
    const response = EmailApiController.sendEmail(emailDetails);
    if (response.status == 200) {
       return true;
    } else {
       return false;
    }
  }
}
class EmailApiController {
  sendEmail(emailDetails) {
    // Only need to change this controller. return YahooAPI.sendEmail(emailDetails);
  }
}





