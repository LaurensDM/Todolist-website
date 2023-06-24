import { useUser } from "@auth0/nextjs-auth0/client";
import { Home } from "@mui/icons-material";
import Link from "next/link";


export default function AuthButton() {

  const { user } = useUser();

  return (
    user ? (
      <div className="w-screen fixed bg-purple-600 bg-opacity-60 z-10">
        <div className="flex justify-evenly">
          <div className="flex sm:w-1/2 sm:justify-end">
        <Link href={'/'} className="sm:mx-0 mx-auto my-auto">
          <Home />
        </Link>
        </div>
        <div className="flex flex-row sm:w-1/2 justify-end align-middle sm:gap-3">
          <img src={user.picture} alt={user.name} className="h-12 w-12 m-2 my-auto" />
          <span className="my-auto font-bold text-lg">{user.name}</span>
          <a href="/api/auth/logout" className="bg-violet-950 rounded py-3 px-5 m-2 text-center">Log Out</a>
          </div>
        </div>
      </div>
    ) : (
      <a href="/api/auth/login" className="bg-purple-900 rounded py-3 px-5 m-5 text-center">Login</a>
    )
  )
}