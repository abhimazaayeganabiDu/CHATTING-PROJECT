import express from 'express'
import { acceptFriendRequest, getMyFriends, getMyNotifications, getMyProfile, login, logout, register, searchUser, sendFriendRequest } from '../controllers/user.controllers.js'
import { acceptFriendRequestValidator, loginValidator, registerValidator, sendFriendRequestValidator, validateHandler } from '../lib/validators.lib.js'
import { isAuthenticated } from '../middlewares/auth.middlewares.js'
import { singleAvatar } from '../middlewares/multer.middlewares.js'


const app = express.Router()

app.post("/register",singleAvatar, registerValidator(), validateHandler, register)
app.post("/login", loginValidator(),validateHandler, login )

// After here user must be Logged in to access the routes
app.use(isAuthenticated)

app.get("/me",getMyProfile)
app.get("/logout",logout)
app.get("/search",searchUser)
app.put("/sendrequest",sendFriendRequestValidator(), validateHandler, sendFriendRequest)
app.put("/acceptrequest",acceptFriendRequestValidator(), validateHandler, acceptFriendRequest)
app.get("/notifications",getMyNotifications)

app.get("/friends",getMyFriends )


export default app;