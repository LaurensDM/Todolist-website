import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function list(req, res) {
  switch (req.method) {
    case "GET":
      return await getList(req, res);
    case "POST":
      return await createList(req, res);
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

const getList = async (req, res) => {
  const { pool } = require("../../../lib/db");
  try {
    const list = await pool.query(
      `
    SELECT * FROM list
    `
    );
    if (list) {
      return res.status(200).json({ list });
    } else {
      return res.status(404).json({ error: "List not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const createList = async (req, res) => {
  const { pool } = require("../../../lib/db");
  const { name, description } = req.body;
  try {
    const list = await pool.query(
      `
    INSERT INTO list (name, description) VALUES (?, ?)
    `,
      [name, description]
    );
    if (list) {
      return res.status(200).json({ list });
    } else {
      return res.status(404).json({ error: "List not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}