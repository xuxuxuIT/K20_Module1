class BankAccount {
  // Static property
  static totalMoney = 0;

  #balance;

  constructor(ownerName, balance) {
    if (typeof balance !== "number" || balance < 0) {
      throw new Error("Số dư ban đầu không hợp lệ");
    }

    this.ownerName = ownerName;
    this.#balance = balance;

    BankAccount.totalMoney += balance;
  }

  // Getter
  get balance() {
    return this.#balance;
  }

  _setBalance(newBalance) {
    this.#balance = newBalance;
  }

  deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Số tiền nạp không hợp lệ");
    }

    this.#balance += amount;
  }

  withdraw(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Số tiền rút không hợp lệ");
    }

    if (amount > this.#balance) {
      throw new Error("Không đủ tiền");
    }

    this.#balance -= amount;
  }

  toString() {
    return `Chủ tài khoản: ${this.ownerName}
Số dư: ${this.#balance}`;
  }
}

class SavingsAccount extends BankAccount {
  constructor(ownerName, balance, interestRate) {
    super(ownerName, balance);

    this.interestRate = interestRate;
  }

  addInterest() {
    const newBalance = this.balance + this.balance * this.interestRate;

    this._setBalance(newBalance);
  }

  withdraw(amount) {
    if (amount > this.balance / 2) {
      throw new Error("Không được rút quá 50% số dư trong một lần");
    }

    super.withdraw(amount);
  }
}

try {
  const account = new BankAccount("An", -100);
} catch (e) {
  console.log(e.message);
}

try {
  const account = new BankAccount("An", 500000);

  account.deposit("100");
} catch (e) {
  console.log(e.message);
}

try {
  const account = new BankAccount("An", 500000);

  account.withdraw(700000);
} catch (e) {
  console.log(e.message);
}

const s1 = new SavingsAccount("Bình", 1000000, 0.05);

s1.addInterest();

console.log(s1.balance);

try {
  const s2 = new SavingsAccount("Bình", 1000000, 0.05);

  s2.withdraw(600000);
} catch (e) {
  console.log(e.message);
}
const s3 = new SavingsAccount("Bình", 1000000, 0.05);

s3.withdraw(400000);
console.log(s3.balance);
console.log(BankAccount.totalMoney);
