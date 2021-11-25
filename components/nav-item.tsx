import NextLink from "next/link";
import { Link, useColorModeValue } from "@chakra-ui/react";
import { useUserContext } from ".././lib/firebaseHook";

type LinkItemProps = {
    href: string;
    path: string;
    onClick: VoidFunction;
    children: React.ReactNode;
};

const LinkItem = ({ href, path, onClick, children }: LinkItemProps) => {
    const active = path === href; // if path =  curr path(active)
    const activeColor = useColorModeValue("whiteAlpha.800", "gray.900");
    const inactiveColor = useColorModeValue("gray.800", "whiteAlpha.900");
    return (
        <NextLink href={href}>
            <Link
                p={2}
                bg={active ? inactiveColor : undefined}
                color={active ? activeColor : inactiveColor}
                borderRadius="lg"
                onClick={onClick}
            >
                {children}
            </Link>
        </NextLink>
    );
};

type NavProps = {
    toggle: VoidFunction;
    path: string;
};

const NavItems = ({ toggle, path }: NavProps) => {
    const { user } = useUserContext();
    return user ? (
        <>
            <LinkItem path={path} href="/" onClick={toggle}>
                Dashboard
            </LinkItem>
            <LinkItem path={path} href="/tickets" onClick={toggle}>
                Tickets
            </LinkItem>
            <LinkItem path={path} href="/createticket" onClick={toggle}>
                Create Ticket
            </LinkItem>
        </>
    ) : (
        <>
            <LinkItem path={path} href="/login" onClick={toggle}>
                Login
            </LinkItem>
            <LinkItem path={path} href="/register" onClick={toggle}>
                Register
            </LinkItem>
        </>
    );
};

export default NavItems;
