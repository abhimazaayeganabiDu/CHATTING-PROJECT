import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp'
import { useDispatch, useSelector } from 'react-redux';
import { useAvaliableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutations, useErrors } from '../../lib/hooks/hook';
import {setIsNewGroup} from '../../redux/reducer/misc'
import toast from 'react-hot-toast';

function NewGroup() {
  const dispatch = useDispatch();

  const {isNewGroup} = useSelector(state => state.misc)
  const { isError, isLoading, error, data } = useAvaliableFriendsQuery()
  const [newGroup, newGroupLoading  ] = useAsyncMutations(useNewGroupMutation)
  const groupName = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([])
  const errors = [{
    isError,
    error
  }]
  useErrors(errors)

  const selectMemberHandler = (id) => {
    setSelectedMembers(prev => prev.includes(id)
      ? prev.filter((currentElement) => currentElement !== id)
      : [...prev, id])
  }

  const submitHandler = () => {
    if(!groupName.value) return toast.error("Group name is required")
    if(selectedMembers.length < 2) return toast.error("Please select atleast 3 members ")
      newGroup("Creating New Group ...",{name:groupName.value, members:selectedMembers})
    closeHandler()
    
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }


  return (
    <Dialog onClose={closeHandler} open = {isNewGroup}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>

        <DialogTitle textAlign={"center"} variant='h4'>
          New Group
        </DialogTitle>

        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />

        <Typography variant='body1'> Members</Typography>

        <Stack>
          {isLoading ? (<Skeleton />) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            )))}
        </Stack>

        <Stack direction={"row"} justifyContent={'space-evenly'}>
          <Button varient=" text " color="error" size='large' onClick={closeHandler} >Cancel</Button>
          <Button variant="contained" size='large' onClick={submitHandler} disabled = {newGroupLoading}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup