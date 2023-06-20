import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import itemApi from "@/helper/api/item";

export default withApiAuthRequired(async function items(req, res) {
    switch (req.method) {
        case "POST":
            return await createItem(req, res);
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
});

const createItem = async (req, res) => {
    try {
        const data = { description: req.body.description, list: { connect: { id: req.body.listId } } };
        console.log(data);
        const item = await itemApi.createItem(data);
        return res.status(201).json({ item });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}