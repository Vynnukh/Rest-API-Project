const {Router} = require("express")
const userRouter = Router()
const {createUser, login, readAllUsers, updatePassword, deleteOne} = require("./controllers")
const {hashPass, comparePass, tokenCheck} = require("../middleware")

userRouter.post("/user", hashPass, createUser)
userRouter.post("/login", comparePass, login)
userRouter.get("/user", readAllUsers)
userRouter.get("/login", tokenCheck, login)
userRouter.patch("/user",updatePassword)
userRouter.delete("/user", deleteOne)

module.exports = userRouter