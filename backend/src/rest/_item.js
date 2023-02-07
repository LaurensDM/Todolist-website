const Joi = require('joi');
const Router = require('@koa/router');

const {
  hasPermission,
  permissions,
} = require('../core/auth');
const itemService = require("../service/item");

const validate = require('./_validation.js');

const getByListId = async(ctx) => {
  ctx.body = await itemService.getByListId(ctx.params.listId);
  ctx.status = 200;
}
getByListId.validationScheme = {
  params: {
    listId: Joi.number().integer().positive(),
  }
}

const getById = async(ctx) => {
  ctx.body = await itemService.getById(ctx.params.id);
  ctx.status = 200;
}
getById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  }
}

const create = async(ctx) => {
  ctx.body = await itemService.create(ctx.request.body);
  ctx.status = 201;
}
create.validationScheme = {
  body :{
    name: Joi.string().max(128),
    description: Joi.string().max(512),
    listId:Joi.number().integer().positive(),
  }
}

const update = async(ctx) => {
  ctx.body = await itemService.updateById(ctx.params.id,ctx.request.body);
  ctx.status = 200;
}
update.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    name: Joi.string(),
    description: Joi.string(),
  }
}

const deleteItem = async (ctx) => {
  await itemService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteItem.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/item',
  });

  router.get('/list/:listId', hasPermission(permissions.loggedIn), validate(getByListId.validationScheme), getByListId);
  router.post('/', hasPermission(permissions.loggedIn), validate(create.validationScheme), create);
  router.get('/:id', hasPermission(permissions.loggedIn), validate(getById.validationScheme), getById);
  router.put('/:id', hasPermission(permissions.loggedIn), validate(update.validationScheme), update);
  router.delete('/:id', hasPermission(permissions.loggedIn), validate(deleteItem.validationScheme), deleteItem);

  app.use(router.routes()).use(router.allowedMethods());
}