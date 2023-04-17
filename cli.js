const { Blog } = require('./models')

const main = async () => {
  const blogs = await Blog.findAll()
  blogs.forEach((blog) =>
    console.log(`${blog.author}:'${blog.title}',${blog.likes} likes`)
  )
}

main()
