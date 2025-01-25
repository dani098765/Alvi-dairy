document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const showSignup = document.getElementById("show-signup");
  const showLogin = document.getElementById("show-login");

  // Default view: show login form
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");

  // Switch to Signup Form
  showSignup.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  });

  // Switch to Login Form
  showLogin.addEventListener("click", () => {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  // Signup Form Submission
  document.getElementById("signup").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const role = e.target.role.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
      alert("Username already exists! Please choose another one.");
    } else {
      users.push({ username, email, password, role });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! You can now log in.");
      signupForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    }
  });

  // Login Form Submission
  document.getElementById("login").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();
    const role = e.target.role.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );

    if (user) {
      alert("Login successful!");
      localStorage.setItem("currentUser", JSON.stringify(user)); // Save session
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
      alert("Invalid credentials or role.");
    }
  });
});
