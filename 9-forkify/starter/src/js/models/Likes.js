import { callbackify } from 'util';

/* global localStorage */

export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike({ id, title, author, img }) {
    const newLike = this.likes[this.likes.push({ id, title, author, img }) - 1];

    // Persist data in localStorage
    this.persistData();
    return newLike;
  }

  deleteLike(id) {
    this.likes = this.likes.filter(element => element.id !== id);

    // Persist data in localStorage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.find(like => like.id === id) !== undefined;
  }

  getNumberOfLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storageLikes = JSON.parse(localStorage.getItem('likes'));
    if (storageLikes) {
      // Restoring likes from localStorage
      this.likes = storageLikes;
    }
  }
}