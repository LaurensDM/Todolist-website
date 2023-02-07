module.exports = {
  up: async (knex) => {
    await knex.schema.createTable('Item', (table) => {
      table.increments('id');

      table.string('name',64);

      table.string('description', 512).nullable();
      
      table.integer('listId').unsigned().notNullable();

      table.foreign('listId', 'fk_Item_List').references('List.id').onDelete('CASCADE');

    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists('Item');
  },
};