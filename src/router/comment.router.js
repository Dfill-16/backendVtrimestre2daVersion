const { Router } = require("express");
const CommentService = require("../services/comment.service");
const router = Router();
const commentService = new CommentService();

router.get("/", async (req, res) => {
  const comments = await commentService.get();
  res.status(200).json(comments);
});

router.post("/", async (req, res) => {
  const { postId, content } = req.body;
  if (!postId || !content) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }
  const comment = await commentService.create(postId, content);
  res.status(201).json(comment);
});

router.put("/:id", async (req, res) => {
  const { postId, content } = req.body;
  const id = req.params.id;
  const comment = await commentService.update(id, postId, content);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  res.status(200).json(comment);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleted = await commentService.getById(id);
  const comment = commentService.delete(id);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }
  res.status(200).json({ "Comment eliminado": deleted });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const comment = await commentService.getById(id);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }
  res.status(200).json(comment);
});

module.exports = router;