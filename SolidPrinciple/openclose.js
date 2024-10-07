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