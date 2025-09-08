const Connection = require("../libs/mongoose");
const CommentModel = require("../database/mongo/comment.model"); // Modelo Mongoose
const Comment = require("../models/comment"); // Clase de dominio

class CommentRepository {
  #connection = null;

  constructor() {
    this.getConnection();
  }

  async getConnection() {
    this.#connection = await Connection();
  }

  async get() {
    const comments = await CommentModel.find({});
    return comments.map(
      (c) => new Comment(c._id.toString(), c.postId.toString(), c.content)
    );
  }

  async create(comment) {
    const newComment = await CommentModel.create({
      postId: comment.getpostId(),
      content: comment.getcontent(),
    });

    comment.setid(newComment._id.toString());
    return comment;
  }

  async update(updatedComment) {
    await CommentModel.updateOne(
      { _id: updatedComment.getid() }, // filtro por PK
      {
        postId: updatedComment.getpostId(),
        content: updatedComment.getcontent(),
      }
    );
    return updatedComment;
  }

  async getById(id) {
    const comment = await CommentModel.findById(id);
    if (!comment) return null;
    return new Comment(
      comment._id.toString(),
      comment.postId.toString(),
      comment.content
    );
  }

  async delete(id) {
    const comment = await this.getById(id);
    if (!comment) return null;

    await CommentModel.deleteOne({ _id: id });
    return comment;
  }
}

module.exports = CommentRepository;
