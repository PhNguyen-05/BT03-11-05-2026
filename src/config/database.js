// require('dotenv').config();
// const mongoose = require('mongoose');

// const dbstate = [{
//     value: 0,
//     label: "Disconnected"
// },
// {
//     value: 1,
//     label: "Connected"
// },
// {
//     value: 2,
//     label: "Connecting"
// },
// {
//     value: 3,
//     label: "Disconnecting"
// }];

// const connection = async () => {
//     await mongoose.connect(process.env.MONGO_DB_URL);
//     const state = Number(mongoose.connection.readyState);
//     console.log(dbstate.find(f => f.value === state).label, "to database");
// }

// module.exports = connection;

require('dotenv').config();   // Đảm bảo load .env

const mongoose = require('mongoose');

const connection = async () => {
    try {
        console.log("MONGO_DB_URL from .env:", process.env.MONGO_DB_URL); // ← Debug

        if (!process.env.MONGO_DB_URL) {
            throw new Error("❌ MONGO_DB_URL is missing in .env file!");
        }

        await mongoose.connect(process.env.MONGO_DB_URL);
        
        const state = Number(mongoose.connection.readyState);
        const dbstate = [
            { value: 0, label: "Disconnected" },
            { value: 1, label: "Connected" },
            { value: 2, label: "Connecting" },
            { value: 3, label: "Disconnecting" }
        ];
        
        console.log("Database:", dbstate.find(f => f.value === state).label);
        
    } catch (error) {
        console.log("Connect to MongoDB failed:", error.message);
        throw error;
    }
};

module.exports = connection;