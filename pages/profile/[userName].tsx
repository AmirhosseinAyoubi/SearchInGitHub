import React, {useEffect, useState} from 'react';
import {GetServerSideProps, NextPage} from "next";
import {useRouter} from "next/router";
import axiosInstance from "../../utiliy/axios";
import {notify} from "../../components/Toast";
import {background, Box, Container, Flex, Grid, GridItem, Image, Spacer, Text} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import {TriangleDownIcon, TriangleUpIcon} from "@chakra-ui/icons";
import ReactPaginate from 'react-paginate';
import styles from "../../styles/userName.module.scss"
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function UserName (props: any) {

    // destructuring props
    const {userRepoData, userInfoData, responseError} = props

    //get userName from route
    const router = useRouter()
    const {query: {userName}} = router

    //user info
    const [userInfo, setUserInfo] = useState<any>(null)

    //user's repositories list
    const [repositoriesList, setRepositoriesList] = useState<Array<object>>([])


    //pagination
    const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 6]);
    const [pageCount, setpageCount] = useState(0)
    let limit = 10;
    const handlePageClick = async (data: any) => {
        let currentPage = data.selected + 1
        router.push(`/profile/${userName}?page=${currentPage}`)
    };

    // sort table handler
    const [showDesc, setShowDesc] = useState(false)
    const tableSortHandler = () => {
        setShowDesc(!showDesc)
        setRepositoriesList([...repositoriesList.reverse()])
    }


    useEffect(() => {

        if (responseError) {
             notify("User not found", "error")
        } else {
            setUserInfo(userInfoData)
            setpageCount(Math.ceil(Number(userInfoData?.public_repos) / 6))
            setRepositoriesList(userRepoData)
        }
    }, [userInfoData, userRepoData, responseError])
    return (
        <Layout>
            {
                userInfo ?
                    <Container width={"100%"} maxW={"100%"} pt={"45px"}>
                        <Flex w={"100%"} gap={{lg:10,base:5}} alignItems={"center"} flexDir={{base:"column",md:"row"}}>
                            <Flex background={"rgba(118,96,130,0.36)"}
                                  flexDir={"column"}
                                  minH={"200px"}
                                  alignItems={"center"}
                                  p={5}
                                  borderRadius={16}
                                  gap={"16px"}
                            >
                                <Box>
                                    {userInfo?.avatar_url &&
                                        <Image rounded={"100%"} w={"100%"} maxW={"300px"} src={userInfo?.avatar_url}/>}
                                </Box>
                                <Flex flexDir={"column"} alignItems={"center"} gap={3} >
                                    <Box fontSize={{md:18,base:14}}>
                                        {userInfo?.name}
                                    </Box>
                                    <Box fontSize={{md:12,base:10}}>
                                        {userInfo?.bio}
                                    </Box>
                                </Flex>

                            </Flex>

                            <Grid background={"rgba(118,96,130,0.36)"}
                                  w={"100%"}
                                  minH={"200px"}
                                  p={{md:5,base:2}}
                                  borderRadius={16}
                                  gap={{md:5,base:2}}
                                  flexWrap={"wrap"}
                                  gridTemplateColumns={"1fr 1fr"}
                            >
                                <GridItem w={"100%"} background={"rgba(131,128,131,0.73)"} borderRadius={"25px"}
                                          maxH={"80px"}
                                          p={{md:3,base:2}}>
                                    <Flex alignItems={"center"} gap={{md:"24px",base:"8px"}} h={"100%"}>
                                        <Image rounded={"100%"} w={"100%"} maxW={"40px"} maxH={"40px"}
                                               src={"/follower(3).png"}/>
                                        Following: {userInfo?.following}
                                    </Flex>
                                </GridItem>
                                <GridItem w={"100%"} background={"rgba(131,128,131,0.73)"} borderRadius={"25px"}
                                          maxH={"80px"}
                                          p={3}>
                                    <Flex alignItems={"center"} gap={{md:"24px",base:"8px"}} h={"100%"}>
                                        <Image rounded={"100%"} w={"100%"} maxW={"40px"} maxH={"40px"}
                                               src={"/follower(4).png"}/>
                                        Followers: {userInfo?.followers}
                                    </Flex>
                                </GridItem>
                                <GridItem w={"100%"} background={"rgba(131,128,131,0.73)"} borderRadius={"25px"}
                                          maxH={"80px"}
                                          p={3}>
                                    <Flex alignItems={"center"} gap={{md:"24px",base:"8px"}} h={"100%"}>
                                        <Image rounded={"100%"} w={"100%"} maxW={"40px"} maxH={"40px"}
                                               src={"/placeholder.png"}/>
                                        Location: {userInfo?.location}
                                    </Flex>
                                </GridItem>
                                <GridItem w={"100%"} background={"rgba(131,128,131,0.73)"} borderRadius={"25px"}
                                          maxH={"80px"}
                                          p={3}>
                                    <Flex alignItems={"center"} gap={{md:"24px",base:"8px"}} h={"100%"}>
                                        <Image rounded={"100%"} w={"100%"} maxW={"40px"} maxH={"40px"}
                                               src={"/world.png"}/>
                                        Website: {userInfo?.blog}
                                    </Flex>
                                </GridItem>

                            </Grid>

                        </Flex>
                        <Box mt={"60px"}>
                            <Text fontSize={{base:"16px",sm:"20px"}}>Repositories</Text>
                            <Box mt={"20px"} gridTemplateColumns={"1fr 1fr"} borderWidth={1}
                                 borderColor={"rgba(131,128,131,0.73)"} borderRadius={8}>
                                <Grid gridTemplateColumns={"1fr 1fr"}>
                                    <GridItem minH={"48px"} p={{md:5,base:3}} borderBottomWidth={1}
                                              borderColor={"rgba(131,128,131,0.73)"}
                                              background={"rgba(121,118,121,0.73)"}
                                              borderRight={"1px solid rgba(131,128,131,0.73) "}>
                                        column1

                                        {showDesc ?
                                            <TriangleDownIcon cursor={"pointer"} ml={2} onClick={tableSortHandler}/> :
                                            <TriangleUpIcon cursor={"pointer"} ml={2} onClick={tableSortHandler}/>}


                                    </GridItem>
                                    <GridItem minH={"48px"} p={{md:5,base:3}} borderBottomWidth={1}
                                              borderColor={"rgba(131,128,131,0.73)"}
                                              background={"rgba(121,118,121,0.73)"}>
                                        column2

                                    </GridItem>
                                </Grid>
                                <Grid gridTemplateColumns={"1fr 1fr"}>
                                    {
                                        repositoriesList?.map((item: any, index: number) => {
                                            return (
                                                <GridItem minH={"48px"} p={{md:5,base:2}}  borderBottomWidth={1}
                                                          key={item?.id}
                                                          borderColor={"rgba(131,128,131,0.73)"}
                                                          borderRight={index % 2 == 0 ? "1px solid rgba(131,128,131,0.73) " : undefined}>
                                                    <Flex justifyContent={"space-between"} fontSize={{md:18,base:14}} >
                                                        {item?.name}
                                                        <Text fontSize={{md:12,base:10}} ml={5}>
                                                            last updated: {item?.updated_at?.split("T")[0]}
                                                        </Text>
                                                    </Flex>


                                                </GridItem>
                                            )
                                        })
                                    }
                                </Grid>
                            </Box>


                            <Box mb={{base:10,md:0}}>
                                <ReactPaginate
                                    previousLabel={"<<"}
                                    nextLabel={">>"}
                                    breakLabel={"..."}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName={styles.paginationJustifyContentCenter}
                                    pageClassName={styles.pageItem}
                                    activeClassName={styles.active}
                                />
                            </Box>

                        </Box>

                    </Container>
                    :
                    <SkeletonTheme baseColor="#755c7d" highlightColor="#948d96" duration={1} enableAnimation>
                        <Box w={"100%"} pt={"45px"} p={{md:5,base:2}}>
                            <Flex gap={"60px"} alignItems={"center"} flexDir={{base:"column",md:"row"}}>
                                <Box w={"100%"} maxW={"180px"}>
                                    <Skeleton height={250} width={"100%"} borderRadius={16}/>
                                </Box>
                                <Box w={"100%"} maxW={"100%"}>
                                    <Skeleton height={160} width={"100%"} borderRadius={16}/>
                                </Box>
                            </Flex>
                            <Box mt={"50px"}>
                                <Skeleton height={270} width={"100%"} borderRadius={16}/>
                            </Box>
                        </Box>
                    </SkeletonTheme>
            }


        </Layout>
    );
};


// get server side props methode for  build server-side rendering

export async function getServerSideProps(ctx: any) {
    //get userName & page number from route
    const {query: {userName, page}} = ctx
    let userRepo = {}
    let userInfo = {}
    let responseError = ""

    await axiosInstance.get(`users/${userName}`)
        .then(res => {
            userInfo = res.data
        })
        .catch(err => responseError = 'User not found')

    await axiosInstance.get(`users/${userName}/repos?sort=created&direction=desc&per_page=6&page=${page || 1}`)
        .then(res => {
            userRepo = res.data
        })
        .catch(err => console.log('error with user repositories'))

    return { props: { userRepoData: userRepo, userInfoData: userInfo, responseError } }
}
export default UserName;