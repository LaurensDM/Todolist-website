import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import listApi from "../../../helper/api/list";
import userApi from "@/helper/api/user";

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

  try {
    const session = await getSession(req, res);
    console.log(session.user);
    await userApi.checkUser(session.user);
    const list = await listApi.getListsByUserId(session.user.sub);
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

  try {
    const session = await getSession(req, res);
    console.log(session.user);
    await userApi.checkUser(session.user);
    const list = await listApi.createList(req.body)
    if (list) {
      return res.status(201).json({ list });
    } 
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}