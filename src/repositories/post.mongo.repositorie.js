const Connection = require("../libs/mongoose");
const PostModel = require("../database/mongo/post.model"); // Mongoose
const Post = require("../models/post"); // Clase de dominio

class PostRepository {
  #connection = null;

  constructor() {
    this.getConnection();
  }

  async getConnection() {
    this.#connection = await Connection();
  }

  async get() {
    const posts = await PostModel.find({});
    return posts.map(
      (p) => new Post(p._id.toString(), p.title, p.content, p.author)
    );
  }

  async create(post) {
    const newPost = await PostModel.create({
      title: post.gettitle(),
      content: post.getcontent(),
      author: post.getauthor(),
    });
    post.setid(newPost._id.toString());
    return post;
  }

  async update(updatedPost) {
    await PostModel.updateOne(
      { _id: updatedPost.getid() }, // filtro
      {
        title: updatedPost.gettitle(),
        content: updatedPost.getcontent(),
        author: updatedPost.getauthor(),
      }
    );
    return updatedPost;
  }

  async getById(id) {
    const post = await PostModel.findById(id);
    if (!post) return null;
    return new Post(post._id.toString(), post.title, post.content, post.author);
  }

  async delete(id) {
    const post = await this.getById(id);
    if (!post) return null;
    await PostModel.deleteOne({ _id: id });
    return post;
  }
}

module.exports = PostRepository;
