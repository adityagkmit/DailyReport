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
