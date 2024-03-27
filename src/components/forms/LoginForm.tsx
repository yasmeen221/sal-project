import {
  Text,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import useLogin from "../../hooks/useLogin";
import { GitHubIcons } from "../icons/GitHubIcon";

const schema = yup.object({
  username: yup.string().required("userName is required"),
  password: yup.string().required("password is required"),
});
// same the interface to detect data in typescript
type loginData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<loginData> = (data) => {
    // console.log(data);
    login(data);
  };
  return (
    <>
      <VStack
        spacing="6"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        minH="408px"
      >
        <FormControl isInvalid={errors.username ? true : false}>
          <Input placeholder="enter your username" {...register("username")} />
          {errors.username ? (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={errors.password ? true : false}>
          <Input
            placeholder="enter  your password"
            type="password"
            {...register("password")}
          />
          {errors.password ? (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <Button type="submit" isLoading={isPending}>
          LogIn
        </Button>
        <HStack w="80%">
          <Divider borderColor="#A1A2A3" />
          <Text>Or</Text>
          <Divider borderColor="#A1A2A3" />
        </HStack>
        <Button
          leftIcon={<GitHubIcons fontSize="2xl" />}
          iconSpacing="4"
          bgColor="black"
          _hover={{ opacity: "0.8" }}
        >
          Sign Up with GitGub
        </Button>
      </VStack>
    </>
  );
};

export default LoginForm;
