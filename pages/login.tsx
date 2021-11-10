import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleAuthProvider } from "../lib/firebase";
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
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [googleL, setGoogleL] = useState<boolean>(false);

  const [inValid, setInValid] = useState<boolean>(false);

  const signInWithGoogle = (): void => {
    setGoogleL(true);
    signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setGoogleL(false);
        console.log(err);
      });
  };

  const signInWithEmail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email as string, password as string)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        setLoading(false);
        setInValid(true);
      });
  };

  return (
    <Container>
      <Box w="80%" m="auto">
        <form onSubmit={(e) => signInWithEmail(e)}>
          <Grid gap={2} mt={100}>
            <Heading>Login</Heading>
            <Divider />

            <FormControl isRequired>
              <FormLabel p={0} m={0}>
                Email
              </FormLabel>
              <Input
                type="email"
                placeholder="Email"
                isInvalid={inValid}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel p={0} m={0}>
                Password
              </FormLabel>
              <Input
                type="password"
                placeholder="Password"
                isInvalid={inValid}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </FormControl>

            <Button
              isLoading={loading}
              loadingText={"Logging In"}
              type="submit"
              w="100%"
              colorScheme="teal"
              mt={2}
            >
              Login
            </Button>
            <Button
              isLoading={googleL}
              loadingText={"Logging In"}
              onClick={signInWithGoogle}
              w="100%"
              colorScheme="facebook"
              color="black"
              mb={2}
            >
              Login with Google
            </Button>
          </Grid>
        </form>
        <Link href="/register">
          <a>Register </a>
        </Link>
        <ChevronRightIcon />
      </Box>
    </Container>
  );
};

export default Login;
