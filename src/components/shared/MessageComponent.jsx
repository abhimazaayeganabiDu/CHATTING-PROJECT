import { Typography } from '@mui/material'
import React, { memo } from 'react'
import { lightBlue } from '../../constants/color'
import moment from 'moment'

function MessageComponent({message,user}) {
    const{sender,content,attachments = [],createdAt} = message

    const timeAgo = moment(createdAt).fromNow()

    const sameSender = sender?._id === user._id

  return (
    <div
        style={{
            alignSelf:sameSender?"flex-end":"flex-star",
            backgroundColor:"white",
            color:"black",
            borderRadius:"5px",
            padding:"0.5rem",
            width:"fit-content"

        }}
    >
    {
      !sameSender && <Typography color={lightBlue} fontWeight={"600"} variant='caption'> {sender.name}</Typography>
    }
    {
      content&& <Typography>{content}</Typography>
    }

    {
      attachments.length>0 && (
        attachments.map((i,index) =>{
          const url = i.url
          const file = "dfdf"
          return <Box
            key = {index}

          >
            <a href='' 
              target='_blank' 
              download
              style={{
                color:"black"
              }}
              />
          </Box>
        })
      )
    }

   <Typography variant='caption' color='text.secondary'>{timeAgo}</Typography> 
    </div>
  )
}

export default memo(MessageComponent)