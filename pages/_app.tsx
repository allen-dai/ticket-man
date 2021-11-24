import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Main from "../components/layout/main";
import theme from "../lib/theme";
import { useUserData, UserContext } from "../lib/firebaseHook";

const App = ({ Component, pageProps, router }: AppProps) => (
    <ChakraProvider theme={theme}>
        <UserContext.Provider value={useUserData()}>
            <Main router={router}>
                <Component {...pageProps} />
            </Main>
        </UserContext.Provider>
    </ChakraProvider>
);

export default App;
