export class Comments {
  constructor(key = "comments") {
    this.key = key;
    this.comments = this.loadComments();
  }

  loadComments() {
    const savedComments = localStorage.getItem(this.key);
    return savedComments ? JSON.parse(savedComments) : {};
  }

  saveComments() {
    localStorage.setItem(this.key, JSON.stringify(this.comments));
  }

  addComment(repoId, comment) {
    if (!this.comments[repoId]) this.comments[repoId] = [];

    const newComment = {
      id: Date.now(),
      text: comment,
      createdAt: new Date(),
    };

    this.comments[repoId].push(newComment);
    this.saveComments();
    return newComment;
  }

  getComments(repoId) {
    return this.comments[repoId] || [];
  }

  deleteComment(repoId, commentId) {
    if (this.comments[repoId]) {
      this.comments[repoId] = this.comments[repoId].filter(
        (comment) => comment.id !== commentId
      );

      this.saveComments();
    }
  }

  clearAllRepoComment(repoId) {
    delete this.comments[repoId];
    this.saveComments();
  }
}
