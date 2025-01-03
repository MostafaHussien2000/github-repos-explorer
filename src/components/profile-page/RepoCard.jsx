import React from "react";
import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Separator,
  Text,
  Link,
} from "@radix-ui/themes";
import { GoRepo, GoRepoForked, GoStar } from "react-icons/go";
import styles from "./RepoCard.module.css";
import { Link as ReactRouterLink } from "react-router-dom";

function RepoCard({ repo }) {
  console.log(repo.html_url);
  return (
    <Card className={`${styles["repo-card"]}`}>
      <Flex justify="between" align="center">
        <Flex gap="4" align="center">
          <GoRepo />
          <ReactRouterLink to={`/repos/${repo.name}`}>
            {repo.name}
          </ReactRouterLink>
        </Flex>
        <Flex gap={"2"}>
          <Badge variant="outline">
            <GoRepoForked />
            {repo.forks_count}
          </Badge>
          <Badge variant="outline" color="yellow">
            <GoStar />
            {repo.stargazers_count}
          </Badge>
        </Flex>
      </Flex>
      <Separator my="3" size="4" />
      {repo.description ? (
        <Text size={"2"} className="desc">
          {repo.description}
        </Text>
      ) : (
        <Text size={"2"} className="no-desc" style={{ opacity: 0.4 }}>
          There is no description for this repo.
        </Text>
      )}
      <Grid columns={"1"} gap="3" className="action-btns" mt={"4"}>
        <Link href={repo.html_url} target="_blank">
          <Button variant="surface" color="gray" style={{ cursor: "pointer" }}>
            View on Github
          </Button>
        </Link>
      </Grid>
    </Card>
  );
}

export default RepoCard;
