module.exports = {
  seed: async (knex) => {
    // first delete all entries in every table
    await knex('Item').delete();
    await knex('List').delete();
    await knex('Users').delete();   
  },
};