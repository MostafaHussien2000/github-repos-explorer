import React from "react";
import styles from "./Repositories.module.css";
import { Avatar, Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useAuth } from "../context/AuthContext";

function Repositories() {
  const { user, signout } = useAuth();
  console.log(user);
  return (
    <main id="repositories-page" className={`${styles.repositories}`}>
      <header>
        <Flex gap="5" justify={"between"}>
          <Flex as="header" gap="5" align="center">
            <Avatar src={user.avatar_url} size="2" />
            <Text size="3">{user.preferred_username}</Text>
          </Flex>
          <Button variant="outline" color="red" onClick={signout}>
            Logout
          </Button>
        </Flex>
      </header>
      <section>
        <Heading size={9}>
          Welcome back <span>{user.preferred_username}</span>
        </Heading>
      </section>
    </main>
  );
}

export default Repositories;
