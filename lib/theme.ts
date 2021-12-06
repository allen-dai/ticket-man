import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode("#f0e7db", "#202023")(props),
        },
    }),

};

const components = {
    Divider: {
        baseStyle:{
            borderColor: mode("gray.700", "whiteAlpha.700")
        }
    }
}

const config = {
    initialColorMode: "dark",
    useSystemColorMode: true,
};

const theme = extendTheme({ config, styles, components });
export default theme;
