class Post {
  #id = null;
  #title = null;
  #content = null;
  #author = null;

  constructor(id=null, title=null, content=null, author=null) {
    this.#id = id;
    this.#title = title;
    this.#content = content;
    this.#author = author;
  }

  getid() {
    return this.#id;
  }

  setid(value) {
    this.#id = value;
  }

  gettitle() {
    return this.#title;
  }

  settitle(value) {
    this.#title = value;
  }

  getcontent() {
    return this.#content;
  }

  setcontent(value) {
    this.#content = value;
  }

  getauthor() {
    return this.#author;
  }

  setauthor(value) {
    this.#author = value;
  }

  getValues() {
    return {
      id: this.#id,
      title: this.#title,
      content: this.#content,
      author: this.#author,
    };
  }

}

module.exports = Post;