const form = document.getElementById("register-form");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const usernameError = document.getElementById("username-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

const submitBtn = document.getElementById("submit-btn");

// danh dau nguoi dung da nhap o nao
const touched = {
  username: false,
  email: false,
  password: false,
  confirmPassword: false,
};

// kiem tra username
function validateUsername() {
  const value = username.value.trim();

  if (!/^[a-zA-Z0-9_]{4,}$/.test(value)) {
    if (touched.username) {
      usernameError.textContent =
        "Tên đăng nhập phải từ 4 ký tự và chỉ gồm chữ, số, dấu _";
    }
    return false;
  }

  usernameError.textContent = "";
  return true;
}

// kiem tra email
function validateEmail() {
  const value = email.value.trim();

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(value)) {
    if (touched.email) {
      emailError.textContent = "Email không hợp lệ";
    }
    return false;
  }

  emailError.textContent = "";
  return true;
}

// kiem tra password
function validatePassword() {
  const value = password.value;

  if (value.length < 8 || !/\d/.test(value)) {
    if (touched.password) {
      passwordError.textContent =
        "Mật khẩu tối thiểu 8 ký tự và có ít nhất 1 chữ số";
    }
    return false;
  }

  passwordError.textContent = "";
  return true;
}

// kiem tra nhap lai pass
function validateConfirmPassword() {
  if (confirmPassword.value !== password.value) {
    if (touched.confirmPassword) {
      confirmPasswordError.textContent = "Mật khẩu không khớp";
    }
    return false;
  }

  confirmPasswordError.textContent = "";
  return true;
}

// kiem tra toan bo form
function updateSubmitButton() {
  const valid =
    validateUsername() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword();

  submitBtn.disabled = !valid;
}

// username
username.addEventListener("input", () => {
  touched.username = true;
  validateUsername();
  updateSubmitButton();
});

// email
email.addEventListener("input", () => {
  touched.email = true;
  validateEmail();
  updateSubmitButton();
});

// pass
password.addEventListener("input", () => {
  touched.password = true;
  validatePassword();

  // pass doi thi kiem tra lai confirm
  validateConfirmPassword();

  updateSubmitButton();
});

// confirm pass
confirmPassword.addEventListener("input", () => {
  touched.confirmPassword = true;
  validateConfirmPassword();
  updateSubmitButton();
});

// submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (submitBtn.disabled) return;

  let message = document.getElementById("success-message");

  if (!message) {
    message = document.createElement("p");
    message.id = "success-message";
    form.after(message);
  }

  message.textContent = "Đăng ký thành công!";
  message.style.color = "green";
});
