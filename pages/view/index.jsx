import Dropdown from "@/components/Dropdown";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";


const prisma = new PrismaClient();


function List(props) {
  const lists = props.lists;

  return (
    lists.length > 0 ? (
      <div className=" pt-20 px-10 mt-20">
        <div className="flex flex-col">
          {lists.map((list) => (
            <Dropdown list={list} key={list.id} />
          ))}
        </div>
      </div>
    ) : (
      <div className="h-screen">
        <h1 className="text-3xl font-bold text-center">List not found</h1>
      </div>
    )
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx.req, ctx.res);
  if (!session) {
    return {
      props: {
        lists: null,
      }
    }
  }
  const user = session.user;
  const dbUser = await prisma.user.findFirst({
    where: {
      auth0Id: user.sub
    }
  });
  const lists = await prisma.list.findMany({
    where: {
      userId: dbUser.id
    },
    include: {
      Items: true
    }
  });
  return {
    props: {
      lists: JSON.parse(JSON.stringify(lists))
    }
  }
}

export default withPageAuthRequired(List);