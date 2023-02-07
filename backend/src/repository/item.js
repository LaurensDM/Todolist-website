const {
  tables,
  getKnex,
} = require('../data/index');
const {
  getLogger,
} = require('../core/logging');

const findByListId = async (listId) => {
  const items = await getKnex()(tables.item).where('listId',listId);
  return items;
}

const findById = async (id) => {
  const item = await getKnex()(tables.item).where('id', id).first();
  return item;
}

const create = async ({
  name,
  description,
  listId,
}) => {
  try {
    const [id] = await getKnex()(tables.item).insert({
      name,
      description,
      listId,
    })
    return id
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
}

const updateById = async (id, {
  name,
  description
}) => {
  try {
    await getKnex()(tables.item).update({
      name: name,
      description: description,
    }).where('id', id);
    return id
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in update', {
      error,
    });
    throw error;
  }
}

const deleteById = async (id) => {
  try {
    const rowsaffected = await getKnex()(tables.item).delete().where('id',id);
    return rowsaffected;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
}

module.exports = {
  findByListId,
  create,
  findById,
  updateById,
  deleteById,
};