import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp'
import { useDispatch } from 'react-redux';
import { useAvaliableFriendsQuery } from '../../redux/api/api';
import { useErrors } from '../../lib/hooks/hook';

function NewGroup() {
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvaliableFriendsQuery()

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([])

  console.log(data);
  

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
    // console.log(groupName.value,selectedMembers);
    
  }

  const closeHandler = () => {

  }


  return (
    <Dialog open onClose={closeHandler}>
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
          <Button varient=" text " color="error" size='large' >Cancel</Button>
          <Button variant="contained" size='large' onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup