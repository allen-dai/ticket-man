import { Box, Button, Avatar, Text, Flex, Center } from "@chakra-ui/react";
import { useUserContext } from "../lib/firebaseHook";

const ProfileFooter = () => {
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
      <Button
        onClick={() => {
          sign_out ? sign_out() : console.log("oops, something went wrong");
        }}
      >
        Sign out
      </Button>
    </Box>
  );
};

export default ProfileFooter;
