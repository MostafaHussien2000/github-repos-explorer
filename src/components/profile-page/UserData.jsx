import React, { useState } from "react";
import { Avatar, Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { useAuth } from "../../context/AuthContext";

function UserData() {
  const { user } = useAuth();

  return (
    <section id="user-data">
      <Flex
        align={"center"}
        gap="5"
        direction={{ initial: "column", xs: "row" }}
      >
        <Avatar
          src={user?.avatar_url}
          size="9"
          fallback={user?.preferred_username?.charAt(0)}
          radius="full"
        />
        <Box>
          <Heading>{user?.preferred_username}</Heading>
          <Flex gap="3" align={"center"}>
            <Box>
              <Text size="2" mr={"2"}>
                {user.states.followers}
              </Text>
              <Text size="2" color="gray">
                followers
              </Text>
            </Box>
            <Separator orientation={"vertical"} />
            <Box>
              <Text size="2" mr={"2"}>
                {user.states.following}
              </Text>
              <Text size="2" color="gray">
                following
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </section>
  );
}

export default UserData;
