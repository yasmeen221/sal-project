import { Button } from "@chakra-ui/react";
import useProfileQuery from "../hooks/useProfileQuery";
import useLogout from "../hooks/useLogout";

const Home = () => {
  useProfileQuery();
  const { mutate: logout } = useLogout();
  return (
    <>
      <p>Home</p>
      <Button colorScheme="blue" onClick={() => logout()}>
        Logout
      </Button>
    </>
  );
};

export default Home;
