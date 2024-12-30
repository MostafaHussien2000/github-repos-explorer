import React, { useCallback, useEffect, useRef, useState } from "react";

import RepoCard from "./RepoCard";
import {
  Button,
  Callout,
  Flex,
  Grid,
  Link,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import { useAuth } from "../context/AuthContext";
import { getReposURL } from "../utils/urls";
import { GoInfo } from "react-icons/go";

function ReposGrid() {
  const { user } = useAuth();

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loadingNewRepos, setLoadingNewRepos] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const [page, setPage] = useState(1);
  const fetchedPages = useRef(new Set());

  const REPOS_PER_PAGE = 8;

  const lastRepoElement = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      });

      if (node) observer.current.observe(node);
    },
    [loadingNewRepos, hasMore]
  );

  const getRepos = async () => {
    if (fetchedPages.current.has(page) || !user?.preferred_username) return;

    try {
      if (page === 1) setLoading(true);
      else setLoadingNewRepos(true);

      fetchedPages.current.add(page);

      const response = await fetch(
        getReposURL(user.preferred_username, REPOS_PER_PAGE, page)
      );
      if (!response.ok) throw new Error("Failed to fetch repositories");

      const data = await response.json();

      if (data.length === 0) setHasMore(false);
      else setRepos((prev) => [...prev, ...data]);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      if (page === 1) setLoading(false);
      else setLoadingNewRepos(false);
    }
  };

  useEffect(() => {
    getRepos();
  }, [page]);

  return (
    <>
      {loading ? (
        <SkeletonLoading />
      ) : error ? (
        <p>Error: {error}</p>
      ) : repos.length > 0 ? (
        <>
          <Grid columns="2" gap="5">
            {repos.map((repo, index) =>
              repos.length === index + 1 ? (
                <div ref={lastRepoElement} key={repo.id}>
                  <h1>Ref element</h1>
                  <RepoCard repo={repo} key={repo.id} />
                </div>
              ) : (
                <RepoCard repo={repo} key={repo.id} />
              )
            )}
          </Grid>
          {loadingNewRepos && <SkeletonLoading />}
        </>
      ) : (
        <Flex mt={"9"} justify={"center"}>
          <Callout.Root color="gray" variant="soft" highContrast>
            <Callout.Icon>
              <GoInfo />
            </Callout.Icon>
            <Callout.Text>
              There are no repos in you account.{" "}
              <Link href="#">Create One</Link>
            </Callout.Text>
          </Callout.Root>
        </Flex>
      )}
    </>
  );
}

export default ReposGrid;

function SkeletonLoading() {
  return (
    <Grid my={"5"} columns="2" gap="5">
      <Skeleton>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora optio
          eius harum blanditiis? Modi voluptatem est repellendus. Ratione
          nesciunt sed culpa, amet reiciendis sit saepe unde hic dicta excepturi
          cupiditate exercitationem dolorum, optio accusantium non natus
          repellendus! Velit asperiores blanditiis reprehenderit mollitia dicta?
          Vero dolorem est ipsam excepturi sunt rem!
        </Text>
      </Skeleton>
      <Skeleton>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora optio
          eius harum blanditiis? Modi voluptatem est repellendus. Ratione
          nesciunt sed culpa, amet reiciendis sit saepe unde hic dicta excepturi
          cupiditate exercitationem dolorum, optio accusantium non natus
          repellendus! Velit asperiores blanditiis reprehenderit mollitia dicta?
          Vero dolorem est ipsam excepturi sunt rem!
        </Text>
      </Skeleton>
    </Grid>
  );
}
