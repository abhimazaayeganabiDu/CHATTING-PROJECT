import React, { lazy, Suspense, useState } from 'react'
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { orange } from '../../constants/color'
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../constants/config'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userNOtExists } from '../../redux/reducer/auth'
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducer/misc'
import { resetNotificationCount } from '../../redux/reducer/chat'

const SearchDialog = lazy(() => import("../specific/Search"))
const NotificationDialog = lazy(() => import("../specific/Notifications"))
const NewGroupDialog = lazy(() => import("../specific/NewGroup"))

function Header() {

  const { isSearch, isNotification, isNewGroup  } = useSelector((state) => state.misc)
  const { notificationCount } = useSelector((state) => state.chat)


  const navigate = useNavigate()

  const disPatch = useDispatch()

  const handleMobile = () => {
    disPatch(setIsMobile(true))
  }

  const openSearch = () => { disPatch(setIsSearch(true)) }

  const openNewGroup = () => {
    disPatch(setIsNewGroup(true))
  }

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/users/logout`, {
        withCredentials: true
      })

      disPatch(userNOtExists())
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  const openNotification = () => {
    disPatch(setIsNotification(true))
    disPatch(resetNotificationCount())
  }

  const navigateToGroup = () => navigate("/groups")



  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>

        <AppBar position='static' sx={{
          bgcolor: orange
        }}>


          <Toolbar>


            <Typography
              variant='h6'
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            > Chat App
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color='inherit' onClick={handleMobile}>
                <MenuIcon />
              </IconButton>

            </Box>

            <Box
              sx={{
                flexGrow: 1,
              }} />


            <Box>

              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationIcon />}
                onClick={openNotification}
                value={notificationCount}
              />

            </Box>

          </Toolbar>


        </AppBar>

      </Box>

      {
        isSearch && (
          <Suspense fallback={<Backdrop open />}>
            <SearchDialog />
          </Suspense>
        )
      }


      {
        isNewGroup && (
          <Suspense fallback={<Backdrop open />}>
            <NewGroupDialog />
          </Suspense>
        )
      }


      {
        isNotification && (
          <Suspense fallback={<Backdrop open />}>
            <NotificationDialog />
          </Suspense>
        )
      }


    </>
  )
}

export default Header

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' size='large' onClick={onClick}>
        {value ? <Badge badgeContent = {value} color='error'> {icon}</Badge> : icon}
      </IconButton>
    </Tooltip >
  )
}