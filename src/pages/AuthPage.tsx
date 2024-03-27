import {
  Box,
  Center,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import log from "../assets/log.png";
import image from "../assets/image1.png";
import LoginForm from "../components/forms/LoginForm";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SignUp from "../components/forms/SignUp";
enum AuthForm {
  LOGIN,
  SIGNUP,
}

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabSearchQuery = searchParams.get("tab");
  const tabNumber = tabSearchQuery ? parseInt(tabSearchQuery) : AuthForm.LOGIN;
  const [tabIndex, setTabIndex] = useState<AuthForm>(tabNumber);

  const handleTabsChange = (index: AuthForm) => {
    setTabIndex(index);
    setSearchParams({ tab: index.toString() });
  };

  return (
    <>
      {/* <Flex
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        mx="auto"
        w="min(100%, 90vw)"
      > */}
      <Center minH="100vh" mx="auto" w="min(100%, 1200px)">
        <HStack
          // direction={{
          //   base: "column",
          //   md: "row",
          // }}
          flexGrow="1"
          spacing="0"
          borderRadius="8xl"
          // border="2px solid green"
          alignItems="stretch"
          boxShadow={{ base: 0, md: "lg" }}
        >
          <Box
            bgColor="#ebfbff"
            textAlign="center"
            flexGrow="1"
            borderTopLeftRadius={{ base: 0, md: "8xl" }}
            borderBottomLeftRadius="8xl"
            py="8"
          >
            <Image display="inline-block" src={log} alt="Logo" maxW="120" />
            <Tabs
              index={tabIndex}
              onChange={handleTabsChange}
              variant="solid-rounded-tabs"
              colorScheme="primary"
              as={VStack}
              maxW="sm"
              mx="auto"
            >
              <TabList display="flex" justifyContent="center" py="6">
                <Tab>Sign in</Tab>
                <Tab>Sign up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <LoginForm />
                </TabPanel>
                <TabPanel>
                  <SignUp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Box
            bg="white"
            alignItems="flex-end"
            justifyContent="center"
            w="48%"
            borderRadius="8xl"
            ms="-50px"
            display={{ base: "none", md: "flex" }}
          >
            <Image src={image} maxW="400" borderRadius="8xl" />
          </Box>
        </HStack>
        {/* </Flex> */}
      </Center>
    </>
  );
};

export default AuthPage;
