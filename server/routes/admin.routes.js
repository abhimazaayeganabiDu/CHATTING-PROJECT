import express from 'express';
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from '../controllers/admin.controller.js';
import { adminLoginValidator, validateHandler } from '../lib/validators.lib.js';
import { isAdminOnly } from '../middlewares/auth.middlewares.js';

const app = express.Router()

app.post("/verify",adminLoginValidator(),validateHandler, adminLogin)
app.get("/logout",adminLogout)

// Only Admin Can Access These Route

app.use(isAdminOnly)

app.get("/",getAdminData)                  

app.get("/users",allUsers)
app.get("/chats",allChats)
app.get("/messages",allMessages)

app.get("/stats",getDashboardStats)

export default app;