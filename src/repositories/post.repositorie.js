const Connection = require("../libs/mysql");
const Post = require("../models/post");
const { models } = require("./../libs/sequelize");

class PostRepository {
  #posts = [];
  #connection = null;

  constructor() {
    this.#posts = [];
    //this.#connection = await Connection();
    this.getConnection();
  }

  async getConnection() {
    this.#connection = await Connection();
  }

  async get() {
    const posts = await models.Post.findAll();
    return posts.map((post) => new Post(post.id, post.title, post.content));
  }

  async create(post) {
    const newPost = await models.Post.create({
      title: post.gettitle(),
      content: post.getcontent(),
    });

    post.setid(newPost.id);
    return post;
  }

  async update(updatedPost) {
    await models.Post.update(
      {
        title: updatedPost.gettitle(),
        content: updatedPost.getcontent(),
      },
      {
        where: {
          id: updatedPost.getid(),
        },
      }
    );
    return updatedPost;
  }

  async getById(id) {
    const post = await models.Post.findByPk(id);

    if (!post) {
      return null;
    }
    return new Post(post.id, post.title, post.content);
  }

  async delete(id) {
    const post = await this.getById(id);
    if (!post) {
      return null;
    } else {
      await models.Post.destroy({
        where: {
          id: id,
        }
      });
      return post;
    }
  }
}

module.exports = PostRepository;
