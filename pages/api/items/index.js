import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function items(req, res) {
  switch (req.method) {
    case "GET":
      return await getItems(req, res);
    case "POST":
      return await createItem(req, res);
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

const getItems = async (req, res) => {
  const { pool } = require("../../../lib/db");
  await pool.connect();
  try {
    const items = await pool.query(
      `
    SELECT * FROM items
    `
    );
    if (items) {
      return res.status(200).json({ items });
    } else {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
