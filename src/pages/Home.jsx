import { Box, Button, Heading, Text } from "@radix-ui/themes";
import styles from "./Home.module.css";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

function Home() {
  const { user, signInWithGithub } = useAuth();

  if (user?.preferred_username) return <Navigate to="/profile" />;

  return (
    <main id="home-page" className={`${styles.home}`}>
      <header>
        <GithubIcon />
      </header>
      <section>
        <Heading size={9}>
          Welcome to the <span>GithubExplorer</span>
        </Heading>
        <Text as="p" align={"center"}>
          The best application to use for searching for github repos (Better
          than Github).
        </Text>
        <Box>
          {user?.preferred_username ? (
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <Button>Go to profile</Button>
            </Link>
          ) : (
            <Button onClick={signInWithGithub}>Login with Github</Button>
          )}
        </Box>
      </section>
    </main>
  );
}

export default Home;

const GithubIcon = () => {
  return (
    <svg
      width="59"
      height="44"
      viewBox="0 0 59 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Shape"
        d="M22.8748 30.3293C22.8748 32.724 21.535 36.6427 18.3638 36.6427C15.1925 36.6427 13.8527 32.724 13.8527 30.3293C13.8527 27.9346 15.1925 24.016 18.3638 24.016C21.535 24.016 22.8748 27.9346 22.8748 30.3293C22.8748 30.3293 22.8748 30.3293 22.8748 30.3293ZM59 24.543C59 28.1981 58.6067 32.0709 56.8489 35.4281C52.1904 44.2049 39.3825 43.9987 30.2129 43.9987C20.8958 43.9987 7.32581 44.3081 2.48291 35.4281C0.688354 32.1053 0 28.1981 0 24.543C0 19.7421 1.70856 15.2048 5.10101 11.5267C4.46185 9.71638 4.1546 7.81435 4.1546 5.93524C4.1546 3.47177 4.7569 2.23431 5.94916 0C11.5173 0 15.0818 1.03122 19.3225 4.12488C22.8871 3.33427 26.55 2.97908 30.2252 2.97908C33.5439 2.97908 36.8873 3.31136 40.1077 4.03321C44.2869 0.97393 47.8514 0 53.3582 0C54.5627 2.23431 55.1527 3.47177 55.1527 5.93524C55.1527 7.81435 54.8331 9.682 54.2062 11.458C57.5865 15.1704 59 19.7421 59 24.543C59 24.543 59 24.543 59 24.543ZM51.0965 30.3293C51.0965 25.2992 47.8146 20.865 42.0621 20.865C39.739 20.865 37.5142 21.2546 35.1788 21.5525C33.3473 21.816 31.5159 21.9191 29.6353 21.9191C27.7669 21.9191 25.9354 21.816 24.0917 21.5525C21.7932 21.2546 19.5438 20.865 17.2084 20.865C11.4559 20.865 8.17401 25.2992 8.17401 30.3293C8.17401 40.3894 18.0565 41.9362 26.6606 41.9362C26.6606 41.9362 32.5852 41.9362 32.5852 41.9362C41.2263 41.9362 51.0965 40.4009 51.0965 30.3293C51.0965 30.3293 51.0965 30.3293 51.0965 30.3293ZM40.9435 24.016C37.7723 24.016 36.4325 27.9346 36.4325 30.3293C36.4325 32.724 37.7723 36.6427 40.9435 36.6427C44.1148 36.6427 45.4546 32.724 45.4546 30.3293C45.4546 27.9346 44.1148 24.016 40.9435 24.016C40.9435 24.016 40.9435 24.016 40.9435 24.016Z"
        fill="#F1F6FC"
        strokeWidth="0"
        stroke="#F1F6FC"
      />
    </svg>
  );
};
