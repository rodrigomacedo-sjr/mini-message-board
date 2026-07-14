import pool from "./pool";

const getAll = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
};

const getById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);

  if (!rows[0]) {
    throw new Error(`Message with given id not found`);
  }

  return rows[0];
};

const save = async (message) => {
  if (
    !Object.hasOwn(message, "content") ||
    message.content == undefined ||
    message.content == ""
  ) {
    throw new Error("Message must contain content");
  }

  const query = `
  INSERT INTO messages (sender, content)
  VALUES ($1, $2)
  `;
  await pool.query(query, [message.sender, message.content]);
};

const deleteById = async (id) => {
  const query = `
  DELETE FROM messages
  WHERE id = $1
  `;
  await pool.query(query, [id]);
};

export default {
  getAll,
  getById,
  save,
  deleteById,
};
