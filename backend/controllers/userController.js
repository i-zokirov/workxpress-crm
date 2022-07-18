import User from "../data-models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import uploadImage from "../middleware/uploadImage.js";
import { cloudinary } from "../services/cloudinary.js";
import Office from "../data-models/officesModel.js";

// @desc:   Get all users
// @route:  GET /api/users
// @access: PRIVATE && Admin
export const getAllUsers = asyncHandler(async (req, res) => {
    let users;
    if (req.query.role) {
        users = await User.find({ role: req.query.role })
            .select("-password")
            .populate("registeredOffice", "officeName");
    } else {
        users = await User.find({})
            .select("-password")
            .populate("registeredOffice", "officeName");
    }

    if (users) {
        res.json(users);
    } else {
        res.status(404);
        throw new Error("Users not found");
    }
});

// @desc:   register user
// @route:  POST /api/users/registerUser
// @access: PRIVATE && Admin
export const registerUser = asyncHandler(async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        gender,
        mobilePhoneNumber,
        birthdate,
    } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User with the given email address already exists.");
    }

    const male =
        "https://res.cloudinary.com/workxpress/image/upload/v1657904978/workxpress/images/male_2_xkpdcr.jpg";
    const female =
        "https://res.cloudinary.com/workxpress/image/upload/v1657904978/workxpress/images/female_oqgbtu.jpg";
    const imageByGender = gender === "Male" ? male : female;
    const image = {
        original: imageByGender,
        thumbnail: imageByGender
            .split("/upload/")
            .join("/upload/c_thumb,w_200,g_face/"),
        circle: imageByGender
            .split("/upload/")
            .join(
                "/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/"
            ),
    };
    const newUser = await User.create({
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        password,
        passwordExpired: true,
        gender,
        mobilePhoneNumber,
        birthdate,
        image,
    });
    if (newUser) {
        res.status(201).json({
            name: newUser.name,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role,
            passwordExpired: newUser.passwordExpired,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export const authenticate = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            if (await user.matchPassword(password)) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    token: !user.passwordExpired
                        ? generateToken(user._id)
                        : null,
                    passwordExpired: user.passwordExpired,
                });
            } else {
                res.status(401);
                throw new Error("Invalid email or password");
            }
        }
    } catch (error) {
        throw error;
    }
});

// @desc:   Get single user
// @route:  GET /api/users/:userId
// @access: PRIVATE
export const getSingleUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId)
        .select("-password")
        .populate("registeredOffice", "officeName");

    if (user) {
        if (
            user._id.toString() === req.user._id.toString() ||
            req.user.role === "Administrator"
        ) {
            res.json(user);
        } else {
            res.status(401);
            throw new Error("You are not authorized to make this request!");
        }
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc:   Update single user
// @route:  PUT /api/users/:userId
// @access: PRIVATE || Admin
export const updateSingleUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (user) {
        if (
            user._id.toString() === req.user._id.toString() ||
            req.user.role === "Administrator"
        ) {
            user.name = req.body.name ? req.body.name : user.name;
            user.lastName = req.body.lastName
                ? req.body.lastName
                : user.lastName;
            user.firstName = req.body.firstName
                ? req.body.firstName
                : user.firstName;
            user.birthdate = req.body.birthdate
                ? req.body.birthdate
                : user.birthdate;
            user.email = req.body.email ? req.body.email : user.email;
            user.mobilePhoneNumber = req.body.mobilePhoneNumber
                ? req.body.mobilePhoneNumber
                : user.mobilePhoneNumber;
            user.homeTelephoneNumber = req.body.homeTelephoneNumber
                ? req.body.homeTelephoneNumber
                : user.homeTelephoneNumber;
            user.image = req.body.image ? req.body.image : user.image;
            user.bio = req.body.bio;
            user.address = req.body.address;
            user.telegram = req.body.telegram;
            user.facebook = req.body.facebook;
            user.instagram = req.body.instagram;

            await user.save();
            res.json({ message: "Successfully updated!" });
        } else {
            res.status(401);
            throw new Error("You are not authorized to make this request!");
        }
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc:   Update single user password
// @route:  PUT /api/users/:userId/password
// @access: PRIVATE || Admin
export const updatePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    const { password, newPassword } = req.body;

    if (user) {
        if (user._id.toString() === req.user._id.toString()) {
            if (await user.matchPassword(password)) {
                user.password = newPassword;
                await user.save();
                res.send({
                    message: "Password has been successfully updated!",
                });
            } else {
                res.status(403);
                throw new Error("Invalid credentials");
            }
        } else if (req.user.role === "Administrator") {
            user.password = newPassword;
            await user.save();
            res.send({ message: "Password has been successfully updated!" });
        } else {
            res.status(403);
            throw new Error("Not Authorized!");
        }
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});
// @desc:   Update User critical props
// @route:  PUT /api/users/:userId/role
// @access: PRIVATE && Admin
export const updateCriticalProp = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (user) {
        user.role = req.body.role ? req.body.role : user.role;

        if (req.body.registeredOffice) {
            const previousOffice = user.registeredOffice;
            const officeId = req.body.registeredOffice;
            const office = await Office.findById(officeId).populate(
                "employees"
            );
            if (office) {
                user.registeredOffice = officeId;
                if (office.employees.length) {
                    if (
                        !office.employees.some(
                            (x) => x._id.toString() === user._id.toString()
                        )
                    ) {
                        office.employees.push(user._id);

                        await office.save();
                    }
                } else {
                    office.employees = [user._id];
                    await office.save();
                }
                user.registeredOffice = officeId;
            }

            if (previousOffice) {
                const prevOffice = await Office.findById(previousOffice._id);
                if (prevOffice) {
                    prevOffice.employees.pull(user._id);
                    await prevOffice.save();
                }
            }
        }

        await user.save();

        res.json({ message: "User record has been successfully updated!" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc:   POST User account
// @route:  POST /api/users/:userId/upload
// @access: PRIVATE || Admin
export const uploadUserImage = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (user) {
        await uploadImage(req, res);
        const { filename, path } = req.file;
        if (user.image && user.image.filename) {
            await cloudinary.uploader.destroy(user.image.filename);
        }
        const image = {
            filename,
            original: path,
            thumbnail: path
                .split("/upload/")
                .join("/upload/c_thumb,w_200,g_face/"),
            circle: path
                .split("/upload/")
                .join(
                    "/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/"
                ),
        };

        user.image = image;
        await user.save();
        res.json(image);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc:   DELETE User account
// @route:  DELETE /api/users/:userId/
// @access: PRIVATE && Admin
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (user) {
        await user.remove();
        res.json({ message: "Account has been deleted" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});
