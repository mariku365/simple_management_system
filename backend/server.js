const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const sql = require("mssql");

const app = express();

app.use(cors());
app.use(express.json());

const dbConfig = {
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    server:process.env.DB_SERVER,
    database:process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    
    try {
        await sql.connect(dbConfig);
        const result = await sql.query`SELECT * FROM users WHERE username=${username}`;
        const user = result.recordset[0];
        
        if (!user) return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.userPassword);

        if (!isMatch) return res.status(400).json({message: "Invalid credentials. Please try again."})

        const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, { expiresIn: "1h"});
        res.json({ 
            token,
            success: true,
            message: `Login successful! Welcome, ${username}`,
            username: user.username
        });
    } catch (err){
        res.status(500).json({ message: err.message});
    }
})

app.listen(3001, () => console.log("Server running on port 3001"));