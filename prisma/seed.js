const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const primaryUser = await prisma.user.upsert({
        where: { email: 'laurensdm18gmail.com' },
        update: {},
        create: {
            id: 'f7082b93-4055-4b63-9bed-6539449fa64a',
            email: 'laurensdm18gmail.com',
            name: 'Lauthof 923',
            auth0Id: 'google-oauth2|106957927744511645548',
        },
    });

    const primaryList = await prisma.list.upsert({
        where: { id: 'clj5elrs0000008jw6hhn3h9v' },
        update: {},
        create: {
            id: 'clj5elrs0000008jw6hhn3h9v',
            name: 'First List',
            description: 'This is the first list',
            userId: 'f7082b93-4055-4b63-9bed-6539449fa64a',
        },
    });

    const primaryItem = await prisma.items.upsert({
        where: { id: 1 },
        update: {},
        create: {
            description: 'This is the first item',
            list: {
                connect: {
                    id: 'clj5elrs0000008jw6hhn3h9v'
                }
            }
        },
    });
    console.log({ primaryUser, primaryList, primaryItem });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })