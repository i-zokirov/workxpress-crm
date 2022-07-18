import asyncHandler from "express-async-handler";
import multer from "multer";
import Student from "../data-models/studentModel.js";
import Class from "../data-models/classModel.js";
import Office from "../data-models/officesModel.js";

import uploadImage from "../middleware/uploadImage.js";
import { cloudinary } from "../services/cloudinary.js";

// @desc:   Get All students
// @route:  GET /api/students
// @access: PRIVATE
export const getAllStudents = asyncHandler(async (req, res) => {
    try {
        const students = await Student.find()
            .populate("createdBy", "name role")
            .populate("branch", "officeName");

        res.json(students);
    } catch (error) {
        throw error;
    }
});

// @desc:   Create single student
// @route:  POST /api/students/new
// @access: PRIVATE
export const createNewStudent = asyncHandler(async (req, res) => {
    const male =
        "https://res.cloudinary.com/workxpress/image/upload/v1657904978/workxpress/images/male_2_xkpdcr.jpg";
    const female =
        "https://res.cloudinary.com/workxpress/image/upload/v1657904978/workxpress/images/female_oqgbtu.jpg";
    const imageByGender = req.body.gender === "Male" ? male : female;
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
    const newStudent = await Student.create({
        firstName: req.body.name.split(" ")[0],
        lastName: req.body.name.split(" ")[1],
        name: req.body.name,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        email: req.body.email,
        mobilePhoneNumber: req.body.mobilePhoneNumber,
        address: {
            street: req.body.address.street,
            suite: req.body.address.suite,
            city: req.body.address.city,
            postalCode: req.body.address.postalCode,
        },
        createdBy: req.user._id,
        branch: req.body.branch,
        enrolledClasses: req.body.enrolledClasses
            ? req.body.enrolledClasses
            : [],
        image: req.body.image ? req.body.image : image,
    });
    const student = await Student.findById(newStudent._id).populate(
        "createdBy",
        "name"
    );
    res.json(student);
});

// @desc:   Get single student
// @route:  GET /api/students/:studentId
// @access: PRIVATE
export const getSingleStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.studentId)
        .populate("createdBy", "name")
        .populate("branch", "officeName")
        .populate("updateHistory.updatedBy", "name")
        .populate("enrolledClasses");
    await student.populate("enrolledClasses.teacher", "name");
    if (student) {
        res.json(student);
    } else {
        res.status(404);
        throw new Error("Student not found");
    }
});

// @desc:   Update single student
// @route:  PUT /api/students/:studentId
// @access: PRIVATE
export const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.studentId).populate(
        "branch",
        "officeName"
    );

    const previousStudentObject = {};

    previousStudentObject.birthdate = student.birthdate;
    previousStudentObject.mobilePhoneNumber = student.mobilePhoneNumber;
    previousStudentObject.homeTelephoneNumber = student.homeTelephoneNumber;
    previousStudentObject.address = student.address;
    previousStudentObject.status = student.status;
    previousStudentObject.enrolledClasses = student.enrolledClasses;
    previousStudentObject.branch = student.branch;

    if (student) {
        student.birthdate = req.body.birthdate
            ? req.body.birthdate
            : student.birthdate;
        student.mobilePhoneNumber = req.body.mobilePhoneNumber
            ? req.body.mobilePhoneNumber
            : student.mobilePhoneNumber;
        student.homeTelephoneNumber = req.body.homeTelephoneNumber
            ? req.body.homeTelephoneNumber
            : student.homeTelephoneNumber;
        student.image = req.body.image ? req.body.image : student.image;
        student.address = req.body.address ? req.body.address : student.address;
        student.status = req.body.status ? req.body.status : student.status;

        // if req body contains new branch where user is registered, update office documents respectively
        if (req.body.branch) {
            const officeId = req.body.branch;

            const office = await Office.findById(officeId);
            if (office) {
                if (office.students.length) {
                    if (
                        !office.students.some(
                            (x) => x._id.toString() === student._id
                        )
                    ) {
                        office.students.push(student._id);
                        await office.save();
                    }
                } else {
                    office.students = [student._id];
                    await office.save();
                }

                student.branch = officeId;
            }

            if (previousStudentObject.branch) {
                const previousOffice = await Office.findById(
                    previousStudentObject.branch._id
                );

                if (previousOffice.students.length) {
                    previousOffice.students.pull(student._id);
                    await previousOffice.save();
                }
            }
        }

        if (req.body.update) {
            student.updateHistory.push(req.body.update);
        }

        if (req.body.enrolledClasses) {
            student.enrolledClasses = req.body.enrolledClasses;

            // for each enrolled class, find class document and push student id
            for (let id of student.enrolledClasses) {
                const cls = await Class.findById(id);
                if (cls.students.length) {
                    if (
                        !cls.students.some(
                            (x) => x.toString() === student._id.toString()
                        )
                    ) {
                        cls.students.push(student._id);
                    }
                } else {
                    cls.students = [student._id];
                }

                await cls.save();
            }

            const allClassesStudentIsReferenced = await Class.find({
                students: { $in: [student._id] },
            });

            const toBeDeleted = [];
            for (let clsStudentReferenced of allClassesStudentIsReferenced) {
                if (
                    !student.enrolledClasses.some(
                        (x) =>
                            x._id.toString() ===
                            clsStudentReferenced._id.toString()
                    )
                ) {
                    toBeDeleted.push(clsStudentReferenced);
                }
            }

            // if there are extracted items, find those classes, and remove student from students array
            if (toBeDeleted.length) {
                for (let item of toBeDeleted) {
                    item.students.pull(student._id);
                    await item.save();
                }
            }
        }

        const changes = [];
        if (previousStudentObject.status !== student.status)
            changes.push(
                `Status was <i>${previousStudentObject.status} </i> - now <i> ${student.status} </i>`
            );
        if (previousStudentObject.birthdate !== student.birthdate)
            changes.push(
                `birthdate was <i>${previousStudentObject.birthdate} </i> - now <i> ${student.birthdate} </i>`
            );
        if (previousStudentObject.branch) {
            if (
                previousStudentObject.branch._id.toString() !==
                student.branch._id.toString()
            ) {
                const newOffice = await Office.findById(student.branch._id);
                changes.push(
                    `previous branch was <i>${previousStudentObject.branch.officeName} </i> - now <i> ${newOffice.officeName} </i>`
                );
            }
        } else {
            const newOffice = await Office.findById(student.branch._id);
            changes.push(`Branch changed to <i> ${newOffice.officeName} </i>`);
        }

        if (
            previousStudentObject.mobilePhoneNumber !==
            student.mobilePhoneNumber
        )
            changes.push(
                `mobile number was <i>${previousStudentObject.mobilePhoneNumber} </i> - now <i> ${student.mobilePhoneNumber} </i>`
            );
        if (
            previousStudentObject.homeTelephoneNumber !==
            student.homeTelephoneNumber
        )
            changes.push(
                `secondary Number was <i>${previousStudentObject.homeTelephoneNumber} </i> - now <i> ${student.homeTelephoneNumber} </i>`
            );

        if (previousStudentObject.address.street !== student.address.street)
            changes.push(
                `street address was <i>${previousStudentObject.address.street} </i> - now <i> ${student.address.street} </i>`
            );
        if (previousStudentObject.address.suite !== student.address.suite)
            changes.push(
                `suite  was <i>${previousStudentObject.address.suite} </i> - now <i> ${student.address.suite} </i>`
            );
        if (
            previousStudentObject.address.postalCode !==
            student.address.postalCode
        )
            changes.push(
                `postal code  was <i>${previousStudentObject.address.postalCode} </i> - now <i> ${student.address.postalCode} </i>`
            );
        if (previousStudentObject.address.city !== student.address.city)
            changes.push(
                `city  was <i>${previousStudentObject.address.city} </i> - now <i>${student.address.city} </i>`
            );

        if (
            previousStudentObject.enrolledClasses.join(".") !==
            student.enrolledClasses.join(".")
        ) {
            const previouslyEnrolledClasses = [];
            for (let item of previousStudentObject.enrolledClasses) {
                const cls = await Class.findById(item).populate(
                    "teacher",
                    "name"
                );
                previouslyEnrolledClasses.push(
                    `${cls.className} by ${cls.teacher.name}`
                );
            }

            const currentlyEnrolledClasses = [];
            for (let item of student.enrolledClasses) {
                const cls = await Class.findById(item).populate(
                    "teacher",
                    "name"
                );
                currentlyEnrolledClasses.push(
                    `${cls.className} by ${cls.teacher.name}`
                );
            }

            changes.push(
                `enrolled classes  <i>${previouslyEnrolledClasses.join(
                    ", "
                )} </i> changed to   <i>${currentlyEnrolledClasses.join(
                    ", "
                )}  </i>`
            );
        }

        if (changes.length) {
            student.updateHistory.push({
                body: changes.join("<br/>"),
                updatedBy: req.user._id,
            });
        }

        await student.save();

        res.json({ message: "Student has been successfully updated" });
    } else {
        res.status(404);
        throw new Error("Student not found");
    }
});

// @desc:   DELETE single student
// @route:  DELETE /api/students/:studentId
// @access: PRIVATE
export const deleteSingleStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.studentId);
    if (student) {
        await student.remove();
        res.json({ message: "Student has been deleted" });
    } else {
        res.status(404);
        throw new Error("Student not found");
    }
});

// @desc:   POST single student
// @route:  POST /api/students/:studentId/upload
// @access: PRIVATE
export const uploadStudentPicture = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.studentId);
    if (student) {
        console.log("Upload start");
        await uploadImage(req, res);
        console.log("Upload done");

        const { filename, path } = req.file;
        if (student.image && student.image.filename) {
            await cloudinary.uploader.destroy(student.image.filename);
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

        student.image = image;
        await student.save();
        res.json(image);
    } else {
        res.status(404);
        throw new Error("Student not found");
    }
});
