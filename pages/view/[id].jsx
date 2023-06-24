import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Delete, Edit } from '@mui/icons-material';
import { Button, ButtonGroup, Icon } from '@mui/material';

const ListDetail = (props) => {
  const list = props.list;
  return (
    list ? (
      <div className="min-h-screen pt-20 py-10 mt-20">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-center mb-5">{list.name}</h1>
          <p className='text-center text-xl mx-5'>{list.description}</p>
          <div className="flex flex-col my-20  mx-auto h-2/3 sm:p-20 p-5 max-w-fit rounded-2xl bg-purple-950">
            {list.Items.map((item, index) => (
              <div className='flex sm:flex-row flex-col justify-center mb-10' key={item.id}>
                <span className=' me-5 text-xl'>{index+1}.</span>
                <h2 className="text-xl font-bold text-center">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-evenly mb-10'>
          <Button variant='contained' color='primary' startIcon={<Edit />}>Edit</Button>
          <Button variant='contained' color='error' startIcon={<Delete />}>Delete</Button>
        </div>
      </div>
    ) : (
      <div className="h-screen">
        <div className='h-4/5 mx-20 mt-5 bg-slate-400 border-slate-600 border-2 rounded-3xl flex align-middle justify-center'>
          <h1 className="text-3xl font-bold text-center text-purple-950 my-auto">There is no list to see here!</h1>  
          </div>
      </div>
    )
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx.req, ctx.res);
  if (!session) {
    return {
      props: {
        list: null,
      },
    };
  }
  const user = session.user;
  const dbUser = await prisma.user.findFirst({
    where: {
      auth0Id: user.sub,
    },
  });
  const list = await prisma.list.findFirst({
    where: {
      id: ctx.query.id,
    },
    include: {
      Items: true,
    },
  });

  if (!dbUser || !list || list.userId !== dbUser.id) {
    return {
      props: {
        list: null,
      },
    };
  }
  return {
    props: {
      list: JSON.parse(JSON.stringify(list)),
    },
  };
}

export default withPageAuthRequired(ListDetail);