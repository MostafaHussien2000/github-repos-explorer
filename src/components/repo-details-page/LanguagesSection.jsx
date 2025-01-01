import { Badge, Box, Flex, Spinner, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

function LanguagesSection({ url }) {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLanguages = async () => {
    console.log(url);
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);

      const data = await response.json();

      setLanguages(Object.keys(data));

      console.log(languages);
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

  if (!url) return <Text color="gray">Languages are not specified.</Text>;

  if (error) return <></>;

  return (
    <Box my={"4"}>
      <Flex gap={"2"} align={"center"}>
        <Text size={"2"}>Languages:</Text>
        {loading ? (
          <Spinner />
        ) : error || languages.length === 0 ? (
          <></>
        ) : (
          <Flex gap={"2"}>
            {languages.map((lang) => (
              <Badge variant="solid" color="gray" key={lang}>
                {lang}
              </Badge>
            ))}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default LanguagesSection;
