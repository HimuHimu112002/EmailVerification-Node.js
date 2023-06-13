const mongoose =  require("mongoose");
// name = orebi
// pass = Q4JqG9WT2zCIpzBG
function dbConnection(){
    mongoose.connect(process.env.MONGODBURL).then(()=>{
        // env file access korar jonno process.env.MONGODBURL
        console.log("Db connect")
    })
}

module.exports = dbConnection
