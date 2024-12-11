import React from 'react'
import AdminLayout from '../../components/layout/Admin/AdminLayout'
import { Box, Container, Input, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import { DoughnutChart, LineChart } from '../../components/specific/Chart'

function DashBoard() {

  const Appbar = <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem"
    }}
  >
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
    >

      <AdminPanelSettingsIcon
        sx={{
          fontSize: "3rem"
        }}
      />

      <SearchField placeholder='Search ...' />

      <CurveButton> Search</CurveButton>

      <Box flexGrow={1} />

      <Typography>
        {moment().format('MMMM Do YYYY,h:mm:ss a')}
      </Typography>

      <NotificationsIcon />
    </Stack>
  </Paper>


  const Widgets = <Stack
    direction={{
      xs: "column",
      sm: "row"
    }}
    spacing={"2rem"}
    justifyContent="space-between"
    alignItems={"center"}
    margin={"2rem 0"}
  >
    <Widget
      title={"Users"}
      value={343}
      Icon={<PersonIcon />}
    />
    <Widget
      title={"Chats"}
      value={33}
      Icon={<GroupIcon />}
    />
    <Widget
      title={"Messages"}
      value={34}
      Icon={<MessageIcon />}
    />
  </Stack>

  return (
    <AdminLayout>
      <Container
        component={"main"}
      >
        {
          Appbar
        }


        <Stack
          direction={
            {
              xs: "column",
              lg: "row"
            }
          }
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch"
          }}
          sx={{
            gap: "2rem"
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              
              maxWidth: "66%",

            }}
          >
            <Typography
              margin={"2rem 0"}
              variant='h4'
            >
              Last Messages
            </Typography>

            <LineChart value={[1, 2, 33, 67, 27, 31]} />
          </Paper>


          <Paper
            elevation={3}
            sx={{
              padding: '1rem',
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              
              maxWidth: "34%",

            }}
          >
            <DoughnutChart
              labels={["Single Chats ", "Group Chats"]}
              value={[23, 55]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>


        {Widgets}


      </Container>
    </AdminLayout>
  )
}


const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "20rem"

    }}
  >
    <Stack
      alignItems={"center"}
      spacing={"1rem"}
    >
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid rgba(0,0,0,0.9)`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >{value}</Typography>
      <Stack>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
)


export default DashBoard