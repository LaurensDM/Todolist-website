import Dropdown from "@/components/Dropdown";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";


const prisma = new PrismaClient();


export default function List(props){
  const lists = props.lists;

  return(
    <div className="h-screen">
      <div className="flex flex-col">
      {lists.map((list) => (
        <Dropdown list={list}/>
      ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx){
  const {user} = await getSession(ctx.req, ctx.res);
  console.log(user);
  const dbUser = await prisma.user.findFirst({
    where: {
      auth0Id: user.sub
    }
  });
  console.log(dbUser);
  const lists = await prisma.list.findMany({
    where: {
      userId: dbUser.id
    },
    include: {
      Items: true
    }
  });
  console.log(lists[0].Items);
  return {
    props: {
      lists: JSON.parse(JSON.stringify(lists))
    }
  }
}