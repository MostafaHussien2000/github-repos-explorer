import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Flex, Separator, Spinner } from "@radix-ui/themes";
import AddCommentForm from "../components/repo-details-page/AddCommentForm";
import { Comments } from "../utils/comments";
import RepoInformation from "../components/repo-details-page/RepoInformation";
import RepoCommentsSection from "../components/repo-details-page/RepoCommentsSection";

function RepoDetails() {
  const { user } = useAuth();

  if (!user?.preferred_username) <Navigate to="/" />;

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

  return loading ? (
    <Flex height={"100vh"} width={"100vw"} justify={"center"} align={"center"}>
      <Spinner size={"3"} />
    </Flex>
  ) : (
    <main>
      <RepoInformation repo={repo} />
      <Separator my="6" size="4" />
      <AddCommentForm repoId={slug} setRepoComments={setRepoComments} />
      <RepoCommentsSection
        deleteComment={deleteComment}
        comments={repoComments}
      />
    </main>
  );
}

export default RepoDetails;
