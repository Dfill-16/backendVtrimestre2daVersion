const { Router } = require("express");
const CommentService = require("../services/comment.service");
const ValidationHandler = require("../middlewares/validator.handle");
const commentSchema = require("../schemas/comment.schema");
const router = Router();
const commentService = new CommentService();

router.get("/", async (req, res) => {
  const comments = await commentService.get();
  res.status(200).json(comments);
});

router.post("/", ValidationHandler(commentSchema.create, "body"), async (req, res) => {
  const { postId, content } = req.body;
  const comment = await commentService.create(postId, content);
  res.status(201).json(comment);
});

router.put("/:id", ValidationHandler(commentSchema.update, "body"), ValidationHandler(commentSchema.get, "params"), async (req, res) => {
  const { postId, content } = req.body;
  const id = req.params.id;
  const comment = await commentService.update(id, postId, content);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  res.status(200).json(comment);
});

router.delete("/:id", ValidationHandler(commentSchema.get, "params"), async (req, res) => {
  const id = req.params.id;
  const deleted = await commentService.getById(id);
  const comment = await commentService.delete(id);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }
  res.status(200).json({ "Comment eliminado": deleted });
});

router.get("/:id", ValidationHandler(commentSchema.get, "params"), async (req, res) => {
  const id = req.params.id;
  const comment = await commentService.getById(id);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }
  res.status(200).json(comment);
});

module.exports = router;