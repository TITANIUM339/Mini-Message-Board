import pool from "./pool.js";

async function getMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");

    return rows;
}

async function getMessage(id) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
        id,
    ]);

    return rows[0];
}

async function addMessage(name, message, date, location) {
    await pool.query(
        "INSERT INTO messages (name, message, date, location) VALUES ($1, $2, $3, $4)",
        [name, message, date, location],
    );
}

export { getMessage, getMessages, addMessage };
