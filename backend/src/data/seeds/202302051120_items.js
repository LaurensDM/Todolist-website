module.exports = {
  seed: async (knex) => {
    await knex('Item').insert([
      {
        id: 1,
        name: "first item",
        description: 'Something',
        listId: 1,

      },
      {
        id: 2,
        name: "second item",
        description: 'Something',
        listId: 1,

      },
      {
        id: 3,
        name: "third item",
        description: 'Something',
        listId: 1,

      },
    ]);
  },
};