let mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/prachiDB"

let DbConnect =async()=>{
    try {
        let conn = await mongoose.connect(url);
        if(conn){
            console.log(conn.connection.host);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = DbConnect;