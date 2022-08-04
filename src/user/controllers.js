const jwt = require("jsonwebtoken")
const User = require("./model.js")

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        const token = await jwt.sign({_id: newUser._id}, process.env.SECRET)
        console.log(newUser)
        res.send({msg: "A new user has been created"})
    } catch (error) {
        console.log(error) 
        res.status(405).send({msg: "The user creation function has failed"})
        
    }
}

exports.readAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        const result = users.map((u) => {
            return u.username
        })
        res.send({allUsers: result})
    } catch (error) {
        console.log(error)
        res.status(400).send({msg: "The user reading function has failed"})
    }
}

exports.login = async (req, res) => {
    try {
        const token = await jwt.sign({_id: req.user._id}, process.env.SECRET) //This creates a token with user._id inside
        res.send({user: req.user.username, token})
    } catch (error) {
        console.log(error)
        res.status(401).send({msg: "The login function has failed"})
    }
}

exports.updatePassword = async (req, res) => {
    try {
        res.send({msg: "A user password has been updated"})
        await User.findOneAndUpdate(req.body, newInformation)
    } catch (error) {
        console.log(error)
        res.status(409).send({msg: "The user update function has failed"})
    }
}

exports.deleteOne = async (req, res) => {
    try {
        await User.findOneAndDelete(req.body.username)
        res.send({msg: "A user has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(417).send({msg: "The user deletion function has failed"})
    }
}