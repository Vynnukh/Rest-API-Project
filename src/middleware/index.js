const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../user/model")

exports.hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 9)
        next() //! currently an issue with this line
    } catch (error) {
        console.log(error)
        res.status(406).send({msg: "The server has failed to create a new user"})
    }
}

exports.comparePass = async (req, res, next) => {
    try {
        console.log("This is comparePass")
        req.user = await User.findOne({username: req.body.username})
        if (
            req.user &&
             (await bcrypt.compare(req.body.password, req.user.password))
        ) {
            next()
        } else {
            throw new Error({msg: "Invalid Input"})
        }
    } catch (error) {
        console.log(error)
        res.status(403).send({err: error})
    }
}

exports.tokenCheck = async (req, res, next) => {
    try {
        console.log("This is tokenCheck")
        const token = req.header("Authorization")
        const validateToken = await jwt.verify(token, process.env.SECRET)
        const user = await User.findById(validateToken.id)
        req.user = user
        next()
        // This gets the token from req, unlocks the token, then finds the user with the id in the token, and finally sends the user to a controller
    } catch (error) {
        res.status(418).send({err: error})
    }
}