const openPostBtn = document.querySelectorAll(".open-post-btn");

openPostBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.getAttribute("data-id");
    localStorage.setItem("mypost-id", id);
    window.location.href = "/my-post/" + id;
  });
});