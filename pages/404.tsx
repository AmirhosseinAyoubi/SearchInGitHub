import React from 'react';
import {Box, Container, Flex, Image} from "@chakra-ui/react";

const NotFound = () => {
    return (
        <Container w={"100%"} h={"100vh"}>
            <Flex w={"100%"} justifyContent={"center"} alignItems={"center"} h={"100%"}>


                <Image src={"/Frame1000004874.png"} alt={"404"} w={"100%"} maxW={"600px"}/>
            </Flex>

        </Container>
    );
};

export default NotFound;