import { PrismaClient } from '@prisma/client';
import { useMemo } from 'react';

import prisma from '@/lib/prisma';

async function getUserById(id) {
    return await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
}

async function getUserByEmail(email) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
}

async function createUser(data) {
    return await prisma.user.create({
        data: {
            ...data,
        },
    });
}

async function updateUser(id, data) {
    return await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            ...data,
        },
    });
}

async function deleteUser(id) {
    return await prisma.user.delete({
        where: {
            id: id,
        },
    });
}

async function checkUser(authUser) {
    const user = await prisma.user.findFirst({
        where: {
            auth0Id: authUser.sub,
        },
    });
    if (user) {
        return user;
    } else {
        const newUser = await prisma.user.create({
            data: {
                auth0Id: authUser.sub,
                email: authUser.email,
                name: authUser.name,
            },
        });
        return newUser;
    }
}

const userApi =
{
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    checkUser,
}

export default userApi;
