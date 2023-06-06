import { useUser } from "@auth0/nextjs-auth0/client";


export default function AuthButton(){

  const {user} = useUser();

  return(
    user ? (
      <div className="flex flex-row align-middle space-x-2 m-2">
       <img src={user.picture} alt={user.name} className="box-content h-16 w-16"/>
      <span className="place-self-center">{user.name}</span>
      <a href="/api/auth/logout" className="bg-purple-900 rounded p-2 m-3">Log Out</a>
      </div>
    ) : (
    <a href="/api/auth/login" className="bg-purple-900 rounded p-2 m-2">Login</a>
    )
  )
}