import Head from "next/head";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { NextRouter } from "next/router";
import SideBar from "../sidebar";
import { useState } from "react";

type props = {
  children?: React.ReactNode;
  router: NextRouter;
};

const base = { sidebar: "drawer" as const, navButton: true };
const md = { sidebar: "sidebar" as const, navButton: false };

const Main = ({ children, router }: props) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const variant = useBreakpointValue({ base: base, lg: md });

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Eraplan</title>
      </Head>
      <Flex>
        <SideBar
          path={router.asPath}
          isOpen={isSidebarOpen}
          toggle={toggleSidebar}
          variant={
            variant?.sidebar === undefined
              ? ("sidebar" as const)
              : variant?.sidebar
          }
        />

        <Box ml={{ lg: "15em" }} width="100%">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Main;
