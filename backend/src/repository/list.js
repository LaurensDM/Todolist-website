const {
  tables,
  getKnex,
} = require('../data/index');
const {
  getLogger,
} = require('../core/logging');

const findAll = async(userId) => {
  const lists = await getKnex()(tables.list).where('userId',userId).orderBy('name','ASC');
  return lists
}

const findById = async(id) => {
  const list = await getKnex()(tables.list).where('id',id).first();
  return list;
}

const findByCode = async (code) => {
  const list = await getKnex()(tables.list).where('code', code).first();
  return list;
};

const create = async ({name,userId,code}) => {
  try {
    const [id] = await getKnex()(tables.list).insert({
      name,userId,code,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
}

const updateById = async (id, {name}) => {
  try {
    await getKnex()(tables.list).update({
      name
    }).where('id',id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in update', {
      error,
    });
    throw error;
  }
}

const deleteById = async(id) => {
  try {
    const rowsAffected = await getKnex()(tables.list).delete().where('id',id);
    return rowsAffected;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
}


module.exports = {
  findAll,
  findById,
  findByCode,
  create,
  updateById,
  deleteById,
};