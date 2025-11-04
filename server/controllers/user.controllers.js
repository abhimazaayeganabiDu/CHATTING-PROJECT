import { compare } from 'bcrypt';
import { User } from '../models/user.models.js';
import { Chat } from '../models/chat.models.js'
import { cookieOptions, emitEvent, sendToken, uploadFilesToCloudinary } from '../utils/features.utils.js';
import { TryCatch } from '../middlewares/error.middlewares.js';
import { Request } from '../models/request.models.js'
import { ErrorHandler } from '../utils/utility.utils.js';
import { NEW_REQUEST, REFETCH_CHATS } from '../constents/event.constents.js'
import { getOtherMembers } from '../lib/helper.lib.js'


// create a new user and save it to the database and save in cookie and save tokens 
const register = TryCatch(async (req, res, next) => {

    const file = req.file

    const { name, username, password, bio } = req.body

    if (!file) return next(new ErrorHandler("Please Upload Your Profile Photo"))

    const result = await uploadFilesToCloudinary([file])

    const userAvatar = {
        public_id: result[0].public_id,
        url: result[0].url,
    };
    
    const user = await User.create({
        name,
        bio,
        username,
        password,
        avatar: userAvatar,
    })
    
    sendToken(res, user, 201, "User created sucessfully")
})

const login = TryCatch(async (req, res, next) => {

    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password")
    
    if (!user) {
        return next(new ErrorHandler("Invalid Username", 404))
    }

    const isMatch = await compare(password, user.password)

    if (!isMatch) {
        return next(new ErrorHandler("Invalid Password", 404))
    }

    sendToken(res, user, 200, `Welcome back, ${user.name}`)
})

const getMyProfile = TryCatch(async (req, res) => {

    const user = await User.findById(req.user).select("-password")
    res.status(200).json({
        sucess: true,
        user
    })
})

const logout = TryCatch(async (req, res) => {
    res
        .status(200)
        .cookie("chatting-token", "", { ...cookieOptions, maxAge: 0 })
        .json({
            sucess: true,
            message: "Logged out Successfully"
        })
})

const searchUser = TryCatch(async (req, res) => {
    const { name = "" } = req.query

    const myChats = await Chat.find({
        groupChat: false,
        members: req.user
    })

    
    
    // Get all users (my friends) from my chats includes me
    const allUsersFromMyChats = myChats.flatMap((chat) => chat.members)
    allUsersFromMyChats.push(req.user)
    
    // Get all users expect me and my friends 
    const allUsersExpectMeAndFriends = await User.find({
        _id: { $nin: allUsersFromMyChats },
        name: { $regex: name, $options: "i" }
    })

    const users = allUsersExpectMeAndFriends.map(({ _id, name, avatar }) => (
        {
            _id,
            name,
            avatar: avatar.url
        }
    ))

    res.status(200)
        .json({
            sucess: true,
            users
        })
})

const sendFriendRequest = TryCatch(async (req, res, next) => {

    const { userId } = req.body

    const request = await Request.findOne({
        $or: [
            { sender: req.user, receiver: userId },
            { sender: userId, receiver: req.user },
        ]
    })

    if (request) return next(new ErrorHandler("Request already send", 400))

    await Request.create({
        sender: req.user,
        receiver: userId
    })

    emitEvent(req, NEW_REQUEST, [userId])

    res
        .status(200)
        .json({
            sucess: true,
            message: "Friend request sent"
        })
})

const acceptFriendRequest = TryCatch(async (req, res, next) => {

    const { requestId, accept } = req.body

    const request = await Request.findById(requestId)
        .populate("sender", "name")
        .populate("receiver", "name")
    if (!request) return next(new ErrorHandler("Request not found", 404))

    if (request.receiver._id.toString() !== req.user.toString()) return next(new ErrorHandler("You are not authorized to accept this request ", 401))

    if (!accept) {
        await request.deleteOne()
        return res.status(200).json({
            sucess: true,
            message: "Friend Request Rejected"
        })
    }

    const members = [request.sender._id, request.receiver._id]

    await Promise.all([Chat.create({
        members,
        name: `${request.sender.name}-${request.receiver.name}`
    }),
    request.deleteOne(),
    ])

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200)
        .json({
            sucess: true,
            message: "Friend Request Accepted",
            senderId: request.sender._id
        })

})

const getMyNotifications = TryCatch(async (req, res) => {
    const requests = await Request.find({ receiver: req.user }).populate("sender", "name avatar")

    const allRequest = requests.map(({ _id, sender }) => ({
        _id,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url
        }
    }))

    return res.status(200)
        .json({
            success: true,
            allRequest
        })
})

const getMyFriends = TryCatch(async (req, res) => {

    const chatId = req.query.chatId;

    const chats = await Chat.find({
        members: req.user,
        groupChat: false,
    }).populate("members", "name avatar")

    const friends = chats.map(({ members }) => {
        const otherUser = getOtherMembers(members, req.user)
        return {
            _id: otherUser._id,
            name: otherUser.name,
            avatar: otherUser.avatar.url
        }
    })

    if (chatId) {
        const chat = await Chat.findById(chatId)
        const avalableFriends = friends.filter(
            (friend) => !chat.members.includes(friend._id)
        )
        return res.status(200).json({
            success: true,
            friends: avalableFriends,
        })
    } else {
        return res.status(200)
            .json({
                success: true,
                friends,
            })
    }
})


export {
    login,
    register,
    getMyProfile,
    logout,
    searchUser,
    sendFriendRequest,
    acceptFriendRequest,
    getMyNotifications,
    getMyFriends
};


