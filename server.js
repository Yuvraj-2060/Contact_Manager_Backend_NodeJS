const express = require('express');
const connectDb = require("./config/dbConnection")
const coursesRouter = require('./routes/contactRoutes');
const usersRouter = require('./routes/userRoutes')
const errorHandler = require('./middleware/errorhandler');
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/contacts", coursesRouter);
app.use("/api/v1/users", usersRouter);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server Is Running On Port ${port}`);
    // console.log("Server Is Running On Port " + port); 
})
