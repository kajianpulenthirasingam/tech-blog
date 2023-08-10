const deletePostBtn = document.getElementById("delete-post-btn");

deletePostBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let id = e.target.getAttribute("data-id");
  fetch("/api/blogpost/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      window.location.href = "/dashboard";
    } else {
      alert("Failed to delete post");
    }
  });
});