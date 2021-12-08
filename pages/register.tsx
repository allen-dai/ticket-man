import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { useState, useEffect, useCallback } from "react";
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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useUserContext } from "../lib/firebaseHook";
//@ts-ignore
import { debounce } from "debounce";

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    //For checking if username is valid/open
    const [username, setUsername] = useState<string>("");
    const [invalid, setInvalid] = useState<boolean>(false);
    const [invalidUsername, setInvalidUsername] = useState<boolean>(false);

    const { update_user } = useUserContext();

    function registerWithEmailAndPassword(
        e: React.FormEvent<HTMLFormElement>
    ): void {
        setLoading(true);
        e.preventDefault();
        if (username != "" && !invalidUsername) {
            createUserWithEmailAndPassword(
                auth,
                email as string,
                password as string
            )
                .then(async (userCred) => {
                    const uid = userCred.user.uid;
                    await setDoc(doc(db, "username", username), {
                        uid: uid,
                    });
                    //@ts-ignore auth.currentUser will not be null at this step
                    updateProfile(auth.currentUser, { displayName: username })
                        .then(() => {
                            update_user();
                            router.push("/");
                        })
                })
                .catch((err) => {
                    setInvalid(true);
                    setLoading(false);
                    console.log(err);
                });
        }
        setLoading(false);
    }

    useEffect(() => {
        checkUsername(username);
        if (username == "") {
            setInvalidUsername(false);
        }
    }, [username]);

    const checkUsername = useCallback(
        debounce(async (username: string) => {
            if (username.length >= 3 && username.length <= 15) {
                const docRef = doc(db, "username", username);
                const docSnap = await getDoc(docRef);
                setInvalidUsername(docSnap.exists());
            }
        }, 500),
        []
    );

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
                                borderColor="gray.400"
                                onChange={(e) =>
                                    setEmail(e.currentTarget.value)
                                }
                                isInvalid={invalid}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel p={0} m={0}>
                                Username
                            </FormLabel>
                            <Input
                                placeholder="Username"
                                type="text"
                                borderColor="gray.400"
                                isInvalid={invalidUsername}
                                onChange={(e) =>
                                    setUsername(e.currentTarget.value)
                                }
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel p={0} m={0}>
                                Password
                            </FormLabel>
                            <Input
                                placeholder="Password"
                                type="password"
                                borderColor="gray.400"
                                isInvalid={invalid}
                                onChange={(e) =>
                                    setPassword(e.currentTarget.value)
                                }
                            />
                        </FormControl>

                        <Button
                            isLoading={loading}
                            loadingText={"Registering"}
                            type="submit"
                            w="100%"
                            colorScheme="blue"
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
