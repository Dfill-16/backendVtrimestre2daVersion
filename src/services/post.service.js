const crypto = require("crypto");
const PostRepository = require("../repositories/post.repositorie");
const Post = require("../models/post");

class PostService {
  #repository;

  constructor() {
    this.#repository = new PostRepository();
  }

  async get() {
    const posts = await this.#repository.get();
    return posts.map((post) => post.getValues());
  }

  async create(title, content) {
    const id = crypto.randomUUID();
    const post = new Post(id, title, content);
    const postCreated = await this.#repository.create(post);
    return postCreated.getValues();
  }

  async update(id, title, content) {
    const existente =await this.#repository.getById(id);
    if (!existente) {
      return null;
    }
    console.log("service",id, title, content);
    const updatedPost = new Post(id, title, content);
    const actualizado = await this.#repository.update(updatedPost);
    return actualizado.getValues();
  }

  async delete(id) {
    const post = await this.#repository.getById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    await this.#repository.delete(id);
    return post.getValues();
  }

  async getById(id) {
    const post = await this.#repository.getById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post.getValues();
  }
}

module.exports = PostService;
