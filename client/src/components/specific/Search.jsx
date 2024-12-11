import { useInputValidation } from "6pp"
import { Search as SearchIcon } from '@mui/icons-material'
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api'
import { setIsSearch } from '../../redux/reducer/misc'
import UserItem from '../shared/UserItem'
import toast from "react-hot-toast"
import { useAsyncMutations } from "../../lib/hooks/hook"



function Search() {
  const [users, setUsers] = useState([])
  const { isSearch } = useSelector((state) => state.misc)

  const [searchUser] = useLazySearchUserQuery()
  const [sendFriendRequest,isLoadingSendFriendRequest] = useAsyncMutations(useSendFriendRequestMutation)

  const dispatch = useDispatch()

  const search = useInputValidation("")

  const addFriendHandler = async (id) => {
  await sendFriendRequest("Sending friend request...",{userId: id})
  }

  const searchCloseHandler = () => dispatch(setIsSearch(false))


  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e))
    }, 500)

    return () => {
      clearTimeout(timeOutId)
    }

  }, [search.value])



  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
    >
      <Stack p={"2rem"} direction={"column"} width={"30rem"} overflow={"auto"}>

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