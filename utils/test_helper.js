const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

// ...

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({})
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const initialBlogs = [
  {
    title: 'test blog 1',
    author: 'USER',
    url: 'test url 1',
    likes: 4,
  },
]

const newUser = {
  username: 'test user',
  name: 'test name',
  password: `${bcrypt.hash('password', 10)}`,
}

module.exports = {
  usersInDb,
  blogsInDb,
  nonExistingId,
  initialBlogs,
  newUser,
}
