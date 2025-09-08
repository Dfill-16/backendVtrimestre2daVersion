const { Router } = require("express");
const PostService = require("../services/post.service");
const router = Router();
const postService = new PostService();

router.get("/", async (req, res) => {
  const posts = await postService.get();
  res.status(200).json(posts);
});

router.post("/", async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }
  console.log(title, content);
  const post = await postService.create(title, content, author);
  res.status(201).json(post);
});

router.put("/:id", async (req, res) => {
  const { title, content, author } = req.body;
  const id = req.params.id;
  const post = await postService.update(id, title, content, author);
  console.log("Router:",id, title, content);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json(post);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleted = await postService.getById(id);  
  const post = await postService.delete(id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  res.status(200).json({"Post eliminado":deleted});
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await postService.getById(id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  res.status(200).json(post);
});

module.exports = router;
