
import React, { useContext, useState, useEffect } from 'react'
import { Box, Text, Divider, Icon, HStack, Badge, Avatar } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages, SET_ACTIVE_CHAT,UPDATE_CHAT_BADGE } from '../../redux/reducers/chat-reducer'
import gettime from '../../utils/getTime'

function MyChats({ setopenChatbox, name, chat, activeChat }) {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.currentUser)
  const date = "2/08/22"
  const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )

  const handleClick = () => {
    setopenChatbox(true);
    dispatch(SET_ACTIVE_CHAT({ chat: chat }));
    dispatch(fetchMessages({ chat_id: chat._id }))
    dispatch(UPDATE_CHAT_BADGE({chat_id:chat._id,badge:0}))
  }
  const sliceLatestmsg = (msg) => {
    return msg.slice(0, 24)
  }

  return (
    <>


      <Box cursor={"pointer"}
        onClick={() => { handleClick() }}
        backgroundColor={activeChat?._id === chat._id && "#635dff"}
        color={activeChat?._id === chat._id ? "white" : ""}
        _hover={{
          bgColor: activeChat?._id === chat._id ? "" : "guru.100",
          // boxShadow: "0px 0px 10px 0px #635dff",


        }}

        transition="background-color 0.2s,color 0.2s,box-shadow 0.3s"
        borderRadius="8px"
        justifyContent={"center"}
        alignItems={"center"} w={"100%"} h={"80px"} display={"flex"}>

        <Box w={"14%"}>
          {/* image box */}

          <Avatar
            // name={chat.isGroupChat? chat.chatName:chat.users[0].name} size={"md"} src={!chat.isGroupChat?chat.users[0].profileImage:""}
            name={name}
            size={"sm"}
          >

          </Avatar>
        </Box>
        <Box w={"79%"} >
          <Box>
            {/* date */}
            <Text fontSize={"14px"} textAlign={"right"}>
              {/* {
                      chat.latestMessage?
                      gettime(chat.latestMessage.createdAt):<Text visibility={"hidden"}>6:20 pm</Text>} */}
              { chat?.latestMessage ?  gettime(chat?.latestMessage?.createdAt):""}
            </Text>



          </Box>
          <Box>

            <HStack spacing={19}>
              <Box w="220px"> <Text fontSize={"20px"}>
                {name}
                {/* {chat.isGroupChat? chat.chatName:chat.users[0].name} */}
              </Text></Box>
              <Box   ><Badge px={"10px"} textAlign={"center"} borderRadius={"7px"} colorScheme='red'>
                {chat.badge>0?chat.badge:""}
                
              </Badge></Box>


            </HStack>

          </Box>
          <Box>
            <HStack mt={"5px"} spacing="1">
              <Box w="220px" > <Text fontStyle={"italic"}>

                {chat.latestMessage ? sliceLatestmsg(chat.latestMessage.messege) : "Start a conversion..."}
                {/* Start a conversion... */}
              </Text></Box>
              {/* {!chat.isGroupChat? <><CircleIcon boxSize="10px" color={onlineStatus==="Online"?'green.500':'red.500'} />
                        <Text fontSize={"12px"}>{onlineStatus}</Text></>:""} */}
              <><CircleIcon boxSize="10px"
                color={chat?.onlineStatus ?'green.500':'red.500'} 
                // color={'red.500'}
              />
                <Text fontSize={"12px"}>
                  {chat?.onlineStatus ? "Online" : "Offline"}
                </Text>
              </>
            </HStack>
          </Box>

        </Box>

      </Box>

      <Divider py={"2px"} />
    </>
  )
}

export default MyChats