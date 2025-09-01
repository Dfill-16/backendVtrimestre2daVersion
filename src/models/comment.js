class Comment {
  #id = null;
  #postId = null;
  #content = null;

  constructor(id = null, postId = null, content = null) {
    this.#id = id;
    this.#postId = postId;
    this.#content = content;
  }

  setid(value) {
    this.#id = value;
  }

  getid() {
    return this.#id;
  }

  getpostId() {
    return this.#postId;
  }

  setpostId(value) {
    this.#postId = value;
  }

  getcontent() {
    return this.#content;
  }

  setcontent(value) {
    this.#content = value;
  }

  getValues() {
    return {
      id: this.#id,
      postId: this.#postId,
      content: this.#content,
    };
  }
}

module.exports = Comment;
