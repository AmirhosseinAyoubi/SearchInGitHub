import type {NextPage} from 'next'
import {
  Button,
  Flex, Heading, IconButton,
  InputGroup,
  InputLeftElement, Spacer, useColorMode,
  VStack, Text
} from "@chakra-ui/react";
import {Input} from '@chakra-ui/react'
import {ChangeEvent, useState} from "react";
import styles from "../styles/index.module.scss"
import axiosInstance from "../utiliy/axios";
import {notify} from "../components/Toast";
import {ToastContainer} from "react-toastify";
import {useRouter} from "next/router";
import {FaSun, FaMoon, FaInstagram, FaGithub, FaLinkedin} from 'react-icons/fa'
import Layout from "../components/Layout";


const Home: NextPage = () => {

  //loading
  const[loading,setLoading]=useState<boolean>(false)

  // dark mode
  const {colorMode, toggleColorMode} = useColorMode();
  const isDark = colorMode === "dark";

  // next router
  const router = useRouter()

  // input value
  const [value, setValue] = useState<string>("")

  // input onChange handler
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  //send request to check user exist or not
  const checkUserExist = async () => {

    setLoading(true)     // set button loading true

    await axiosInstance.get(`users/${value?.replace(/ /g, "")}`)
        .then(res => {
          router.push(`profile/${res.data?.login}?page=1`)
        })
        .catch(err => {
          notify("User not found", "error")
        })
        .finally(()=>setLoading(false))
  }

  return (
      <Layout>
        <Flex flexDir={"column"} w={"100%"}  >
          <Text mt={70}  className={styles.gradientText} fontSize={{md:"65px",base:"40px"}}>Search for GitHub</Text>
          <Flex gap={5} mt={200} flexDir={{base:"column",md:"row"}} alignItems={{base:"center"}}>
            <Input placeholder='Username'
                   borderColor={"#9a21d9"}
                   size='lg' value={value}
                   onChange={(e) => onChangeHandler(e)}
                   onKeyPress={(e) => {
                       if (e.which == 13) {
                           checkUserExist()
                       }
                   }}/>
            <Button onClick={checkUserExist}
                    w={"100%"}
                    maxW={256}
                    isLoading={loading}
                    size={"lg"}
                    variant={"outline"}
                    borderColor='#9a21d9'
                    background={"#a65bcc"}
                    _focus={{
                      boxShadow:
                          '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                    }}
            >
              search
            </Button>
          </Flex>
        </Flex>


      </Layout>
  )
}

export default Home
