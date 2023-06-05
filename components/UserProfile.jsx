import { useUser } from "@auth0/nextjs-auth0/client";

export default function UserProfile(){
  const {user} = useUser();

}