const blogRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog(body)
  const user = await request.user
  blog.author = request.user.username

  if (!user) {
    return response.status(400).json({ error: 'user not found' })
  }

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'title and url are required' })
  }

  if (!request.body.likes) {
    blog.likes = 0
  }

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  const token = request.token

  if (!token) {
    return response.status(401).json({ error: 'unauthorized user' })
  }

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog?.author !== user?.username) {
    console.log(blog.author, user.username)
    return response.status(401).json({ error: 'unauthorized author' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  // console.log(blog._id.toString() === user.blogs.toString())
  if (!user) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  // if (blog?.author !== user?.username) {
  //   console.log(blog.author, user.username)
  //   return response.status(401).json({ error: 'unauthorized author' })
  // }

  blog.likes = request.body.likes
  await blog.save()
  response.json(blog)
})

module.exports = blogRouter
