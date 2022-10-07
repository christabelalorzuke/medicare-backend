require('dotenv').config();

const {connect} = require("mongoose");

const connectDb = async () => {
    try {
        await connect("mongodb://localhost:27017" , {
            dbName: "medicare"
        })
        console.log("Database connected successfully!")
    }
    catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDb;