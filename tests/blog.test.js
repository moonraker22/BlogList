const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
// const helper = require('./test_helper')
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const createToken = async () => {
  const loginCredentials = {
    username: 'USER',
    password: 'password',
  }
  const loggedInUser = await api
    .post('/api/login')
    .send(loginCredentials)
    .expect(200)
  return loggedInUser.body.token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  // await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'USER', passwordHash })

  await user.save()

  const token = await createToken()
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(helper.initialBlogs[0])
})

describe('blogs api tests', () => {
  // jest.setTimeout(10000)
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'newBlog',
      author: 'newBlog',
      url: 'newBlog',
      likes: 2,
    }
    const token = await createToken()
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    console.log(response)
    const titles = response.body.map((r) => r.title)

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    expect(titles).toContain('newBlog')
  })

  it('returns blogs as json', async () => {
    const token = await createToken()
    await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)

      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('has a property named id', async () => {
    const token = await createToken()
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)

      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
  })

  it('verifies that if the likes property is missing, it will default to 0', async () => {
    const token = await createToken()

    const newBlog = {
      title: 'test blog 4',
      author: 'test author 4',
      url: 'test url 4',
      likes: undefined,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.map((r) => r.title)).toContain('test blog 4')
    expect(response.body.map((r) => r.likes)).toContain(0)
  })

  it('verifies that if the url property is missing, it will not be added to the database', async () => {
    const token = await createToken()

    const newBlog = {
      title: 'test blog 5',
      author: 'test author 5',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  it('deletes a blog entry', async () => {
    const token = await createToken()

    const blogs = await Blog.find({})
    const blogToDelete = blogs[0]
    const response = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const remainingBlogs = await Blog.find({})
    expect(remainingBlogs.length).toBe(blogs.length - 1)
    expect(response.body.length).toBe(undefined)
  })

  it('returns 401 if the user is not the author of the blog', async () => {
    const token = 'aDifferentUsersToken'

    const blogs = await Blog.find({})
    const blogToDelete = blogs[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(401)
  })

  it('updates a blog entry', async () => {
    const token = await createToken()
    const blogs = await Blog.find({})
    const blogToUpdate = blogs[0]
    const updatedBlog = {
      likes: 8,
    }
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedBlog)
      .expect(200)

    const remainingBlogs = await Blog.find({})
    expect(remainingBlogs.length).toBe(blogs.length)
    expect(response.body.likes).toBe(8)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
