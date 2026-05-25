const API = "https://connectsphere-9181.onrender.com";

const postsContainer = document.getElementById("posts");

async function createPost() {

    const username = document.getElementById("username").value;

    const content = document.getElementById("postInput").value;

    const image = document.getElementById("imageInput").value;

    if (!username || !content) {
        alert("Please enter username and content");
        return;
    }

    const postData = {
        username,
        content,
        image
    };

    try {

        const response = await fetch(`${API}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        const data = await response.json();

        addPostToUI(data);

        document.getElementById("postInput").value = "";
        document.getElementById("imageInput").value = "";

    } catch (error) {

        console.log(error);
        alert("Error creating post");

    }

}

function addPostToUI(post) {

    const postCard = document.createElement("div");

    postCard.className = "post-card";

    postCard.innerHTML = `

        <div class="post-header">

            <img
                class="post-avatar"
                src="https://i.pravatar.cc/100"
            >

            <div>
                <h3>${post.username}</h3>
                <span>Just now</span>
            </div>

        </div>

        <p class="post-content">
            ${post.content}
        </p>

        ${
            post.image
                ? `<img class="post-image" src="${post.image}">`
                : ""
        }

        <div class="post-actions">

            <button onclick="likePost(this)">
                ❤️ Like
            </button>

            <button onclick="commentPost()">
                💬 Comment
            </button>

            <button onclick="followUser(this)">
                ➕ Follow
            </button>

        </div>

    `;

    postsContainer.prepend(postCard);

}

function likePost(button) {

    if (button.innerHTML === "❤️ Like") {

        button.innerHTML = "❤️ Liked";

    } else {

        button.innerHTML = "❤️ Like";

    }

}

function commentPost() {

    alert("Comment feature coming soon 🚀");

}

function followUser(button) {

    if (button.innerHTML === "➕ Follow") {

        button.innerHTML = "✔ Following";

    } else {

        button.innerHTML = "➕ Follow";

    }

}

async function loadPosts() {

    try {

        const response = await fetch(`${API}/posts`);

        const posts = await response.json();

        posts.reverse().forEach(post => {

            addPostToUI(post);

        });

    } catch (error) {

        console.log(error);

    }

}

loadPosts();