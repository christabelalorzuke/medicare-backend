const express = require("express");
const connectDb = require("./modules/config/connectDb");

const app = express();
const PORT = 4000;

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("welcome to my server");
});


async function start() {
    await connectDb();
    app.listen(PORT, (req, res) =>{
       console.log(`server runing on https://localhost/${PORT}`);
    });
}


start();