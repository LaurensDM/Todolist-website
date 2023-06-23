import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default async function user(req, res) {
  const { user } = await getSession(req, res);
  console.log(user);
  return res.status(200).json({ user });
}