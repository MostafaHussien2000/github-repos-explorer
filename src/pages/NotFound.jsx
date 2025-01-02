import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function NotFound() {
  const { user } = useAuth();
  return (
    <Flex
      height={"100vh"}
      direction={"column"}
      justify={"center"}
      align={"center"}
      gap={"3"}
    >
      <Heading style={{ color: "var(--accent-11)" }}>
        Ooops! You lost your way in our small application.
      </Heading>
      <Text>
        You are trying to access a page that does not exist in our application
        yet.
      </Text>
      {user?.preferred_username ? (
        <Link mt="5" to="/profile">
          <Button>Navigate to your profile</Button>
        </Link>
      ) : (
        <Link mt="5" to="/">
          <Button>Back to home page</Button>
        </Link>
      )}
    </Flex>
  );
}

export default NotFound;
