import React, { lazy, Suspense, useState } from 'react'
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { orange } from '../../constants/color'
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const SearchDialog = lazy(()=> import("../specific/Search"))
const NotificationDialog = lazy(()=> import ("../specific/Notifications"))
const NewGroupDialog = lazy(()=> import ("../specific/NewGroup"))

function Header() {

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const navigate = useNavigate()

  const handleMobile = () => {
    setIsMobile(prev => !prev)
  }

  const opopenSearch = () => {
    setIsSearch(prev => !prev)
  }

  const openNewGroup = () => {
    setIsNewGroup(prev => !prev)
  }

  const logoutHandler = () => {
  }

  const openNotification = () => {
    setIsNotification(prev => !prev)
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
                onClick={opopenSearch}
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
              />

            </Box>

          </Toolbar>


        </AppBar>

      </Box>

      {
        isSearch && (
          <Suspense fallback={<Backdrop open/>}>
            <SearchDialog />
          </Suspense>
        )
      }


      {
        isNewGroup && (
          <Suspense fallback={<Backdrop open/>}>
            <NewGroupDialog />
          </Suspense>
        )
      }


      {
        isNotification && (
          <Suspense fallback={<Backdrop open/>}>
            <NotificationDialog />
          </Suspense>
        )
      }


    </>
  )
}

export default Header

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' size='large' onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}