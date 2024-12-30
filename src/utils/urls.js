export const getReposURL = (username, perPage = 10, page = 1) =>
  `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;
