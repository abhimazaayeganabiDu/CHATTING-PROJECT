import express from 'express';
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroup, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from '../controllers/chat.controllers.js';
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentValidator, validateHandler } from '../lib/validators.lib.js';
import { isAuthenticated } from '../middlewares/auth.middlewares.js';
import { attachmentsMulter } from '../middlewares/multer.middlewares.js';

const app = express.Router();
app.use(isAuthenticated)

app.post("/new", newGroupValidator(), validateHandler, newGroupChat)
app.get("/my", getMyChats)
app.get("/my/groups", getMyGroup)

app.put("/addmembers", addMemberValidator(), validateHandler, addMembers)
app.put("/removemember", removeMemberValidator(), validateHandler, removeMembers)
app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup)

// Send Attachments 
app.post("/messages", attachmentsMulter, sendAttachmentValidator(), validateHandler, sendAttachments)

// Get Messages

app.get("/message/:id", chatIdValidator(), validateHandler, getMessages)

// Get Chat Details, rename, delete
app.route("/:id")
    .get(chatIdValidator(), validateHandler, getChatDetails)
    .put(renameValidator(), validateHandler, renameGroup)
    .delete(chatIdValidator(), validateHandler, deleteChat)


export default app;