import {PrismaClient} from '@prisma/client';

import prisma from '@/lib/prisma';

async function getListById(id) {
    return await prisma.list.findFirst({
        where: {
            id: id,
        },
    });
}

async function createList(data) {
    return await prisma.list.create({
        data: {
            ...data,
        },
    });
}

async function updateList(id, data) {
    return await prisma.list.update({
        where: {
            id: id,
        },
        data: {
            ...data,
        },
    });
}

async function deleteList(id) {
    return await prisma.list.delete({
        where: {
            id: id,
        },
    });
}

async function getListsByUserId(userId) {
    return await prisma.list.findMany({
        where: {
            userId: userId,
        },
    });
}

async function hello() {
    return 'hello there';
}

const listApi = {
    getListById,
    createList,
    updateList,
    deleteList,
    getListsByUserId,
    hello,
}

export default listApi;