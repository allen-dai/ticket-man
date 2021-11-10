import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useState } from "react";
import {
  Heading,
  Container,
  Box,
  Grid,
  Button,
  Input,
  FormControl,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  //For checking if username is valid/open
  const [username, setUsername] = useState<string>();
  const [inValid, setInValid] = useState<boolean>(false);

  function registerWithEmailAndPassword(
    e: React.FormEvent<HTMLFormElement>
  ): void {
    setLoading(true);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email as string, password as string)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }
  return (
    <Container>
      <Box w="80%" m="auto">
        <form onSubmit={(e) => registerWithEmailAndPassword(e)}>
          <Grid gap={2} mt={100}>
            <Heading>Register</Heading>
            <Divider />

            <FormControl isRequired>
              <FormLabel p={0} m={0}>
                Email
              </FormLabel>
              <Input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                isInvalid={inValid}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel p={0} m={0}>
                Username
              </FormLabel>
              <Input
                placeholder="Username"
                type="text"
                isInvalid={inValid}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel p={0} m={0}>
                Password
              </FormLabel>
              <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </FormControl>

            <Button
              isLoading={loading}
              loadingText={"Logging In"}
              type="submit"
              w="100%"
              colorScheme="blue"
              variant="outline"
              my={2}
            >
              {" "}
              Register{" "}
            </Button>
          </Grid>
        </form>
        <Link href="/login">
          <a>Login </a>
        </Link>
        <ChevronRightIcon />
      </Box>
    </Container>
  );
};

export default Register;
