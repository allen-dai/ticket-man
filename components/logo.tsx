import Link from "next/link";
import Image from "next/image";
import { Text, useColorModeValue } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
    font-weight: bold;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    height: 30px;
    line-height: 20px;
    padding: 10px;
`;

const Logo = () => {
    const logoImg = `/images/logo-${useColorModeValue("dark", "light")}.png`;
    return (
        <Link href="/">
            <a>
                <LogoBox>
                    <Image src={logoImg} width={20} height={20} alt="logo"/>
                    <Text mx={2}>Ticket Manager</Text>
                </LogoBox>
            </a>
        </Link>
    );
};

export default Logo;
