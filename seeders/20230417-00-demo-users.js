module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'hellas',
        name: 'Arto Hellas',
      },
      {
        id: 2,
        username: 'mluukai',
        name: 'Matti Luukkainen',
      },
    ])
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}
