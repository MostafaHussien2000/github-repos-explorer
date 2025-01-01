export const getUserDataURL = (username) =>
  `https://api.github.com/users/${username}`;

export const getUserReposURL = (username, perPage = 10, page = 1) =>
  `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

export const getRepoDetailsURL = (username, repo) =>
  `https://api.github.com/repos/${username}/${repo}`;

export const getRepoLanguagesURl = (username, repo) =>
  `https://api.github.com/repos/${username}/${repo}/languages`;

export const getUserFollowersURL = (username) =>
  `https://api.github.com/users/${username}/followers`;

export const getUserFollowingURL = (username) =>
  `https://api.github.com/users/${username}/following`;
