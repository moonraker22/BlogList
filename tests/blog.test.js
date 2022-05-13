const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
// const helper = require('./test_helper')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'test blog 1',
    author: 'test author 1',
    url: 'test url 1',
    likes: 4,
  },
  {
    title: 'test blog 2',
    author: 'test author 2',
    url: 'test url 2',
    likes: 5,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('blogs api tests', () => {
  it('returns blogs as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect('Content-Type', /json/)

    expect(response.body.length).toBe(initialBlogs.length)
    expect(response.body.map((r) => r.title)).toContain('test blog 1')
  })

  it('has a property named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
  })

  it('creates a new blog', async () => {
    const newBlog = {
      title: 'test blog 3',
      author: 'test author 3',
      url: 'test url 3',
      likes: 6,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(response.body.map((r) => r.title)).toContain('test blog 3')
  })

  it('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'test blog 4',
      author: 'test author 4',
      url: 'test url 4',
      likes: undefined,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    console.log(response.body)
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(response.body.map((r) => r.title)).toContain('test blog 4')
    expect(response.body.map((r) => r.likes)).toContain(0)
  })

  it('verifies that if the url property is missing from the request, it will not be added to the database', async () => {
    const newBlog = {
      title: 'test blog 5',
      author: 'test author 5',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // const response = await api
    //   .get('/api/blogs')
    //   .expect(200)
    //   .expect('Content-Type', /application\/json/)

    // expect(response.body.length).toBe(initialBlogs.length + 1)
    // expect(response.body.map((r) => r.title)).toContain('test blog 5')
    // expect(response.body.map((r) => r.url)).not.toContain('test url 5')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
