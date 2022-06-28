import User from "../data-models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"



// @desc:   Get all users
// @route:  GET /api/users
// @access: PRIVATE && Admin
export const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({}).select('-password').populate('registeredOffice', 'officeName')

    if(users){
        res.json(users)
    }else {
        res.status(404)
        throw new Error('Users not found')
    }
})


// @desc:   register user 
// @route:  POST /api/users/registerUser
// @access: PRIVATE && Admin
export const registerUser =  asyncHandler(async(req, res)=>{
    const { email, password, firstName, lastName, gender, mobilePhoneNumber, birthdate } = req.body
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
        passwordExpired: true,
        gender, 
        mobilePhoneNumber,
        birthdate
    })
    if(newUser){
        res.status(201).json({
            name: newUser.name,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role,
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
                    token: !user.passwordExpired ? generateToken(user._id) : null,
                    passwordExpired: user.passwordExpired
                })
            }  else {
                res.status(401)
                throw new Error('Invalid email or password')
            }

        }
    } catch (error) {
        throw error
    }
})




// @desc:   Get single user 
// @route:  GET /api/users/:userId
// @access: PRIVATE
export const getSingleUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.userId).select('-password').populate('registeredOffice', 'officeName')

    if(user){
        if(user._id.toString() === req.user._id.toString() || req.user.role === "Administrator"){
            res.json(user)
        } else {
            res.status(401)
            throw new Error("You are not authorized to make this request!")
        }
        
    }else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc:   Update single user 
// @route:  PUT /api/users/:userId
// @access: PRIVATE || Admin
export const updateSingleUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.userId)
    if(user){
        if(user._id.toString() === req.user._id.toString() || req.user.role === "Administrator"){
            user.name = req.body.name ? req.body.name : user.name
            user.lastName = req.body.lastName ? req.body.lastName : user.lastName
            user.firstName = req.body.firstName ? req.body.firstName : user.firstName
            user.birthdate = req.body.birthdate ? req.body.birthdate : user.birthdate
            user.gender = req.body.gender ? req.body.gender : user.gender
            user.email = req.body.email ? req.body.email : user.email
            user.mobilePhoneNumber = req.body.mobilePhoneNumber ? req.body.mobilePhoneNumber : user.mobilePhoneNumber
            user.homeTelephoneNumber = req.body.homeTelephoneNumber ? req.body.homeTelephoneNumber : user.homeTelephoneNumber
            user.image = req.body.image ? req.body.image : user.image
                   
            await user.save()
            const newUser = await User.findById(req.params.userId).select('-password').populate('registeredOffice', 'officeName')
            res.json(newUser)
        } else {
            res.status(401)
            throw new Error("You are not authorized to make this request!")
        }
    }else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc:   Update User critical props
// @route:  PUT /api/users/:userId/role
// @access: PRIVATE && Admin
export const updateCriticalProp = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.userId)
   
    if(user){
        user.role = req.body.role ? req.body.role : user.role 
        user.registeredOffice = req.body.registeredOffice ? req.body.registeredOffice : user.registeredOffice
        await user.save()

        const newUser = await User.findById(req.params.userId).select('-password').populate('registeredOffice', 'officeName')
        res.json(newUser)
    }else {
        res.status(404)
        throw new Error('User not found')
    }
})



// @desc:   DELETE User account
// @route:  DELETE /api/users/:userId/role
// @access: PRIVATE && Admin
export const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.userId)
   
    if(user){
        await user.remove()
        res.json({message: "Account has been deleted"})
    }else {
        res.status(404)
        throw new Error('User not found')
    }
})