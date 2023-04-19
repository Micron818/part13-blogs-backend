const { sequelize } = require('../util/db')
const { Blog } = require('./blog')
const Membership = require('./membership')
const { Readinglist } = require('./readinglist')
const { Session } = require('./session')
const Team = require('./team')
const User = require('./user')

//fk: blogs_user_id_fkey
User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Team, { through: Membership }) //fk: memberships_user_id_fkey
Team.belongsToMany(User, { through: Membership }) // fk: memberships_team_id_fkey

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' }) //fk: readinglists_blog_id_fkey
Blog.belongsToMany(User, { through: Readinglist }) //fk: readinglists_user_id_fkey

User.hasHook(Session)
Session.belongsTo(User)

// sequelize.sync({ force: true })

module.exports = { Blog, User, Team, Membership, Readinglist }
