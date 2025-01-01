import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  Card,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import React from "react";
import { Comments } from "../../utils/comments";
import { useAuth } from "../../context/AuthContext";
import { GoTrash } from "react-icons/go";
import { formatTimeAgo } from "../../utils/dateFormatter";

function CommentCard({ comment, deleteComment }) {
  const { user } = useAuth();

  return (
    <Card>
      <Flex gap="3" align="center" justify="between">
        <Flex gap="3" align="center">
          <Avatar size="3" src={user?.avatar_url} radius="full" fallback="T" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {user?.preferred_username}
            </Text>
            <Text as="div" size="2" color="gray">
              {formatTimeAgo(comment?.createdAt)}
            </Text>
          </Box>
        </Flex>
        <DeleteCommentButton
          commentId={comment.id}
          deleteComment={deleteComment}
        />
      </Flex>
      <Text as="p" my={"3"}>
        {comment.text}
      </Text>
    </Card>
  );
}

export default CommentCard;

function DeleteCommentButton({ commentId, deleteComment }) {
  const commentsSystem = new Comments();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton style={{ cursor: "pointer" }} variant="surface" color="red">
          <GoTrash />
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Comment</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? Do you want to delete this comment ?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              onClick={() => deleteComment(commentId)}
              variant="solid"
              color="red"
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
