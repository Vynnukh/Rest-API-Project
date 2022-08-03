const {Router} = require("express")
const userRouter = Router()
const {createUser, login, readAllUsers, updateUser, deleteOne} = require("./controllers")
const {hashPass, comparePass, tokenCheck} = require("../middleware")

userRouter.post("/user", hashPass, createUser)
userRouter.post("/login", comparePass, login)
userRouter.get("/user", readAllUsers)
userRouter.get("/login", tokenCheck, login)
userRouter.patch("/update",updateUser)
userRouter.delete("/delete", deleteOne)

module.exports = userRouter