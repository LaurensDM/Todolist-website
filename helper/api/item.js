import {PrismaClient} from '@prisma/client';
import userApi from './user';

const prisma = new PrismaClient();

async function getItems(listId) {
    return await prisma.item.findMany ({
        where: {
            listId: listId,
        },
    });
}

async function getItemById(id) {
    return await prisma.item.findUnique({
        where: {
            id: id,
        },
    });
}

async function createItem(data) {
    return await prisma.item.create({
        data: {
            ...data,
        },
    });
}

async function updateItem(listId, data) {
    return await prisma.item.update({
        where: {
            id: id,
        },
        data: {
            listId: listId,
            ...data,
        },
    });
}

async function deleteItem(id) {
    return await prisma.item.delete({
        where: {
            id: id,
        },
    });
}

const itemApi = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
};

export default itemApi;