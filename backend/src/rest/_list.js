const Joi = require('joi');
const Router = require('@koa/router');

const {
  hasPermission,
  permissions,
  addUserInfo,
} = require('../core/auth');
const listService = require('../service/list');
const userService = require('../service/user');

const validate = require('./_validation.js');

const getAll = async(ctx) => {
  let userId = 0;

    try {
      const user = await userService.getByAuth0Id(ctx.state.user.sub);
      userId = user.id;
    } catch (error) {
      await addUserInfo(ctx);
      userId = await userService.register({
        auth0id: ctx.state.user.sub,
        name: ctx.state.user.name,
        email: ctx.state.user.email,
      });
    }
  ctx.body = await listService.getAll(userId);
  ctx.status = 200;
}
getAll.validationScheme = null;

const getById = async(ctx) => {
  ctx.body = await listService.getById(ctx.params.id);
  ctx.status = 200;
}
getById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  }
}

const getByCode = async(ctx) => {
  ctx.body = await listService.getByCode(ctx.params.code);
  ctx.status = 200;
}
getByCode.validationScheme = null;

const create = async(ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (error) {
    await addUserInfo(ctx);
    userId = await userService.register({
      auth0id: ctx.state.user.sub,
      name: ctx.state.user.name,
      email: ctx.state.user.email,
    });
  }
  ctx.body = await listService.create(ctx.request.body,userId);
  ctx.status = 201;
}
create.validationScheme = {
  body: {
    name: Joi.string(),
  }
}

const update = async(ctx) => {
  ctx.body = await listService.updateById(ctx.params.id,ctx.request.body);
  ctx.status = 200;
}
update.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    name: Joi.string(),
  }
}

const deleteList = async(ctx) => {
  await listService.deleteById(ctx.params.id);
  ctx.status = 204;
}
deleteList.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  }
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/list',
  });

  router.get('/', hasPermission(permissions.loggedIn), validate(getAll.validationScheme), getAll);
  router.post('/', hasPermission(permissions.loggedIn), validate(create.validationScheme), create);
  router.get('/:id', hasPermission(permissions.loggedIn), validate(getById.validationScheme), getById);
  router.put('/:id', hasPermission(permissions.loggedIn), validate(update.validationScheme), update);
  router.delete('/:id', hasPermission(permissions.loggedIn), validate(deleteList.validationScheme), deleteList);


  app.use(router.routes()).use(router.allowedMethods());
};