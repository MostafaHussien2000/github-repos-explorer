import React from "react";
import { Grid, Text } from "@radix-ui/themes";
import CommentCard from "./CommentCard";

function RepoCommentsSection({ comments, deleteComment }) {
  return (
    <>
      {comments.length > 0 ? (
        <Grid gap="4" mt="4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              deleteComment={deleteComment}
            />
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

export default RepoCommentsSection;
