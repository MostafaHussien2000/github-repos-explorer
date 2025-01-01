import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Popover,
  Separator,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { GoComment, GoRepo, GoRepoForked, GoStar } from "react-icons/go";
import styles from "./RepoCard.module.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function RepoCard({ repo }) {
  return (
    <Card className={`${styles["repo-card"]}`}>
      <Flex justify="between" align="center">
        <Flex gap="4" align="center">
          <GoRepo />
          <Link to={`/repos/${repo.name}`}>{repo.name}</Link>
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
      <Grid columns={"2"} gap="3" className="action-btns" mt={"4"}>
        <CommentButton />
        <Button variant="surface" color="gray" style={{ cursor: "pointer" }}>
          <Link href={repo.html_url} target="_blank">
            View in Github
          </Link>
        </Button>
      </Grid>
    </Card>
  );
}

export default RepoCard;

function CommentButton() {
  const { user } = useAuth();

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">
          <GoComment />
          Comment
        </Button>
      </Popover.Trigger>
      <Popover.Content width="360px">
        <Flex gap="3">
          <Avatar size="2" src={user.avatar_url} fallback="A" radius="full" />
          <Box flexGrow="1">
            <TextArea
              required
              placeholder="Write a comment…"
              style={{ height: 80 }}
            />
            <Flex gap="3" mt="3" justify="between">
              <Popover.Close>
                <Button size="1">Comment</Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
