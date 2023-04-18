module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('readinglists', [
      {
        user_id: 1,
        blog_id: 1,
      },
      {
        user_id: 1,
        blog_id: 2,
      },
      {
        user_id: 2,
        blog_id: 2,
      },
      {
        user_id: 2,
        blog_id: 3,
      },
      {
        user_id: 2,
        blog_id: 4,
      },
    ])
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('readinglists', null, {})
  },
}
