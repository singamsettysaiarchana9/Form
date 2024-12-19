const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "127.0.0.1", // Use IP to avoid DNS issues
  user: "root",
  password: "Archana@123",
  database: "employee_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("Connected to the MySQL database!");
});

app.post("/addEmployee", (req, res) => {
  const { name, email, employeeId, department, phoneNumber, dateOfJoining, role } = req.body;

  if (!name || !email || !employeeId || !department || !phoneNumber || !dateOfJoining || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `
    INSERT INTO employees 
    (employee_id, name, email, phone_number, department, date_of_joining, role) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [employeeId, name, email, phoneNumber, department, dateOfJoining, role], (err) => {
    if (err) {
      console.error("Error inserting employee:", err.message);
      return res.status(500).json({ message: `Database error: ${err.message}` });
    }
    res.status(200).json({ message: "Employee added successfully!" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
