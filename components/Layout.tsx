import React, {FC, ReactNode} from 'react';
import {Container, Flex, Heading, IconButton, Spacer, useColorMode, VStack} from "@chakra-ui/react";
import {FaMoon, FaSun} from "react-icons/fa";
import {ToastContainer} from "react-toastify";
import {useRouter} from "next/router";

interface Props {
    children: ReactNode
}


const Layout = ({children}: Props) => {
    //next router
    const router=useRouter()

    // dark mode
    const {colorMode, toggleColorMode} = useColorMode();
    const isDark = colorMode === "dark";

    return (
        <Container w={"100%"} maxW={1440} marginX={"auto"} p={{md:5,base:2}}>
            <VStack >
                <Flex w="100%">
                    <Heading
                        size="md" fontWeight='semibold' cursor={"pointer"} color="cyan.400" onClick={()=>router.push("/")}>Quera</Heading>
                    <Spacer></Spacer>
                    <IconButton icon={isDark ? <FaSun/> : <FaMoon/>} isRound aria-label={"darkMode"}
                                onClick={toggleColorMode}></IconButton>
                </Flex>
                {children}
            </VStack>
            <ToastContainer position={"bottom-center"}/>
        </Container>

    );
};

export default Layout;