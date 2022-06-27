import User from "../data-models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"

export const registerUser =  asyncHandler(async(req, res)=>{
    const { email, password, firstName, lastName } = req.body
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User with the given email address already exists.')
    }

    const newUser = await User.create({
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        password,
    })
    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})