require("dotenv").config()
const {SECRET} = process.env
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {Router} = require("express")
const router = Router()


router.post("/signup", async (request, response) => {
    try {
        request.body.password = await bcrypt.hash(request.body.password, 10)
        const newUser = await User.create(request.body)
        response.status(200).json(newUser)
    } catch (error) {
        response.status(400).json(error)
    }
})

router.post("/login", async (request, response) => {
    try {
        const {username, password} = request.body
        const user = await User.findOne({username})
        if(user) {
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                    const token = await jwt.sign({username}, SECRET)
                    response.status(200).json({token})
            } else {
                response.status(400).json({error: "PASSWORD DOES NOT MATCH"})
            }
        } else {
            response.status(400).json({error: "USER DOES NOT EXIST"})
        }

    } catch(error) {
        response.status(400).json(error)
    }
})



module.exports = router