import React, { useCallback, useEffect, useRef } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Drawer, Grid, Skeleton } from "@mui/material"
import Chatlist from '../specific/Chatlist'
import { sampleChats } from '../../constants/sampleData'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import { useMyChatsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducer/misc'
import { useErrors, useSocketEvents } from '../../lib/hooks/hook'
import { getSocket } from '../../socket'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from '../../constants/event'
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducer/chat'
import { getOrSaveFromStorage } from '../../lib/features'
import DeleteChatMenu from '../dialogs/DeleteChatMenu'

const AppLayout = () => WrappedComponent => {


    return (props) => {
        const params = useParams();
        const chatId = params.chatId;
        const deleteMenuAnchor = useRef(null)
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const { isMobile } = useSelector((state) => state.misc)
        const { user } = useSelector((state) => state.auth)
        const { newMessagesAlert } = useSelector((state) => state.chat)

        const socket = getSocket()

        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("")

        useErrors([{ isError, error }])

        useEffect(()=> {
            getOrSaveFromStorage({key:NEW_MESSAGE_ALERT, value: newMessagesAlert})
        },[newMessagesAlert])

        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true))
            dispatch(setSelectedDeleteChat({chatId, groupChat}))
            deleteMenuAnchor.current = e.currentTarget;
        }

        const handleMobileClose = () => dispatch(setIsMobile(false))

        const newMessageAlartHandler = useCallback((data) => {
            if (data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data))

        }, [chatId])

        const newRequestListener= useCallback(() => {
            dispatch(incrementNotification())
        }, [dispatch])

        const refetchListener = useCallback(() => {
            refetch()
            navigate("/")
        }, [refetch, navigate])

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlartHandler,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener
        }
        useSocketEvents(socket, eventHandlers)

        return (
            <>
                <Title />
                <Header />

                <DeleteChatMenu 
                dispatch={dispatch}
                    deleteMenuAnchor={deleteMenuAnchor}
                />

                {
                    isLoading ? <Skeleton /> : (
                        <Drawer
                            open={isMobile}
                            onClose={handleMobileClose}
                        >
                            <Chatlist
                                w='70vw'
                                chats={data?.chats}
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                                newMessagesAlert={newMessagesAlert}
                            />
                        </Drawer>
                    )
                }

                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid
                        item
                        sm={4}
                        md={3}
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        {isLoading ? (<Skeleton />) : (
                            <Chatlist
                                chats={data?.chats}
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                                newMessagesAlert={newMessagesAlert}
                            />
                        )}
                    </Grid>

                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}  >
                        <WrappedComponent  {...props} chatId={chatId} user={user} />
                    </Grid>

                    <Grid item
                        md={4}
                        lg={3}
                        height={"100%"}
                        bgcolor="primary.main"
                        sx={{
                            display: { xs: 'none', md: "block" },
                            padding: "2rem",
                            bgcolor: "rgba(0,0,0,0.85)"
                        }}
                    >
                        <Profile user={user} />
                    </Grid>

                </Grid>

                
            </>
        )
    }
}

export default AppLayout;