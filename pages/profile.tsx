import WithAuth from "../components/withAuth";
import { useUserContext } from "../lib/firebaseHook";
import { updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";
import {
    Container,
    Box,
    SimpleGrid,
    Heading,
    Avatar,
    Text,
    Button,
    Flex,
    Spacer,
    Divider,
    Input,
    useToast,
} from "@chakra-ui/react"
import { useState, useEffect } from "react";

const Profile = () => {
    const { user, update_user } = useUserContext();
    const [displayName, setDisplayName] = useState<string>(user.displayName);
    const [email, setEmail] = useState<string>(user.email);
    const [disableSubmit, setDisableSumbit] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    function onSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        //@ts-ignore
        updateProfile(auth.currentUser, { displayName: displayName })
            .then(() => {
                toast({
                    title: "Profile Successfully Updated",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                })
                update_user();
                setLoading(false);
            })
            .catch( (err)=>{
                console.log(err);
                setLoading(false);

            });
    }

    useEffect(() => {
        if (displayName && email) {
            if (displayName == user.displayName && email == user.email) {
                setDisableSumbit(true);
            }
            else {
                setDisableSumbit(false);
            }
        }
    }, [displayName, user.displayName])


    return (
        <Container maxW="container.md" mt={20}>
            <Box>
                <Heading>Profile</Heading>
                <Divider />
                <form onSubmit={onSubmit}>

                    <SimpleGrid my={2} columns={2} alignItems="center">
                        <Avatar src={user.photoURL} my={2} />
                        <Box>
                            <Button size="sm">
                                Update Icon
                            </Button>
                        </Box>
                    </SimpleGrid>

                    <SimpleGrid my={2} columns={2}>
                        <Text fontWeight="bold">Email</Text>
                        <Input borderColor="gray.600" pl={5} value={email} onChange={(e) => { setEmail(e.currentTarget.value) }} isDisabled />
                    </SimpleGrid>

                    <SimpleGrid my={2} columns={2}>
                        <Text fontWeight="bold">Display Name / Username</Text>
                        <Input borderColor="gray.600" pl={5} value={displayName} onChange={(e) => { setDisplayName(e.currentTarget.value) }} />
                    </SimpleGrid>

                    <Flex mt={5}>
                        <Spacer />
                        <Button type="submit" size="sm" colorScheme="blue" disabled={disableSubmit} isLoading={loading}>
                            Save
                        </Button>
                    </Flex>
                </form>

            </Box>
        </Container>
    )
}

export default WithAuth(Profile);
