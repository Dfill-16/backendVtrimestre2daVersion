const Connection = require("../libs/mysql");
const Comment = require("../models/comment");
const { models } = require("./../libs/sequelize");

class CommentRepository {
  #connection = null;

  constructor() {
    this.getConnection();
  }

  async getConnection() {
    this.#connection = await Connection();
  }

  async get() {
    const comments = await models.Comment.findAll();
    return comments.map((comment) => new Comment(comment.id, comment.postId, comment.content));
  }

  async create(comment) {
    const newComment = await models.Comment.create({
      postId: comment.getpostId(),
      content: comment.getcontent(),
    });

    comment.setid(newComment.id);
    return comment;
  }

  async update(updatedComment) {
    await models.Comment.update(
      {
        postId: updatedComment.getpostId(),
        content: updatedComment.getcontent(),
      },
      {
        where: {
          id: updatedComment.getid(),
        },
      }
    );
    return updatedComment;
  }

  async getById(id) {
    const comment = await models.Comment.findByPk(id);

    if (!comment) {
      return null;
    }
    return new Comment(comment.id, comment.postId, comment.content);
  }

  async delete(id) {
    const comment = await this.getById(id);
    if (!comment) {
      return null;
    } else {
      await models.Comment.destroy({
        where: {
          id: id,
        },
      });
      return comment;
    }
  }
}

module.exports = CommentRepository;
