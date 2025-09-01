const crypto = require("crypto");
const CommentRepository = require("../repositories/comment.repositorie");
const Comment = require("../models/comment");

class CommentService {
  #repository;

  constructor() {
    this.#repository = new CommentRepository();
  }

  async get() {
    const comments = await this.#repository.get();
    return comments.map((comment) => comment.getValues());
  }

  async create(postId, content) {
    const id = crypto.randomUUID();
    const comment = new Comment(id, postId, content);
    const commentCreated = await this.#repository.create(comment);
    return commentCreated.getValues();
  }

  async update(id, postId, content) {
    const existente = await this.#repository.getById(id);
    if (!existente) {
      return null;
    }
    const updatedComment = new Comment(id, postId, content);
    const actualizado = await this.#repository.update(updatedComment);
    return actualizado.getValues();
  }

  async delete(id) {
    const comment = await this.#repository.getById(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    await this.#repository.delete(id);
    return comment.getValues();
  }

  async getById(id) {
    const comment = await this.#repository.getById(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment.getValues();
  }
}

module.exports = CommentService;