const crypto = require("crypto");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((error) => {
  if (error) {
    console.log(error.message);
  }

  console.log("Database status: " + connection.state);
});

async function registerUser(user) {
  const registerTime = new Date().toISOString().slice(0, 19).replace("T", " ");
  const loginTime = null;
  const admin = 0;

  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

      const hashedPassword = crypto
        .createHash("sha256")
        .update(user.password)
        .digest("hex");

      connection.query(
        query,
        [
          user.username,
          hashedPassword,
          user.street,
          user.city,
          user.state,
          user.zipCode,
          user.country,
          user.cardNumber,
          user.firstname,
          user.lastname,
          user.phoneNumber,
          user.email,
          registerTime,
          loginTime,
          admin,
        ],
        (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result);
        }
      );
    });

    return {
      username: user.username,
    };
  } catch (error) {
    console.log(error);
  }
}
