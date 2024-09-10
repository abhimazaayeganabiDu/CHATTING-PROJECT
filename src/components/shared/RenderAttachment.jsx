import React from 'react'
import { transformImage } from '../../lib/features';
import { FileOpen as FileOpenIcon } from '@mui/icons-material';

function RenderAttachment({ file, url }) {
    // console.log(url);
    switch (file) {
        case "video":
            return(<video src={url} preload='none' width={"200px"} controls />)
            
            case "image":
                return(<img
                src={transformImage(url,200)}
                alt='attachments'
                height={"150px"}
                width={"200px"}
                style={{
                    objectFit:"contain"
                }}
            />)
            
            case "audio":
                return(<audio src={url} preload='none' controls />)

        default:
            return (<FileOpenIcon/>)
    }

}

export default RenderAttachment