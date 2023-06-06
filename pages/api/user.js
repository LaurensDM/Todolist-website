import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function user(req, res) {
  const { user } = getSession(req, res);
  res.status(200).json({ user });
});