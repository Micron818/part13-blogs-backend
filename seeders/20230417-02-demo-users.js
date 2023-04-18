module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkUpdate(
      'users',
      { admin: true },
      {
        id: 1,
      }
    )
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkUpdate(
      'users',
      { admin: false },
      {
        id: 1,
      }
    )
  },
}
