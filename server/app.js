import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { corsOptions } from './constents/config.js';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT, START_TYPING, STOP_TYPING } from './constents/event.constents.js';
import { getSocket } from './lib/helper.lib.js';
import { socketAuthenticator } from './middlewares/auth.middlewares.js';
import { errorMiddleware } from './middlewares/error.middlewares.js';
import { Message } from './models/message.models.js';
import { connectDB } from './utils/features.utils.js';


import adminRoute from './routes/admin.routes.js';
import chatRoute from './routes/chat.routes.js';
import userRoute from './routes/user.routes.js';


dotenv.config({
    path: "./.env"
})


const mongoURI = process.env.MONGO_URI
const port = process.env.PORT || 3000
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION"
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "nivgnjjjjjjjjj"
const userSocketIDs = new Map()

connectDB(mongoURI)



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: corsOptions,
})

app.set("io",io)


// using middleware here
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))


// using routes here
app.use("/api/v1/users", userRoute)
app.use("/api/v1/chats", chatRoute)
app.use("/api/v1/admin", adminRoute)



app.get('/', (req, res) => {
    res.send("Hello chomu")
})


io.use((socket, next) => {
    cookieParser()(
        socket.request,
        socket.request.res,
        async (err) => { await socketAuthenticator(err, socket, next) }
    )
})



io.on("connection", (socket) => {
    const user = socket.user
    userSocketIDs.set(user._id.toString(), socket.id)

    console.log(userSocketIDs);
    console.log("a user connedted", socket.id);

    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {        
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name
            },
            chat: chatId,
            createdAt: new Date().toISOString()
        }

        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        }

        const membersSocket = getSocket(members)

        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime,
        })

        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, {
            chatId
        })

        try {
            await Message.create(messageForDB)

        } catch (error) {
            console.log(error)
        }
    })

    socket.on(START_TYPING, ({member,chatId})=>{
        console.log("start-typing",chatId);
        const membersSockets = getSocket(member)
        io.to(membersSockets).emit(START_TYPING,{chatId})
        
    })

    socket.on(STOP_TYPING, ({member,chatId})=>{
        console.log("stop-typing",chatId);
        const membersSockets = getSocket(member)
        io.to(membersSockets).emit(STOP_TYPING,{chatId})
        
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
        userSocketIDs.delete(user._id.toString())
    })
})

app.use(errorMiddleware)

server.listen(port, () => {
    console.log(`Server is running on port ${port} in ${envMode} Mode`);
})

export {
    adminSecretKey, envMode, userSocketIDs
};
