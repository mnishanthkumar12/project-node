const db = require('./db');

const createUser = async (userData) => {
    const query = `INSERT INTO users (name, email, password, company_name, age, dob, image) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    try {
      const [result] = await db.execute(query, [
        userData.name,
        userData.email,
        userData.password,
        userData.company_name,
        userData.age,
        userData.dob,
        userData.image,
      ]);
      return result;
    } catch (err) {
      console.error("Error in createUser:", err);
      throw err;
    }
  };
  

const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];
};
const updateOtp = async (email, otp, otpExpiryTime) => {
    const query = `UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?`;
    const [result] = await db.execute(query, [otp, otpExpiryTime, email]);
    return result;
  };
const deleteUserByEmail = async (email) => {
    try {
      const query = 'DELETE FROM users WHERE email = ?';
      const [result] = await db.execute(query, [email]);
      return result;
    } catch (error) {
      console.error('Error deleting user from database:', error);
      throw error;
    }
  };

  
module.exports = { createUser, findUserByEmail, deleteUserByEmail, updateOtp };


