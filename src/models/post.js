class Post {
  #id = null;
  #title = null;
  #content = null;

  constructor(id=null, title=null, content=null) {
    this.#id = id;
    this.#title = title;
    this.#content = content;
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

  getValues() {
    return {
      id: this.#id,
      title: this.#title,
      content: this.#content,
    };
  }

}

module.exports = Post;