require("dotenv").config()
const {SECRET} = process.env
const jwt = require("jsonwebtoken");

const auth = async (request, response, next) => {
    try {
            // Authorization: "bearer XXXXX-Token-XXXXXX"
        if(request.headers.authorization) {
            const token = request.headers.authorization.split(" ")[1]
            const payload = await jwt.verify(token, SECRET);
            if (payload) {
                request.payload = payload
                next()
            } else {
                response.status(400).json({error: "VERIFICATION FAILED OR NO PAYLOAD"})
            }
        } else {
            response.status(400).json({error: "NO AUTHORIZATION HEADER"})
        }   
    } catch(error) {
        response.status(400).json({error})
    }
}

module.exports = auth