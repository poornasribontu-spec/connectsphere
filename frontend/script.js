const API = "http://localhost:5000";

const postsDiv = document.getElementById("posts");

async function loadPosts(){

    const res = await fetch(`${API}/posts`);

    const posts = await res.json();

    postsDiv.innerHTML = "";

    posts.forEach(post=>{

        const div = document.createElement("div");

        div.classList.add("post");

        let commentsHTML = "";

        post.comments.forEach(comment=>{
            commentsHTML += `<div class="comment">💬 ${comment}</div>`;
        });

        div.innerHTML = `

        <div class="post-header">

            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200">

            <div>
                <h3>${post.username}</h3>
                <small>${new Date(post.createdAt).toLocaleString()}</small>
            </div>

        </div>

        <div class="post-content">
            <p>${post.content}</p>
        </div>

        <img
            class="post-image"
            src="https://picsum.photos/600/400?random=${Math.random()}"
        >

        <div class="actions">

            <button onclick="likePost('${post._id}')">
                ❤️ ${post.likes}
            </button>

            <button onclick="commentPost('${post._id}')">
                💬 Comment
            </button>

            <button onclick="deletePost('${post._id}')">
                🗑 Delete
            </button>

        </div>

        ${commentsHTML}
        `;

        postsDiv.appendChild(div);
    });
}

async function createPost(){

    const username = document.getElementById("username").value;

    const postInput = document.getElementById("postInput").value;

    if(username==="" || postInput===""){
        alert("Fill all fields");
        return;
    }

    await fetch(`${API}/posts`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            content:postInput
        })
    });

    document.getElementById("postInput").value="";

    loadPosts();
}

async function likePost(id){

    await fetch(`${API}/like/${id}`,{
        method:"PUT"
    });

    loadPosts();
}

async function commentPost(id){

    const comment = prompt("Enter comment");

    if(!comment) return;

    await fetch(`${API}/comment/${id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            comment
        })
    });

    loadPosts();
}

async function deletePost(id){

    await fetch(`${API}/posts/${id}`,{
        method:"DELETE"
    });

    loadPosts();
}

loadPosts();