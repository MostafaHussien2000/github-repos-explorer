import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  Flex,
  Heading,
  Separator,
  Spinner,
  Text,
} from "@radix-ui/themes";
import AddCommentForm from "../components/repo-details-page/AddCommentForm";
import { Comments } from "../utils/comments";
import RepoInformation from "../components/repo-details-page/RepoInformation";
import RepoCommentsSection from "../components/repo-details-page/RepoCommentsSection";
import { getRepoDetailsURL } from "../utils/github-api";
import ErrorMessage from "../components/common/ErrorMessage";

function RepoDetails() {
  const { user } = useAuth();

  const { slug } = useParams();

  const [repo, setRepo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const commentsSystem = new Comments();
  const [repoComments, setRepoComments] = useState({});

  const deleteComment = (commentId) => {
    commentsSystem.deleteComment(slug, commentId);
    setRepoComments(commentsSystem.getComments(slug));
  };

  const getRepoDetails = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        getRepoDetailsURL(user.preferred_username, slug)
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

  if (error) return <ErrorMessage message={error} />;

  return loading ? (
    <Flex height={"100vh"} width={"100vw"} justify={"center"} align={"center"}>
      <Spinner size={"3"} />
    </Flex>
  ) : repo?.name ? (
    <main>
      <RepoInformation repo={repo} />
      <Separator my="6" size="4" />
      <AddCommentForm repoId={slug} setRepoComments={setRepoComments} />
      <RepoCommentsSection
        deleteComment={deleteComment}
        comments={repoComments}
      />
    </main>
  ) : (
    <Flex
      height={"100vh"}
      direction={"column"}
      justify={"center"}
      align={"center"}
      gap={"3"}
    >
      <Heading style={{ color: "var(--accent-11)" }}>
        This repo does not exit in your public repos.
      </Heading>
      <Text>
        You are trying to access repo that is not in your public repos. If it
        exists
      </Text>
      <Link mt="5" to="/profile">
        <Button>Go back to all repos</Button>
      </Link>
    </Flex>
  );
}

export default RepoDetails;
