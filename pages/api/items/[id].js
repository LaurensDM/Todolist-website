import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function item(req, res) {
  const { user } = getSession(req, res);

  switch (req.method) {
    case "GET":
      return await getItem(req, res);
    case "PUT":
      return await updateItem(req, res);
    case "DELETE":
      return await deleteItem(req, res);
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

const getItem = async (req, res) => {
  const { pool } = require("../../../lib/db");
  const { id } = req.query.id;
  try {
    const item = await pool.query(
      `
    SELECT * FROM items WHERE id = ?
    `,
      id
    );
    if (item) {
      return res.status(200).json({ item });
    } else {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  const { pool } = require("../../../lib/db");
  const { id } = req.query.id;
  const { name, description } = req.body;
  try {
    const item = await pool.query(
      `
    UPDATE items SET name = ?, description = ? WHERE id = ?
    `,
      [name, description, id]
    );
    if (item) {
      return res.status(200).json({ item });
    } else {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  const { pool } = require("../../../lib/db");
  const { id } = req.query.id;
  try {
    const item = await pool.query(
      `
    DELETE FROM items WHERE id = ?
    `,
      id
    );
    if (item) {
      return res.status(200).json({ item });
    } else {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
