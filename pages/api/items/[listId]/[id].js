import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import itemApi from "@/helper/api/item";

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

  try {
    const item = itemApi.getItemById(req.query.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (item.listId !== req.query.listId) {
      return res.status(400).json({ error: "This item does not exist within the specified list" });
    }
    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await getItem(req, res);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (item.listId !== req.query.listId) {
      return res.status(400).json({ error: "This item does not exist within the specified list" });
    }
    await itemApi.updateItem(req.query.id, req.body);
    return res.status(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await getItem(req, res);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (item.listId !== req.query.listId) {
      return res.status(400).json({ error: "This item does not exist within the specified list" });
    }
    await itemApi.deleteItem(req.query.id);
    return res.status(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
