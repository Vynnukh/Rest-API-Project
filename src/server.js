require("./db/connection.js") //Putting this at the top is best, as it runs the connection file first, of which the rest of the application is dependant on
const express = require("express")
const userRouter = require("./user/routes.js")
const server = express()

// The relevant routes and controllers must be put within this section of code

server.use(express.json()) //This informs the server that it will always be recieving JSON, and that it should always be sending back JSON

server.use(userRouter)

server.listen(5000, () => {
    console.log("Listening on port 5000")
})