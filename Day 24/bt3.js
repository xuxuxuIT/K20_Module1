class Employee {
  constructor(name, baseSalary) {
    this.name = name;
    this.baseSalary = baseSalary;
  }

  getMonthlySalary() {
    return this.baseSalary;
  }

  describe() {
    return `${this.name} - Lương: ${this.getMonthlySalary()}đ`;
  }
}

class Manager extends Employee {
  constructor(name, baseSalary, teamSize) {
    super(name, baseSalary);
    this.teamSize = teamSize;
  }

  getMonthlySalary() {
    return super.getMonthlySalary() + this.teamSize * 500000;
  }

  describe() {
    return `[Quản lý] ${super.describe()} (đội ${this.teamSize} người)`;
  }
}
const emp = new Employee("An", 10000000);

console.log(emp.getMonthlySalary());
console.log(emp.describe());
const manager = new Manager("Bình", 15000000, 5);
console.log(manager.getMonthlySalary());
console.log(manager.describe());
console.log(manager instanceof Employee);
console.log(manager instanceof Manager);
console.log(emp instanceof Manager);
