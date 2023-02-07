module.exports = {
  seed: async (knex) => {
    await knex('List').insert([
      {
        id: 1,
        name: 'Loon',
        userId: 1,
        code:'randomcode1',
      },
      {
        id: 2,
        name: 'Dranken Geers',
        userId: 1,
        code:'randomcode2',
      },
      {
        id: 3,
        name: 'Irish Pub',
        userId: 1,
        code:'randomcode3',
      },
    ]);
  },
};