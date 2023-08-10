const submitUpdateCommentBtn = document.getElementById(
    "submit-update-comment-btn"
  );
  const updateCommentEl = document.getElementById("update-comment");
  
  submitUpdateCommentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.getAttribute("data-id");
    let comment = updateCommentEl.value;
    fetch("/api/comment/update-comment/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        content: comment,
      }),
    }).then((response) => {
      if (response.status === 200) {
        window.location.href =
          "/add-comment/" + localStorage.getItem("homepage-id");
      } else {
        alert("Failed to update comment");
      }
    });
  });