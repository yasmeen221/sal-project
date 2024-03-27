import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useProfileQuery from "../../hooks/useProfileQuery";
import useUpdateProfileMutation from "../../hooks/useProfileMutation";
const schema = yup.object().shape({
  first_name: yup.string().required("firstName  is required"),
  last_name: yup.string().required("lastName  is required"),
  bio: yup.string(),
  email: yup.string().email("Email must be valid"),
  phone: yup.string(),
  job: yup.string(),
});
type InfoType = yup.InferType<typeof schema>;
interface UserInfoFormProps {
  onClose: () => void;
}
const UserInfoForm = ({ onClose }: UserInfoFormProps) => {
  const { data: userProfileData } = useProfileQuery();
  const { mutate: updateProfile, isPending } =
    useUpdateProfileMutation(onClose);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InfoType>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: userProfileData?.data.first_name || "",
      last_name: userProfileData?.data.last_name || "",
      bio: userProfileData?.data.bio || "",
      email: userProfileData?.data.email || "",
      phone: userProfileData?.data.phone || "",
      job: userProfileData?.data.job || "",
    },
  });
  const onSubmit = (data: InfoType) => {
    updateProfile(data);
  };
  return (
    <>
      <SimpleGrid
        sx={{ input: { borderRadius: "lg", shadow: "sm" } }}
        columns={2}
        spacing="4"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={!!errors.first_name}>
          <FormLabel>FirstName</FormLabel>
          <Input {...register("first_name")} placeholder="enter firstname" />
          <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.last_name}>
          <FormLabel>LastName</FormLabel>
          <Input {...register("last_name")} placeholder="enter lastname" />
          <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>email</FormLabel>
          <Input
            type="email"
            {...register("email")}
            placeholder="enter email"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>phone</FormLabel>
          <Input {...register("phone")} placeholder="enter phone" />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.job}>
          <FormLabel>job</FormLabel>
          <Input {...register("job")} placeholder="enter job" />
          <FormErrorMessage>{errors.job?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.bio} gridColumn="span 2">
          <FormLabel>Bio</FormLabel>
          <Textarea {...register("bio")} placeholder="enter bio" />
          <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
        </FormControl>
        <HStack mt="4" gridColumn="span 2" justifyContent="center">
          <Button minW="150px" type="submit" isLoading={isPending}>
            Save
          </Button>
          <Button variant="outline" minW="150px" onClick={onClose}>
            Cancel
          </Button>
        </HStack>
      </SimpleGrid>
    </>
  );
};

export default UserInfoForm;
