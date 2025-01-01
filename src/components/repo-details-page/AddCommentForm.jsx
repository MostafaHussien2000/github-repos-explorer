import { Button, Flex, TextField } from "@radix-ui/themes";
import React, { useEffect, useRef } from "react";
import { GoComment } from "react-icons/go";
import { Comments } from "../../utils/comments";

function AddCommentForm({ repoId, setRepoComments }) {
  const commentSystem = new Comments();

  const inputRef = useRef(null);

  const handleAddComment = (e) => {
    e.preventDefault();
    const newComment = commentSystem.addComment(repoId, e.target[0].value);
    setRepoComments((list) => [...list, newComment]);
    e.target.reset();
  };

  const listenToKeyboardShortcut = (e) => {
    if (e.code === "KeyC" && document.activeElement !== inputRef.current) {
      e.preventDefault();
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", listenToKeyboardShortcut);

    return () => {
      window.removeEventListener("keydown", listenToKeyboardShortcut);
    };
  }, []);

  return (
    <form onSubmit={handleAddComment}>
      <Flex my="4" gap="2" direction="row">
        <TextField.Root
          placeholder="Press ( C ) to start commenting ..."
          style={{ flexGrow: "1" }}
          required
          ref={inputRef}
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
