import React, { useState } from 'react'
import { Dialog, DialogTitle, InputAdornment, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import { useInputValidation } from "6pp"
import { Search as SearchIcon } from '@mui/icons-material'
import { List } from '@mui/material'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../../constants/sampleData'



function Search() {
  const [users, setUsers] = useState(sampleUsers)

  const search = useInputValidation("")
  let isLoadingSendFriendRequest = false;

  const addFriendHandler = (id) => {
    // setOpen(false); 
    console.log(id);

  }


  return (
    <Dialog
      open
    >
      <Stack p={"2rem"} direction={"column"} width={"30rem"}>

        <DialogTitle textAlign={"center"} >
          Find People
        </DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant='outlined'
          size='small'
          placeholder='Type here...'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem user={i} key={i._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
          ))}
        </List>

      </Stack>
    </Dialog>
  )
}

export default Search