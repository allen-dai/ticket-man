import { Box, Button, Avatar, Text, Flex, Center } from "@chakra-ui/react";
import { useUserContext } from "../lib/firebaseHook";
import Link from "next/link";

const ProfileFooter = ({toggle}:any) => {
    const { user, sign_out } = useUserContext();
    return (
        <Box display={user ? "flex" : "none"} flexDir="column">
            <Flex>
                <Avatar src={user.photoURL} m={2} />
                <Center>
                    <Text fontSize="xl">
                        {user.displayName ? user.displayName : "No username"}
                    </Text>
                </Center>
            </Flex>

            <Link href="/profile">
                <Button
                    mb={2}
                    onClick={toggle}
                >
                    Profile
                </Button>
            </Link>

            <Button
                colorScheme="blue"
                onClick={() => {
                    sign_out
                        ? sign_out()
                        : console.log("oops, something went wrong");
                }}
            >
                Sign out
            </Button>
        </Box>
    );
};

export default ProfileFooter;
