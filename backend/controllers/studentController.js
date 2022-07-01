import asyncHandler from "express-async-handler"
import Student from "../data-models/studentModel.js"


// @desc:   Get All students
// @route:  GET /api/students
// @access: PRIVATE
export const getAllStudents = asyncHandler(async(req, res) => {
    try {
        const students = await Student.find().populate("createdBy", "name role")
        res.json(students)        
    } catch (error) {
        throw error
    }
})

// @desc:   Create single student 
// @route:  POST /api/students/new
// @access: PRIVATE
export const createNewStudent = asyncHandler(async(req, res) => {
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
                createdBy: req.user._id
            })
    const student = await Student.findById(newStudent._id).populate("createdBy", "name")
    res.json(student)
    
})

// @desc:   Get single student 
// @route:  GET /api/students/:studentId
// @access: PRIVATE
export const getSingleStudent = asyncHandler(async(req, res) => {
    const student = await Student.findById(req.params.studentId).populate("createdBy", "name")
    if(student){
        res.json(student)
    }else {
        res.status(404)
        throw new Error('Student not found')
    }
})


// @desc:   Update single student 
// @route:  PUT /api/students/:studentId
// @access: PRIVATE
export const updateStudent = asyncHandler(async(req, res) => {
        const student = await Student.findById(req.params.studentId)
        if(student){
            student.name = req.body.name ? req.body.name : student.name
            student.lastName = req.body.lastName ? req.body.lastName : student.lastName
            student.firstName = req.body.firstName ? req.body.firstName : student.firstName
            student.birthdate = req.body.birthdate ? req.body.birthdate : student.birthdate
            student.gender = req.body.gender ? req.body.gender : student.gender
            student.email = req.body.email ? req.body.email : student.email
            student.mobilePhoneNumber = req.body.mobilePhoneNumber ? req.body.mobilePhoneNumber : student.mobilePhoneNumber
            student.homeTelephoneNumber = req.body.homeTelephoneNumber ? req.body.homeTelephoneNumber : student.homeTelephoneNumber
            student.image = req.body.image ? req.body.image : student.image
            student.address = req.body.address ? req.body.address : student.address
            student.status = req.body.status ? req.body.status : student.status

            if(req.body.currentTeacher)
                if(req.body.currentTeacher._id.toString() !== student.currentTeacher._id.toString()){
                    let temp = student.currentTeacher
                    student.currentTeacher = req.body.currentTeacher
                    student.currentTeacherSince = new Date()
                    student.previousTeachers = [...student.previousTeachers, temp]
                    
                }
           
            student.enrolledClasses = req.body.enrolledClasses ? req.body.enrolledClasses : student.enrolledClasses

            const updatedStudent = await student.save()
            const reFetchedStudent = await Student.findById(updatedStudent._id).populate("createdBy", "name")
            res.json(reFetchedStudent)
        }  else {
            res.status(404)
            throw new Error('Student not found')
        }  
})



// @desc:   DELETE single student 
// @route:  DELETE /api/students/:studentId
// @access: PRIVATE
export const deleteSingleStudent = asyncHandler(async(req, res) => {
    const student = await Student.findById(req.params.studentId)
    if(student){
        await student.remove()
        res.json({message: "Student has been deleted"})
    }else {
        res.status(404)
        throw new Error('Student not found')
    }
})
