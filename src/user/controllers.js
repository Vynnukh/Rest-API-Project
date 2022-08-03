const jwt = require("jsonwebtoken")
const User = require("./model.js")

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        console.log(newUser)
        res.send({msg: "A new user has been created"})
    } catch (error) {
        console.log(error) 
        res.status(405).send({err: error})
        
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
        res.status(400).send({err: error})
    }
}

exports.login = async (req, res) => {
    try {
        const token = await jwt.sign({id: req.user.id}, process.env.SECRET) //This creates a token with user._id inside
        res.send({user: req.user.username, token})
    } catch (error) {
        console.log(error)
        res.status(401).send({err: error})
    }
}

exports.updateUser = async (req, res) => {
    try {
        res.send({msg: "A user has been updated"})
        await User.findOneAndUpdate(req.body, newInformation)
    } catch (error) {
        console.log(error)
    }
}

exports.deleteOne = async (req, res) => {
    try {
        await User.findOneAndDelete(req.body)
        res.send({msg: "A user has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(405).send({err: error})
    }
}