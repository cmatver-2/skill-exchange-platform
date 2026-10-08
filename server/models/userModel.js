const pool = require("../db/pool");

const findUserByClerkId = async (clerkUserId) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE clerk_user_id = $1",
    [clerkUserId]
  );

  return result.rows[0];
};

const createUser = async ({
  clerkUserId,
  name,
  email,
  role = "student",
  bio = null,
  avatar = null,
}) => {
  const result = await pool.query(
    `INSERT INTO users
      (clerk_user_id, name, email, role, bio, avatar)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [clerkUserId, name, email, role, bio, avatar]
  );

  return result.rows[0];
};

module.exports = {
  findUserByClerkId,
  createUser,
};