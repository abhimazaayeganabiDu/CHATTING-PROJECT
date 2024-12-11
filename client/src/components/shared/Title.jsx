import React from 'react'
import {Helmet} from 'react-helmet-async'

function Title(
    {title = "Chat App" , description = "This is the chat app called (Name is not decided)"}
) {
  return (
   <Helmet>
    <title>{title}</title>
    <meta name='description' content={description }/>
   </Helmet>
  )
}

export default Title