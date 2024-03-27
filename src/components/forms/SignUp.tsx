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

import { GitHubIcons } from "../icons/GitHubIcon";
import useRegister from "../../hooks/useRegister";

const schema = yup.object({
  username: yup.string().required("userName is required"),
  password: yup.string().required("password is required"),
  email: yup.string().email().required("email is required"),
  first_name: yup.string().required("first name is required").max(15),
  last_name: yup.string().required("last name is required").max(15),
});
// same the interface to detect data in typescript
type loginData = yup.InferType<typeof schema>;

const SignUp = () => {
  const { mutate: signUp, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<loginData> = (data) => {
    signUp(data);
  };
  return (
    <>
      <VStack spacing="6" as="form" onSubmit={handleSubmit(onSubmit)}>
        <HStack>
          <FormControl isInvalid={errors.first_name ? true : false}>
            <Input
              placeholder="enter your firstName"
              {...register("first_name")}
            />
            {errors.first_name ? (
              <FormErrorMessage>{errors.first_name.message}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isInvalid={errors.last_name ? true : false}>
            <Input
              placeholder="enter your lastName"
              {...register("last_name")}
            />
            {errors.last_name ? (
              <FormErrorMessage>{errors.last_name.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        </HStack>

        <FormControl isInvalid={errors.username ? true : false}>
          <Input placeholder="enter your username" {...register("username")} />
          {errors.username ? (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={errors.email ? true : false}>
          <Input
            type="email"
            placeholder="enter your email"
            {...register("email")}
          />
          {errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
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
          SignUp
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

export default SignUp;
