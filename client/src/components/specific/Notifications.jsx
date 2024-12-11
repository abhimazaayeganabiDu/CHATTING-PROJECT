import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutations, useErrors } from '../../lib/hooks/hook';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api';
import { setIsNotification } from '../../redux/reducer/misc';


function Notifications() {
  const disPatch = useDispatch()

  const { isNotification } = useSelector((state) => state.misc)
  const { isLoading, data, error, isError } = useGetNotificationsQuery()
  const [acceptRequest] = useAsyncMutations(useAcceptFriendRequestMutation)

  const friendRequestHandler = async ({ _id, accept }) => {
    disPatch(setIsNotification(false))
    await acceptRequest("Accepting ...", { requestId: _id, accept })
  }

  const closeHandler = () => disPatch(setIsNotification(false))
  useErrors([{ error, isError }])


  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>

        <DialogTitle>
          Notifications
        </DialogTitle>

        {isLoading ? <Skeleton /> : <>
          {data?.allRequest?.length > 0 ? (
            data?.allRequest?.map((i) => <NotificationItem sender={i.sender} _id={i._id} handler={friendRequestHandler} key={i._id} />)
          )
            : (
              <Typography textAlign={"center"}>No notifications found!</Typography>
            )}
        </>}
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem

    >
      <Stack direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}

      >

        <Avatar />

        <Typography
          variant='body1'
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} send you a friend request`}
        </Typography>

        <Stack direction={{
          xs: "collumn",
          sm: "row"
        }}>
          <Button onClick={() => handler({ _id, accept: true })} >Accept</Button>
          <Button color='error' onClick={() => handler({ _id, accept: false })} >reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  )
})
export default Notifications