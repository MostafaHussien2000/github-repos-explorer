import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
import { GoArrowLeft, GoRepoForked, GoStar } from "react-icons/go";
import { TbBrandGithub } from "react-icons/tb";
import { Link as ReactRouterLink } from "react-router-dom";
import LanguagesSection from "./LanguagesSection";

function RepoInformation({ repo }) {
  return (
    <>
      <header>
        <Flex align={"center"} justify={"between"} my={"5"}>
          <ReactRouterLink to={"/profile"}>
            <IconButton
              tabIndex={-1}
              variant="surface"
              style={{ cursor: "pointer" }}
            >
              <GoArrowLeft />
            </IconButton>
          </ReactRouterLink>
          <Link href={repo?.html_url} target="_blank">
            <IconButton
              tabIndex={-1}
              color="gray"
              variant="ghost"
              style={{ cursor: "pointer" }}
            >
              <TbBrandGithub size={"25"} />
            </IconButton>
          </Link>
        </Flex>

        <Flex gap="3" align="center" mb="2">
          <Avatar
            size="2"
            src={repo?.owner?.avatar_url}
            radius="full"
            fallback="T"
          />
          <Box>
            <Text as="div" size="2" color="gray">
              {repo?.owner?.login}
            </Text>
          </Box>
        </Flex>

        <Heading>{repo?.name}</Heading>

        <Flex my={"2"} gap={"2"}>
          <Badge variant="outline">
            <GoRepoForked />
            {repo.forks_count}
          </Badge>
          <Badge variant="outline" color="yellow">
            <GoStar />
            {repo.stargazers_count}
          </Badge>
        </Flex>
        <Separator my="6" size="4" />
        {repo.description ? (
          <Text size={"2"} className="desc">
            {repo.description}
          </Text>
        ) : (
          <Text size={"2"} className="no-desc" color="gray">
            There is no description for this repo.
          </Text>
        )}

        <LanguagesSection username={repo?.owner?.login} repo={repo?.name} />
      </header>
    </>
  );
}

export default RepoInformation;
