module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('teams', [
      {
        id: 1,
        name: 'toska',
      },
      {
        id: 2,
        name: 'mosa climbers',
      },
    ])

    await queryInterface.bulkInsert('memberships', [
      {
        user_id: 1,
        team_id: 1,
      },
      {
        user_id: 1,
        team_id: 2,
      },
      {
        user_id: 2,
        team_id: 1,
      },
      {
        user_id: 2,
        team_id: 2,
      },
    ])
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('memberships', null, {})
    await queryInterface.bulkDelete('teams', null, {})
  },
}
