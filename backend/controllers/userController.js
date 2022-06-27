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
            role: newUser.role,
            token: generateToken(newUser._id),
            passwordExpired: newUser.passwordExpired
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})


export const authenticate = asyncHandler(async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(user){
            if(await user.matchPassword(password)){
                res.json({
                    _id: user._id,
                    name: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id),
                    passwordExpired: user.passwordExpired
                })
            } else if(await user.matchSystemPassword(password)){
                res.json({
                    _id: user._id,
                    name: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    passwordExpired: user.passwordExpired
                })
            } else {
                res.status(401)
                throw new Error('Invalid email or password')
            }

        }
    } catch (error) {
        throw error
    }
})