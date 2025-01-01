import { Badge, Box, Flex, Spinner, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { getRepoLanguagesURl } from "../../utils/github-api";

function LanguagesSection({ repo, username, url }) {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!repo || !username) return <></>;

  const getLanguages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(getRepoLanguagesURl(username, repo));

      const data = await response.json();

      setLanguages(Object.keys(data));
    } catch (err) {
      setError(err.message);
      console.error("Error fetching repo's languages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  if (error) return <>error</>;

  return (
    <Box my={"4"}>
      {loading ? (
        <Spinner />
      ) : error || languages?.length === 0 ? (
        <></>
      ) : (
        <Flex gap={"2"} align={"center"}>
          <Text size={"2"}>Languages:</Text>
          <Flex gap={"2"}>
            {languages?.map((lang) => (
              <Badge variant="solid" color="gray" key={lang}>
                {lang}
              </Badge>
            ))}
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

export default LanguagesSection;
