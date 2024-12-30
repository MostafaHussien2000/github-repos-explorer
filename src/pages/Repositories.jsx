import React, { useEffect, useState } from "react";
import styles from "./Repositories.module.css";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useAuth } from "../context/AuthContext";
import RepoCard from "../components/RepoCard";

function Repositories() {
  const { user, signout } = useAuth();

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!user)
    return (
      <header>
        <p>You need to login first</p>
      </header>
    );

  useEffect(() => {
    const getRepos = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.github.com/users/${user.preferred_username}/repos?per_page=8`
        );
        const data = await response.json();

        console.log(data);
        setRepos(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching your repos:", err);
      } finally {
        setLoading(false);
      }
    };

    getRepos();
  }, []);

  return (
    <main id="repositories-page" className={`${styles.repositories}`}>
      <header>
        <Flex gap="5" justify={"between"}>
          <Flex as="header" gap="5" align="center">
            <Avatar src={user.avatar_url} size="2" />
            <Text size="3">{user.preferred_username}</Text>
          </Flex>
          <Button variant="outline" color="red" onClick={signout}>
            Logout
          </Button>
        </Flex>
      </header>
      <section>
        <Heading size={9}>
          Welcome back <span>{user.preferred_username}</span>
        </Heading>
        <Text as="p" mb={"5"}>
          These are all repos in your account.
        </Text>
      </section>

      {loading ? (
        <p>Loading repos ...</p>
      ) : error ? (
        <p>{error}</p>
      ) : repos && repos.length > 0 ? (
        <Grid columns="2" gap="3">
          {repos.map((repo) => (
            <RepoCard repo={repo} key={repo.name} />
          ))}
        </Grid>
      ) : (
        <p>No repos found</p>
      )}
    </main>
  );
}

export default Repositories;
