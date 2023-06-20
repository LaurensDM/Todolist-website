import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import listApi from "../../../helper/api/list";
import userApi from "@/helper/api/user";

const { user } = getSession(req, res);

export default withApiAuthRequired(async function item(req, res) {


    switch (req.method) {
        case "GET":
            return await getList(req, res);
        case "PUT":
            return await updateList(req, res);
        case "DELETE":
            return await deleteList(req, res);
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
});

const getList = async (req, res) => {

    try {
        const checkedUser = await userApi.checkUser(user);
        const list = await listApi.getListById(req.query.id);

        if (list.userId !== checkedUser.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (list) {
            return res.status(200).json({ list });
        } else {
            return res.status(404).json({ error: "List not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateList = async (req, res) => {
    try {
        const checkedUser = await userApi.checkUser(user);
        const list = await getList(req.query.id);

        if (!list)  {
            return res.status(404).json({ error: "List not found" });
        }

        if (checkedUser.id !== list.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        await listApi.updateList(req.query.id, req.body);
        return res.status(204);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteList = async (req, res) => {
    try {
        const checkedUser = await userApi.checkUser(user);
        const list = await getList(req.query.id);
        if (!list) {
            return res.status(404).json({ error: "List not found" });
        }
        if (checkedUser.id !== list.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
         await listApi.deleteList(req.query.id);

        return res.status(200);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
