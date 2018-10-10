import { callbackify } from 'util';


export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike({id, title, author, img}) {
    return this.likes[this.likes.push({id, title, author, img}) - 1];
  }

  deleteLike(id) {
    this.likes = this.likes.filter(element => element.id !== id);
  }

  isLiked(id) {
    return this.likes.find(like => like.id === id) !== undefined;
  }

  getNumberOfLikes() {
    return this.likes.length;
  }
}