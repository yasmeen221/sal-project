import {
  Avatar,
  Button,
  Card,
  CardBody,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import useProfileQuery from "../hooks/useProfileQuery";
import UserInfoForm from "../components/forms/UserInfoForm";
import useUploadAvatarMutation from "../hooks/useUploadAvatarMutation";
import { useRef } from "react";
import { updateProfile } from "../hooks/useProfileMutation";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import Page from "../components/shared/page";

const ProfilePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: uploadAvatar, isPending } = useUploadAvatarMutation();
  const { data: profileData, isLoading } = useProfileQuery();
  // to select the avatar  file input when clicking on the button.
  const inputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  return (
    <>
      <Page docTitle="profile">
        <Card maxW="container.lg" mx="auto" mt="8" borderRadius="10px">
          <CardBody>
            <VStack textAlign="center">
              {isLoading ? (
                <ProfileSkeleton />
              ) : (
                <>
                  <HStack
                    alignItems="flex-start"
                    justifyContent="center"
                    // w="calc(50% + 64px)"
                    w="calc(50% + 48px)"
                    ms="auto"
                  >
                    <Avatar
                      opacity={isPending ? 0.5 : 1}
                      cursor="pointer"
                      src={profileData?.data.avatar}
                      size="xl"
                      onClick={() => {
                        inputRef.current?.click();
                      }}
                    />

                    {/* <profileInfoFormModel /> */}
                    <Button
                      onClick={onOpen}
                      ms="auto"
                      fontWeight="400"
                      variant="link"
                      _hover={{ textDecoration: "none" }}
                    >
                      Edit Profile
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose} size="xl">
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit Profile</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody py={5}>
                          <UserInfoForm onClose={onClose} />
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </HStack>
                  {profileData?.data.avatar && (
                    <HStack
                      sx={{ button: { height: "auto" } }}
                      mt="-5"
                      spacing="12"
                      mb="2"
                    >
                      <IconButton
                        aria-label="edit"
                        variant="unstyled"
                        icon={<EditIcon color="primary.500" />}
                        onClick={() => {
                          inputRef.current?.click();
                        }}
                      />
                      <IconButton
                        aria-label="delete"
                        variant="unstyled"
                        icon={<DeleteIcon color="red.500" />}
                        onClick={() => {
                          updateProfile({ avatar: "" })
                            //
                            .then(() => {
                              queryClient.invalidateQueries({
                                queryKey: ["profile"],
                              });
                            });
                        }}
                      />
                    </HStack>
                  )}
                  <input
                    ref={inputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        uploadAvatar(file);
                      }
                    }}
                  />
                  <Text color="#A1A2A3">@{profileData?.data.username}</Text>
                  <Text
                    as="h1"
                    lineHeight="1"
                    fontSize="3xl"
                    textTransform="capitalize"
                    fontWeight="500"
                  >
                    {profileData?.data.full_name}
                  </Text>
                  <Text color="#707070">{profileData?.data.job}</Text>

                  <Text maxW="55ch" color="#536471">
                    {profileData?.data.bio}
                  </Text>
                </>
              )}
            </VStack>
          </CardBody>
        </Card>
      </Page>
    </>
  );
};
const ProfileSkeleton = () => {
  return (
    <>
      {/* <Box padding="6" boxShadow="lg" bg="white"> */}
      <SkeletonCircle size="96px" />
      <SkeletonText noOfLines={1} w="10ch" />
      <SkeletonText my={2} noOfLines={1} w="20ch" skeletonHeight="10px" />
      <SkeletonText noOfLines={1} w="15ch" />
      <SkeletonText
        sx={{ div: { mx: "auto" } }}
        mt={2}
        noOfLines={2}
        w="55ch"
      />

      {/* </Box> */}
    </>
  );
};

export default ProfilePage;
