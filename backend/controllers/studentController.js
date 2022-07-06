import asyncHandler from "express-async-handler";
import Student from "../data-models/studentModel.js";
import Class from "../data-models/classModel.js";

// @desc:   Get All students
// @route:  GET /api/students
// @access: PRIVATE
export const getAllStudents = asyncHandler(async (req, res) => {
    try {
        const students = await Student.find().populate(
            "createdBy",
            "name role"
        );
        res.json(students);
    } catch (error) {
        throw error;
    }
});

// @desc:   Create single student
// @route:  POST /api/students/new
// @access: PRIVATE
export const createNewStudent = asyncHandler(async (req, res) => {
    const newStudent = await Student.create({
        firstName: req.body.name.split(" ")[0],
        lastName: req.body.name.split(" ")[1],
        name: req.body.name,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        email: req.body.email,
        mobilePhoneNumber: req.body.phone,
        address: {
            street: req.body.address.street,
            suite: req.body.address.suite,
            city: req.body.address.city,
            postalCode: req.body.address.suite,
        },
        createdBy: req.user._id,
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
    const student = await Student.findById(req.params.studentId);

    const previousStudentObject = {};

    previousStudentObject.birthdate = student.birthdate;
    previousStudentObject.mobilePhoneNumber = student.mobilePhoneNumber;
    previousStudentObject.homeTelephoneNumber = student.homeTelephoneNumber;
    previousStudentObject.address = student.address;
    previousStudentObject.status = student.status;
    previousStudentObject.enrolledClasses = student.enrolledClasses;

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
                body: changes.join("\n"),
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
