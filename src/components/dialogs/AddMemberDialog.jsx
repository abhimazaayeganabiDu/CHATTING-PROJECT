import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutations, useErrors } from '../../lib/hooks/hook'
import { useAddGroupMembersMutation, useAvaliableFriendsQuery } from '../../redux/api/api'
import { setIsAddMember } from '../../redux/reducer/misc'
import UserItem from '../shared/UserItem'

function AddMemberDialog({ chatId }) {
    const dispatch = useDispatch()    
    const { isAddMember } = useSelector((state) => state.misc)
    const [addMembers, isLoadingAddMember] = useAsyncMutations(useAddGroupMembersMutation)
    const { isLoading, data, isError, error } = useAvaliableFriendsQuery(chatId)
    const [selectedMembers, setSelectedMembers] = useState([])


    const selectMemberHandler = (id) => {
        setSelectedMembers(prev => prev.includes(id)
            ? prev.filter((currentElement) => currentElement !== id)
            : [...prev, id])
    }
    const closeHandler = () => {
        dispatch(setIsAddMember(false))
    }
    const addMemberSubmitHandler = () => {
        addMembers("Adding Members ...", { members: selectedMembers, chatId })
        // console.log("i am here", selectedMembers);
        
        closeHandler()
    }
    useErrors([{ isError, error }])

    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={"2rem"} width={"20 rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
                <Stack spacing={"1rem"}>
                    {isLoading ? <Skeleton /> :
                        data?.friends?.length > 0 ? data?.friends?.map(i => (
                            <UserItem
                                key={i._id}
                                user={i}
                                handler={selectMemberHandler}
                                isAdded={selectedMembers.includes(i._id)}
                            />
                        ))
                            :
                            <Typography textAlign={"center"}>No Friends</Typography>
                    }
                </Stack>

                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
                    <Button color='error' onClick={closeHandler}>Cancel</Button>
                    <Button onClick={addMemberSubmitHandler} variant='contained' disabled={isLoadingAddMember}>Submit Changes</Button>
                </Stack>

            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog