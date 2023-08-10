const submitUpdateBtn = document.getElementById("submit-update-btn");
const titleEl = document.getElementById("updated-title");
const contentEl = document.getElementById("updated-content");

submitUpdateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const title = titleEl.value.trim();
  const content = contentEl.value.trim();
  const id = submitUpdateBtn.getAttribute("data-id");
  if (title && content && id) {
    const response = await fetch(`/api/blogpost/update-post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace(
        "/my-post/" + localStorage.getItem("mypost-id")
      );
    } else {
      alert("Failed to update post");
    }
  }
});