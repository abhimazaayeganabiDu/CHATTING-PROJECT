import { ErrorHandler } from "../utils/utility.utils.js";
import jwt from 'jsonwebtoken'
import { TryCatch } from "./error.middlewares.js";
import { adminSecretKey } from '../app.js'
import { CHATTU_TOKEN } from "../constents/config.js";
import { User } from "../models/user.models.js";


const isAuthenticated = (req, res, next) => {
    // const token = req.cookies
    console.log();
    const token = req.cookies[CHATTU_TOKEN]

    if (!token) return next(new ErrorHandler("Please login to access this route ", 401))

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decodedData._id

    next()
}

const isAdminOnly = (req, res, next) => {
    const token = req.cookies["chatting-admin-token"]

    if (!token) return next(new ErrorHandler("Only Admin Can access this route ", 401))

    const secretKey = jwt.verify(token, process.env.JWT_SECRET)

    const isMatched = secretKey === adminSecretKey

    if (!isMatched) return next(new ErrorHandler("Invalid Admin Key", 401))

    next()
}

const socketAuthenticator = async (err, socket, next) => {
    try {
        if (err)
            return next(err)
        
        const authToken = socket.request.cookies[CHATTU_TOKEN]

        if (!authToken) return next(new ErrorHandler("Please login to access this route", 401))

        const decodedData = jwt.verify(authToken, process.env.JWT_SECRET)

        const user = await User.findById(decodedData._id)

        if (!user) return next(new ErrorHandler("Please login to access this route", 401))

        socket.user = user

        return next()
    } catch (error) {
        console.log(error);
        return next (new ErrorHandler("Please login to access this route", 401))
    }
}


export { isAuthenticated, isAdminOnly, socketAuthenticator } 