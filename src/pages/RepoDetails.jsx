import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Badge,
  Code,
  DataList,
  Flex,
  Grid,
  Heading,
  IconButton,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
import { GoCopy, GoRepoForked, GoStar } from "react-icons/go";
import AddCommentForm from "../components/AddCommentForm";
import { Comments } from "../utils/comments";
import CommentCard from "../components/CommentCard";

function RepoDetails() {
  const { user } = useAuth();

  if (!user?.preferred_username) <Navigate to="/" />;

  const { slug } = useParams();

  const [repo, setRepo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const commentsSystem = new Comments();
  const [repoComments, setRepoComments] = useState({});

  const getRepoDetails = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.github.com/repos/${user.preferred_username}/${slug}`
      );

      const data = await response.json();
      setRepo(data);

      setRepoComments(commentsSystem.getComments(slug));
    } catch (err) {
      setError(err.message);
      console.error("Error Fetching Repo Data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRepoDetails();
  }, []);

  return (
    <main>
      <InfoAboutRepo repo={repo} user={user} />
      <Separator my="6" size="4" />
      <AddCommentForm repoId={slug} setRepoComments={setRepoComments} />
      <RepoComments slug={slug} comments={repoComments} />
    </main>
  );
}

export default RepoDetails;

function InfoAboutRepo({ user, repo }) {
  return (
    <>
      <Heading>{repo?.name}</Heading>
      <Text>
        By: <Link href={user?.html_url}>@{user?.preferred_username}</Link>
      </Text>
      <Flex gap={"2"}>
        <Badge variant="outline">
          <GoRepoForked />
          {repo?.forks_count}
        </Badge>
        <Badge variant="outline" color="yellow">
          <GoStar />
          {repo?.stargazers_count}
        </Badge>
      </Flex>
      <DataList.Root>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Status</DataList.Label>
          <DataList.Value>
            <Badge color="jade" variant="soft" radius="full">
              Authorized
            </Badge>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">ID</DataList.Label>
          <DataList.Value>
            <Flex align="center" gap="2">
              <Code variant="ghost">u_2J89JSA4GJ</Code>
              <IconButton
                size="1"
                aria-label="Copy value"
                color="gray"
                variant="ghost"
              >
                <GoCopy />
              </IconButton>
            </Flex>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Name</DataList.Label>
          <DataList.Value>Vlad Moroz</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Email</DataList.Label>
          <DataList.Value>
            <Link href="mailto:vlad@workos.com">vlad@workos.com</Link>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Company</DataList.Label>
          <DataList.Value>
            <Link target="_blank" href="https://workos.com">
              WorkOS
            </Link>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </>
  );
}

function RepoComments({ comments }) {
  return (
    <>
      {comments.length > 0 ? (
        <Grid gap="4" mt="4">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </Grid>
      ) : (
        <center>
          <Text mt="8" as="p" color="gray">
            There are no comments for this repo.
          </Text>
        </center>
      )}
    </>
  );
}
