const submitNewCommentBtn = document.getElementById("submit-new-comment-btn");
const deleteCommentBtn = document.querySelectorAll(".delete-comment-btn");
const newCommentEl = document.getElementById("new-comment");

submitNewCommentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let id = e.target.getAttribute("data-id");
  let comment = newCommentEl.value;
  fetch("/api/comment/add-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blogpost_id: id,
      content: comment,
    }),
  }).then((response) => {
    if (response.status === 200) {
      window.location.href = "/add-comment/" + id;
    } else {
      alert("Failed to create comment");
    }
  });
});

deleteCommentBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.getAttribute("data-id");
    fetch("/api/comment/delete-comment/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = "/";
      } else {
        alert("Failed to delete comment");
      }
    });
  });
});