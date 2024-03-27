import {
  Avatar,
  Box,
  Container,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  IconButton,
  Button,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import logoImage from "../assets/log.png";
import { ArrowForwardIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import HomeIcon from "./icons/HomeIcon";
import RingIcon from "./icons/RingIcon";
import NotifiIcon from "./icons/NotifiIcon";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import useLogout from "../hooks/useLogout";
import useProfileQuery from "../hooks/useProfileQuery";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <Box as="header" bg="primary.500">
        <Container
          minH="4rem"
          maxW="container.xl"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack spacing="4" mr="4" minW="70px">
            <Image w="40px" src={logoImage} filter="invert(100%)" />
            <Text
              display={{ base: "none", md: "block" }}
              color="white"
              fontSize="lg"
              fontWeight="300"
            >
              any Questions
            </Text>
          </HStack>
          <SearchForm showSearch={showSearch} setShowSearch={setShowSearch} />
          {!showSearch && <NavList />}
        </Container>
      </Box>
    </>
  );
};

interface SearchFormProps {
  setShowSearch: (ShowSearch: boolean) => void;
  showSearch: boolean;
}
const SearchForm = ({ showSearch, setShowSearch }: SearchFormProps) => {
  const [isMd] = useMediaQuery("(min-width:48em)");

  return (
    <>
      {!isMd && (
        <IconButton
          flexGrow="1"
          justifyContent="flex-end"
          me="4"
          minW="auto"
          w="24px"
          fontSize="2xl"
          aria-label="Search Icon"
          icon={showSearch ? <ArrowForwardIcon /> : <SearchIcon />}
          onClick={() => setShowSearch(!showSearch)}
        />
      )}
      <Box
        as="form"
        maxW="400px"
        flexGrow="1"
        display={{ base: showSearch ? "block" : "none", md: "block" }}
      >
        <InputGroup>
          <InputLeftElement left="12px" pointerEvents="none">
            <Search2Icon color="#536471" />
          </InputLeftElement>
          <Input
            pl="14"
            _placeholder={{ color: "#536471" }}
            placeholder="Search"
            bg="rgba(255,255,255,.8)"
            shadow="0.9"
          />
        </InputGroup>
      </Box>
    </>
  );
};
const NavList = () => {
  const { mutate: logout } = useLogout();
  const { data: profileData } = useProfileQuery();
  console.log(profileData);
  return (
    <HStack spacing={4}>
      <Button minW="auto" variant="link" as={RouterLink} to="/">
        <HomeIcon color="white" fontSize="2xl" />
      </Button>
      <IconButton
        minW="auto"
        fontSize="2xl"
        colorScheme="white"
        aria-label="Notification"
        icon={<RingIcon />}
      />
      <IconButton
        minW="auto"
        fontSize="2xl"
        colorScheme="white"
        aria-label="Notification"
        icon={<NotifiIcon />}
      />
      <Menu>
        <MenuButton as={Button} variant="link" minWidth="auto">
          <Avatar
            name={profileData?.data.full_name}
            size="sm"
            src={profileData?.data.avatar}
          />
        </MenuButton>
        <MenuList>
          <MenuItem as={RouterLink} to="/profile">
            show profile
          </MenuItem>
          <MenuDivider />
          <MenuItem color="red.500" onClick={() => logout()}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
// const profileMenu = () => {
//   return (
//     <Menu>
//       <MenuButton as={Button}>
//         <Avatar name="Yasmeen" src="https://bit.ly/dan-abramov" />
//       </MenuButton>
//       <MenuList>
//         <MenuItem>show profile</MenuItem>
//         <MenuItem>logout</MenuItem>
//       </MenuList>
//     </Menu>
//   );
// };
export default Header;
