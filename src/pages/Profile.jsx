import React from "react";
import styles from "./Repositories.module.css";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useAuth } from "../context/AuthContext";
import ReposGrid from "../components/profile-page/ReposGrid";
import UserData from "../components/profile-page/UserData";

function Profile() {
  const { user, signout } = useAuth();

  return (
    <main id="repositories-page" className={`${styles.repositories}`}>
      <header>
        <Flex gap="5" justify={"between"}>
          <Flex as="header" gap="5" align="center">
            <Avatar
              src={user?.avatar_url}
              size="2"
              fallback={user?.preferred_username?.charAt(0)}
            />
            <Text size="3">{user?.preferred_username}</Text>
          </Flex>
          <Button variant="outline" color="red" onClick={signout}>
            Logout
          </Button>
        </Flex>
      </header>
      <UserData />
      <Separator my={"8"} size={"4"} />
      <section>
        <Heading size={9}>
          Welcome back <span>{user?.preferred_username}</span>
        </Heading>
        <Text as="p" mb={"5"}>
          {user.states.repos_count > 0 ? (
            <>These are all {user.states.repos_count} repos in your account.</>
          ) : (
            <>You have no repos is you account</>
          )}
        </Text>
      </section>
      <ReposGrid />
    </main>
  );
}

export default Profile;
