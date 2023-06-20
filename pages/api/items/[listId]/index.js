import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import itemApi from "@/helper/api/item";

export default withApiAuthRequired(async function items(req, res) {
  switch (req.method) {
    case "GET":
      return await getItems(req, res);
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

const getItems = async (req, res) => {

  try {
    const items = itemApi.getItems(req.query.listId);
    if (items) {
      return res.status(200).json({ items });
    } else {
      return res.status(404).json({ error: "No items found"});
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


