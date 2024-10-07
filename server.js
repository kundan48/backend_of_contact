const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");



connectDB();

const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());
app.use("/api/contacts", require("./routes/contactsRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
// app.use("", (req, res)=>{
//     res.json("not found");
// })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
