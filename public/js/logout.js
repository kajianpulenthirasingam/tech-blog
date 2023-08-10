const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then(() => {
    document.location.replace("/");
  });
});