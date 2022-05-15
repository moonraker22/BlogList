const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../utils/test_helper')

beforeAll(async () => {
  await User.deleteMany({})
  // await User.insertMany(helper.newUser)
  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'USER', passwordHash })

  await user.save()
})

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

describe('user creation and login', () => {
  const newUser = {
    username: 'testUser',
    name: 'Test User',
    password: `${bcrypt.hash('password', 10)}`,
  }

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const newUser = helper.newUser[0]

    await api
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .expect(400)
  })
})

it('successful login returns token', async () => {
  const token = await createToken()

  expect(token).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
