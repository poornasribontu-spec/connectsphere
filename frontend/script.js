const API = "https://connectsphere-9181.onrender.com";

const postBtn = document.querySelector(".post-btn");
const postContainer = document.querySelector(".posts-container");

postBtn.addEventListener("click", createPost);

async function createPost() {
  const username = document.querySelector(".username-input").value;
  const content = document.querySelector(".post-input").value;
  const image = document.querySelector(".image-input").value;

  if (!username || !content) {
    alert("Please fill all fields");
    return;
  }

  const postData = {
    username,
    content,
    image
  };

  try {
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });

    const data = await res.json();

    addPostToUI(data);

    document.querySelector(".post-input").value = "";
    document.querySelector(".image-input").value = "";

  } catch (err) {
    console.log(err);
  }
}

function addPostToUI(post) {
  const div = document.createElement("div");

  div.classList.add("post-card");

  div.innerHTML = `
    <div class="post-header">
      <img src="https://i.pravatar.cc/40" class="post-avatar">
      <h3>@${post.username}</h3>
    </div>

    <p class="post-text">${post.content}</p>

    ${
      post.image
        ? `<img src="${post.image}" class="post-image">`
        : ""
    }

    <div class="post-actions">
      <button onclick="likePost(this)">❤️ Like</button>
      <button onclick="commentPost()">💬 Comment</button>
      <button onclick="followUser()">➕ Follow</button>
    </div>
  `;

  postContainer.prepend(div);
}

function likePost(btn) {
  btn.innerHTML = "❤️ Liked";
}

function commentPost() {
  alert("Comment feature coming soon");
}

function followUser() {
  alert("Followed user");
}

window.onload = async () => {
  try {
    const res = await fetch(`${API}/posts`);
    const posts = await res.json();

    posts.reverse().forEach(addPostToUI);

  } catch (err) {
    console.log(err);
  }
};