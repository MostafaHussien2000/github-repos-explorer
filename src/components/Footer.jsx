import { Flex, Link, Text } from "@radix-ui/themes";
import React from "react";

function Footer() {
  return (
    <footer>
      <Flex gap="5" wrap={"wrap"} justify={"center"} align={"center"}>
        <Text>© 2024 GitHub, Inc.</Text>
        <Link href="https://github.com/mostafahussien2000" target="_blank">
          My Github
        </Link>
      </Flex>
    </footer>
  );
}

export default Footer;
