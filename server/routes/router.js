import express from "express";
import Post from "../models/posts.js";

const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    res.status(500).json({
      Error: error,
    });
  }
});

// Add posts
router.post("/posts", async (req, res) => {
  console.log(req.body);
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(500).json({
      Error: error,
    });
  }
});

// Delete Posts
router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Post.deleteOne({
      _id: id,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      Error: error,
    });
  }
});

// Edit card
router.put("/posts/:id", async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          description: req.body.description,
          title: req.body.title,
        },
      }
    );

    const editidPost = await Post.find({ _id: req.params.id });
    res.json(editidPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
