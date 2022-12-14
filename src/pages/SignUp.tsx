import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const validation = {
  id: (value: string) => value.includes("@"),
  password: (value: string) => value.length >= 8,
};

type SignMode = "signUp" | "signIn";

function SignUp() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<SignMode>("signUp");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoading, isError, data, signIn, signUp, error } = useAuth();

  const isIdError = !!id && !validation["id"](id);
  const isPasswordError = !!password && !validation["password"](password);

  const isInValid = !!!id || !!!password || isIdError || isPasswordError;

  useEffect(() => {
    if (!data) {
      return;
    }
    navigate("/todo");
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isInValid) {
      return;
    }

    mode === "signUp" ? signUp({ email: id, password }) : signIn({ email: id, password });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "id") {
      setId(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const isSignUp = mode === "signUp";

  return (
    <Stack spacing={0} minH="100vh" display="flex" justifyContent="center">
      <Box>
        <HStack spacing={0} role={"tablist"}>
          <Button
            colorScheme={isSignUp ? "green" : "gray"}
            variant={isSignUp ? "solid" : "outline"}
            role={"tab"}
            borderBottomRadius={0}
            borderBottom={0}
            onClick={() => setMode("signUp")}
          >
            SignUp
          </Button>
          <Button
            colorScheme={!isSignUp ? "green" : "gray"}
            variant={!isSignUp ? "solid" : "outline"}
            role={"tab"}
            borderBottomRadius={0}
            borderBottom={0}
            onClick={() => setMode("signIn")}
          >
            SignIn
          </Button>
        </HStack>
        <Box width="100%" alignItems="center" justifyContent="center">
          <Box p="10" shadow="base">
            <form onSubmit={handleSubmit}>
              <Stack>
                <FormControl isInvalid={isIdError}>
                  <FormLabel>Id</FormLabel>
                  <Input type="email" name="id" value={id} onChange={handleChange} autoComplete="username" />

                  {isIdError && <FormErrorMessage>E-mail ????????? ????????? '@'??? ???????????? ?????????</FormErrorMessage>}
                </FormControl>

                <FormControl isInvalid={isPasswordError}>
                  <FormLabel>password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  {isPasswordError && <FormErrorMessage>Password??? 8?????? ??????????????? ?????????</FormErrorMessage>}
                </FormControl>

                {error && <Text color={"red.500"}>{error?.message || "somthing wrong"}</Text>}

                <Button colorScheme="green" disabled={isInValid} type="submit">
                  ???????????????
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

export default SignUp;
