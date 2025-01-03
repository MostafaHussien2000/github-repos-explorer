import {
  getUserDataURL,
  getUserFollowersURL,
  getUserFollowingURL,
} from "./github-api";

export class User {
  constructor(username) {
    this.username = username;
    this.reposCount = 0;
    this.followersCount = 0;
    this.followingCount = 0;
  }

  async fetchAllRelatedData() {
    try {
      const userResponse = await fetch(getUserDataURL(this.username), {
        method: "GET",
        accept: "application/vnd.github.v3+json",
      });
      const userData = await userResponse.json();

      this.reposCount = userData?.public_repos;

      const followersResponse = await fetch(getUserFollowersURL(this.username));
      const followersData = await followersResponse.json();

      this.followersCount = followersData?.length || 0;

      const followingResponse = await fetch(getUserFollowingURL(this.username));
      const followingData = await followingResponse.json();

      this.followingCount = followingData?.length || 0;

      return this;
    } catch (err) {
      console.error("Error fetching user's data:", err);
      throw err;
    }
  }

  getReposCount() {
    return this.reposCount || 0;
  }

  getFollowersCount() {
    return this.followersCount || 0;
  }

  getFollowingCount() {
    return this.followingCount || 0;
  }
}
