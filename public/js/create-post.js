const submitNewPostBtn = document.getElementById("submit-new-post-btn");
const postTitle = document.getElementById("create-title");
const postContent = document.getElementById("create-content");

submitNewPostBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/api/blogpost/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: postTitle.value,
      content: postContent.value,
    }),
  }).then((response) => {
    if (response.status === 200) {
      window.location.href = "/dashboard";
    } else {
      alert("Failed to create post");
    }
  });
});