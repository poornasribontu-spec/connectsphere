require('dns').setDefaultResultOrder('ipv4first');

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const PostSchema = new mongoose.Schema({
    username: String,
    content: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    },
    comments: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model("Post", PostSchema);

app.get("/posts", async(req,res)=>{

    const posts = await Post.find().sort({ createdAt:-1 });

    res.json(posts);
});

app.post("/posts", async(req,res)=>{

    const newPost = new Post({
        username:req.body.username,
        content:req.body.content,
        image:req.body.image
    });

    await newPost.save();

    res.json(newPost);
});

app.put("/like/:id", async(req,res)=>{

    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    res.json(post);
});

app.post("/comment/:id", async(req,res)=>{

    const post = await Post.findById(req.params.id);

    post.comments.push(req.body.comment);

    await post.save();

    res.json(post);
});

app.delete("/posts/:id", async(req,res)=>{

    await Post.findByIdAndDelete(req.params.id);

    res.json({
        message:"Post deleted"
    });
});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});