const loginBtn = document.getElementById("login-btn");
const username = document.getElementById("username");
const password = document.getElementById("password");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    username: username.value,
    password: password.value,
  };
  if (!data.username || !data.password) {
    alert("Please enter a username and password");
    return;
  }
  fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status === 200) {
      console.log("success");
      window.location.href = "/dashboard";
    } else {
      alert("Invalid username or password");
    }
  });
});