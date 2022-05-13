const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if (favorite.likes < blog.likes) {
      return blog
    }
    return favorite
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  let count = _.countBy(blogs, 'author')
  const mostBlogs = _.keys(count).reduce(
    (most, author) => {
      if (count[author] > most.blogs) {
        most.blogs = count[author]
        most.author = author
      }
      return most
    },
    { author: '', blogs: 0 }
  )
  return mostBlogs
}

const mostLikes = (blogs) => {
  const tot = {}
  blogs.map((blog) => {
    if (tot[blog.author]) {
      tot[blog.author] += blog.likes
    } else {
      tot[blog.author] = blog.likes
    }
  })
  const mostLikes = _.keys(tot).reduce(
    (most, author) => {
      if (tot[author] > most.likes) {
        most.likes = tot[author]
        most.author = author
      }
      return most
    },
    { author: '', likes: 0 }
  )
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
