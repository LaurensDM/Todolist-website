module.exports = {
  up: async (knex) => {
    await knex.schema.createTable('List', (table) => {
      table.increments('id');

      table.string('name', 64).notNullable();

      table.integer('userId').unsigned().notNullable();

      table.string('code', 32).notNullable();

      table.unique('code', 'idx_group_code_unique');

      table.foreign('userId','fk_List_User').references('Users.id').onDelete('CASCADE');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists('List');
  },
};