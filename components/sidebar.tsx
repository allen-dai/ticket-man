import {
  Box,
  SimpleGrid,
  Flex,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavItems from "./nav-item";
import ProfileFooter from "../components/footer";
import Logo from "../components/logo";
import ThemeToggleButton from "../components/theme-toggle-button";
import withAuth from "../components/withAuth";

type SidebarProps = {
  path: any;
  variant: "drawer" | "sidebar";
  isOpen: boolean;
  toggle: VoidFunction;
};

const SideBar = ({ path, variant, isOpen, toggle }: SidebarProps) => {
  const bg = useColorModeValue("#ffffff", "#161619");

  return variant === "sidebar" ? (
    <Flex
      pos="fixed"
      h="100vh"
      w="15em"
      bg={bg}
      py={3}
      px={5}
      left={0}
      top="0"
      flexDir="column"
    >
      <Logo />
      <Divider mb={5} />

      <ThemeToggleButton />

      <SimpleGrid column={1} spacing={2} my={2} mt={5}>
        <NavItems path={path} toggle={toggle} />
      </SimpleGrid>

      <Spacer />
      {withAuth(ProfileFooter)}
    </Flex>
  ) : (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={toggle}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Page</DrawerHeader>
          <Divider mb={5} />

          <DrawerBody>
            <ThemeToggleButton />
            <SimpleGrid column={1} spacing={2} mt={5}>
              <NavItems path={path} toggle={toggle} />
            </SimpleGrid>
          </DrawerBody>

          <DrawerFooter>
            <Box width="100%">{withAuth(ProfileFooter)}</Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box position="fixed" top={0} left={0} m={3}>
        <IconButton
          aria-label="Sidebar button"
          icon={<ChevronRightIcon />}
          onClick={toggle}
          mr={3}
        />
        <ThemeToggleButton />
      </Box>
    </>
  );
};
export default SideBar;
