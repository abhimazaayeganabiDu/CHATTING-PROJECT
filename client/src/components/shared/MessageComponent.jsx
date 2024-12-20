import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import { lightBlue } from '../../constants/color'
import moment from 'moment'
import { fileFormat } from '../../lib/features'
import RenderAttachment from './RenderAttachment'
import {motion} from 'framer-motion'

function MessageComponent({ message, user }) {
  const { sender, content, attachments = [], createdAt } = message

  const timeAgo = moment(createdAt).fromNow()

  const sameSender = sender?._id === user?._id

  

  return (
    <motion.div
    initial={{opacity:0, x:"-100%"}}
    whileInView={{opacity:1, x:"0"}}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-star",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content"

      }}
    >
      {
        !sameSender && <Typography color={lightBlue} fontWeight={"600"} variant='caption'> {sender.name}</Typography>
      }
      {
        content && <Typography>{content}</Typography>
      }

      {
        attachments.length > 0 && (
          attachments.map((i, index) => {
            const url = i.url
            const file = fileFormat(url)
            {/* console.log(file); */}
            return <Box
              key={index}

            >
              <a href={url}
                target='_blank'
                download
                style={{
                  color: "black"
                }}
              >
                {RenderAttachment({ file ,url })}
              </a>
            </Box>
          })
        )
      }

      <Typography variant='caption' color='text.secondary'>{timeAgo}</Typography>
    </motion.div>
  )
}

export default memo(MessageComponent)