const Connection = require("../libs/mysql");
const Post = require("../models/post");


class PostRepository {
  #posts = [];
  #connection=null;

  constructor() {
    this.#posts = [];
    //this.#connection = await Connection();
    this.getConnection();
  }
  
  async getConnection(){
    this.#connection = await Connection();
  }

  async get() {
    const query = "SELECT * FROM posts";
    const [rows] = await this.#connection.execute(query);
    return rows.map((rw) => new Post(rw.id, rw.title, rw.content));
  }

  async create(post) {
    console.log("Post recibido en repo:", post);
    console.log("Valores:", post.title, post.content);
    const query = "INSERT INTO posts (title, content) VALUES (?, ?)";
    const [rows] = await this.#connection.execute(query, [post.gettitle(), post.getcontent()]);
    
    post.setid(rows.insertId);
    return post;
  }

  async update(updatedPost) {
    const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
    const [rows] = await this.#connection.execute(query, [updatedPost.gettitle(), updatedPost.getcontent(), updatedPost.getid()]);
    return updatedPost;
  }

  async getById(id) {
    const query = "SELECT * FROM posts WHERE id = ?";
    const [rows] = await this.#connection.execute(query, [id]);

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return new Post(row.id, row.title, row.content);
  }

  async delete(id) {
    const query = "DELETE FROM posts WHERE id = ?";
    const [rows] = await this.#connection.execute(query, [id]);
    const postDelete = this.getById(id);
    return postDelete;
  }
}

module.exports = PostRepository;
