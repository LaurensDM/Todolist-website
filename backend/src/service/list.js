const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');
const listRepo = require('../repository/list');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async (userId) => {
  debugLog(`Fetching all lists from user ${userId}`);
  const lists = await listRepo.findAll(userId)
  if (!lists) {
    throw ServiceError.notFound(`There is no list with userId ${userId}`, {
      userId,
    });
  }
  return lists;
}

const getById = async (id) => {
  debugLog(`Fetching list with id ${id}`)
  const list = await listRepo.findById(id);
  if (!list) {
    throw ServiceError.notFound(`There is no group with id ${id}`, {
      id,
    });
  }
  return list;
}

const getByCode = async (code) => {
  debugLog(`Fetching list with code ${code}`);
  const list = await listRepo.findByCode(code);
  if (!list) {
    throw ServiceError.notFound(`There is no group with code ${code}`, {
      code,
    });
  }
  return list;
}

const create = async({name},userId) => {
  const code = Date.now();
  debugLog('Creating new list',{
    name,
    userId,
    code
  });
  const id = await listRepo.create({name, userId, code});
  const list = await getById(id)
  return list
}

const updateById = async (id,{name}) => {
  debugLog(`Updating list with id ${id}`,{name});
  await listRepo.updateById(id,{name});
  const list = await getById(id);
  return list;
}

const deleteById = async (id) => {
  debugLog(`Deleting list with id ${id}`);
  await listRepo.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  getByCode,
  create,
  updateById,
  deleteById,
};