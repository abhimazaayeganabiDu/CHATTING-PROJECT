import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonth as CalendarIcon} from '@mui/icons-material'
import moment from 'moment'

function Profile() {
    return (
        <Stack
            spacing={"2rem"}
            direction={"column"}
            alignItems={"center"}
        ><Avatar
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    border: "5px solid white",
                    marginBottom: "1rem",
                }}
            />
            <ProfileCard
                heading={"Bio"}
                text={"Abe ja na kyu mara reha hai yaha pa"}
            />
            <ProfileCard
                heading={"Username"}
                text={"aditya_gupta1255"}
                Icon={<UsernameIcon/>}
            />
            <ProfileCard
                heading={"Name"}
                text={"Aditya Gupta"}
                Icon={<FaceIcon/>}
            />
            <ProfileCard
                heading={"Joined"}
                text={moment('2023-11-03T18:20:00.000Z').fromNow()}
                Icon={<CalendarIcon/>}
            />
        </Stack>
    )
}

const ProfileCard = ({text, Icon, heading}) =>(
    <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        color={"white"}
        textAlign={"center"}
    >
        {Icon && Icon}

        <Stack>
            <Typography variant='body1'> {text} </Typography>
            <Typography color={"gray"} variant='caption'> {heading} </Typography>
        </Stack>
    </Stack>

)

export default Profile