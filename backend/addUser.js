const bcrypt = require("bcryptjs");
const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function addUser() {
  try {
    await sql.connect(dbConfig);

    const username = "MGR_Mark";
    const plainPassword = "MGR_Mark";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await sql.query`
      INSERT INTO users (username, userPassword)
      VALUES (${username}, ${hashedPassword})
    `;

    console.log("User added successfully!");
    console.log(`Username: ${username}`);
    console.log(`Password: ${plainPassword} (hashed in DB)`);
    process.exit(0);
  } catch (err) {
    console.error("Error adding user:", err.message);
    process.exit(1);
  }
}

addUser();
