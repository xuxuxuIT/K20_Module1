// 1. Tạo các lớp lỗi

// Lỗi sai kiểu dữ liệu
class TypeValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "TypeValidationError";
    this.field = field;
  }
}

// Lỗi giá trị vượt phạm vi
class RangeValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "RangeValidationError";
    this.field = field;
  }
}

// Lỗi email không hợp lệ
class InvalidEmailError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "InvalidEmailError";
    this.field = field;
  }
}

// Lỗi mật khẩu yếu
class WeakPasswordError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "WeakPasswordError";
    this.field = field;
  }
}

// Hàm đăng ký
function registerUser(user) {
  // Kiểm tra object
  if (typeof user !== "object" || user === null) {
    throw new TypeValidationError("Dữ liệu truyền vào phải là object", "user");
  }

  const { username, age, email, password } = user;

  // Username
  if (typeof username !== "string") {
    throw new TypeValidationError("Username phải là chuỗi", "username");
  }

  // Age
  if (typeof age !== "number") {
    throw new TypeValidationError("Age phải là number", "age");
  }

  // Tuổi hợp lệ
  if (age < 13 || age > 120) {
    throw new RangeValidationError("Tuổi phải từ 13 đến 120", "age");
  }

  // Email
  if (typeof email !== "string" || !email.includes("@")) {
    throw new InvalidEmailError("Email không hợp lệ", "email");
  }

  // Password
  if (typeof password !== "string") {
    throw new TypeValidationError("Password phải là chuỗi", "password");
  }

  if (password.length < 8) {
    throw new WeakPasswordError("Mật khẩu phải có ít nhất 8 kí tự", "password");
  }

  return {
    success: true,
    message: "Đăng kí thành công",
  };
}

// Hàm xử lý đăng ký
function handleRegister(user) {
  try {
    const result = registerUser(user);
    console.log(result);
  } catch (error) {
    if (error instanceof TypeValidationError) {
      console.log("Lỗi sai kiểu dữ liệu");
    } else if (error instanceof RangeValidationError) {
      console.log("Lỗi vượt phạm vi");
    } else if (error instanceof InvalidEmailError) {
      console.log("Email không hợp lệ");
    } else if (error instanceof WeakPasswordError) {
      console.log("Mật khẩu quá ngắn");
    } else {
      console.log("Lỗi không xác định");
    }

    console.log("Tên lỗi:", error.name);
    console.log("Message:", error.message);
    console.log("Field:", error.field);
  } finally {
    console.log("Quá trình xử lí đăng kí đã kết thúc.");
  }
}

// Test 1
handleRegister();

// Test 2
handleRegister({
  username: 123,
  age: 20,
  email: "a@b.com",
  password: "12345678",
});

// Test 3
handleRegister({
  username: "an",
  age: 8,
  email: "a@b.com",
  password: "12345678",
});

// Test 4
handleRegister({
  username: "an",
  age: 20,
  email: "abgmail.com",
  password: "12345678",
});

// Test 5
handleRegister({
  username: "an",
  age: 20,
  email: "a@b.com",
  password: "123",
});

// Test 6
handleRegister({
  username: "an",
  age: 20,
  email: "a@b.com",
  password: "12345678",
});
