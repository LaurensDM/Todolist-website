const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');
const itemRepo = require("../repository/item");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getByListId = async(listId) => {
  debugLog(`Fetching items with listId ${listId}`);
  const items = await itemRepo.findByListId(listId);
  if (!items) {
    throw ServiceError.notFound(`There is no item with listId ${listId}`, {
      listId,
    });
  }
  return items;
}

const getById = async(id) => {
  debugLog(`Fetching items with id ${id}`);
  const item = await itemRepo.findById(id);
  if (!item) {
    throw ServiceError.notFound(`There is no item with id ${id}`, {
      id,
    });
  }
  return item;
}

const create = async({name, description, listId}) => {
  const newItem = {name, description, listId};
  debugLog('Creating new item', newItem);
  const id = await itemRepo.create(newItem);
  const item = await getById(id);
  return item;
}

const updateById = async(id, {name, description}) => {
  const updatedItem = {name, description};
  debugLog(`Updating item with id ${id}`, updatedItem);
  await itemRepo.updateById(id,updatedItem);
  const item = await getById(id);
  return item;
}

const deleteById = async (id) => {
  debugLog(`Deleting item with id ${id}`);
  await itemRepo.deleteById(id);
}


module.exports = {
  getByListId,
  getById,
  create,
  updateById,
  deleteById,
};
