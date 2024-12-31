import { Button, Flex, TextField } from "@radix-ui/themes";
import React from "react";
import { GoComment } from "react-icons/go";
import { Comments } from "../utils/comments";

function AddCommentForm({ repoId, setRepoComments }) {
  const commentSystem = new Comments();

  const handleAddComment = (e) => {
    e.preventDefault();
    const newComment = commentSystem.addComment(repoId, e.target[0].value);
    setRepoComments((list) => [...list, newComment]);
    e.target.reset();
  };

  return (
    <form onSubmit={handleAddComment}>
      <Flex my="4" gap="2" direction="row">
        <TextField.Root
          placeholder="Add new comment…"
          style={{ flexGrow: "1" }}
          required
        >
          <TextField.Slot>
            <GoComment height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button type="submit">Add Comment</Button>
      </Flex>
    </form>
  );
}

export default AddCommentForm;
