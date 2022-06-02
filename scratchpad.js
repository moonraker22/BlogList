const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if (favorite.likes < blog.likes) {
      return blog
    }
    return favorite
  }, blogs[0])
}

let x = favoriteBlog(blogs)

console.log(x)
const _ = require('lodash')

var users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 34 },
]

console.log(
  _.sortBy(users, [
    function (o) {
      return o.user
    },
  ])
)
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]

console.log(_.sortBy(users, ['user', 'age']))
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
console.log(_.sortBy(blogs, ['likes', 'title']))

// The `_.property` iteratee shorthand.
console.log(_.map(blogs, _.iteratee('author')))
// => ['barney', 'fred']

console.log(_.countBy(blogs, 'author'))
const arr = []
arr.push(_.countBy(blogs, 'author'))
console.log(arr)
// let a = _.countBy(blogs, 'author')
// arr.forEach((value, key) => {
//   Object.keys(value).forEach((key) => {
//     console.log(_.)
//   })
// // })
// console.log(_.groupBy(blogs, 'author'))
// let aa = _.groupBy(blogs, 'author')

// console.log(
//   blogs.map((blog) => {
//     console.log(blog.author)
//   })
// )
// console.log(_.groupBy(blogs, 'author'))
let b = []
_.forEach(blogs, (blog) => {
  b.push(blog.author)
})
console.log('BB', b)

console.log(
  _.maxBy(blogs, (blog) => {
    return blog.likes
  })
)
console.log(_.countBy(blogs, 'author'))
let w = _.countBy(blogs, 'author')
console.log('WW', w)

for (let key in w) {
  console.log(key)
  console.log(w[key])
}
console.log(_.map(blogs, _.iteratee('author')))
// let r = _.map(blogs, _.iteratee('author'))

const authors = blogs.map((blog) => blog.author)
const authorsCount = authors.reduce((count, author) => {
  count[author] = (count[author] || 0) + 1
  return count
}, {})
console.log(authorsCount)

console.log(authors)
const z = _.keys(w).reduce(
  (most, author) => {
    console.log(most, author, authorsCount[author], most.blogs)
    if (authorsCount[author] > most.blogs) {
      most.blogs = authorsCount[author]
      console.log(most.blogs)
      most.author = author
      console.log(most.author)
    }
    return most
  },
  { blogs: 0, author: '' }
)

console.log(z)

const MostLikes = blogs.reduce(
  (most, blog) => {
    if (most.likes < blog.likes) {
      most.likes = blog.likes
      most.title = blog.title
      most.author = blog.author
      most.url = blog.url
    }
    return most
  },
  { likes: 0, title: '', author: '', url: '' }
)
console.log(MostLikes)
// console.log(
//   Object.keys(authors).reduce(
//     (a, b, c, d) => {
//       console.log('A', a.blogs, authorsCount[b])
//       console.log('B', b)
//       console.log('c', c)
//       console.log('d', d)
//       return a
//     },
//     { author: '', blogs: 0 }
//   )
// )

// console.log(
//   _.transform(
//     w,
//     (most, author, acc) => {
//       console.log('transform', most, author, acc)
//       if (authorsCount[author] > most.blogs) {
//         most.blogs += authorsCount[author]
//         most.author += author
//       }
//       return most.blogs > most.author
//     },
//     { blogs: 0, author: '' }
//   )
// )

// console.log(
//   _.reduce(
//     w,
//     (most, author, acc) => {
//       console.log('reduce', most, author, acc)
//       if (authorsCount[author] > most.blogs) {
//         most.blogs = authorsCount[author]
//         most.author = author
//       }
//       return most
//     },
//     { blogs: 0, author: '' }
//   )
// )
// const mostLikes1 = (blogs) => {
// let count = _.countBy(blogs, 'likes')
// // let most = _.maxBy(Object.keys(count)., (key) => {
// //   return count[key]
// // })
// // let u = blogs.filter((blog) => blog.likes === most)
// // console.log(u)
// console.log(parseInt(Object.keys(count)))
// // return most
// // }
// let most = _.maxBy(Object.keys(count), (key) => {
//   return count[key]
// })
// console.log(most)
// console.log(count)
// let max = 0

// for (let key in count) {
//   console.log(parseInt(key))
//   if (parseInt(key) > max) {
//     max = parseInt(key)
//   }
// }
// console.log(max)
// const auth = blogs.filter((blog) => blog.likes === max)
// console.log(auth)
// const ret = { author: '', likes: 0 }
// _.forEach(auth, (blog) => {
//   if (blog.likes > ret.likes) {
//     ret.author = blog.author
//     ret.likes = blog.likes
//   }
// })
// console.log(ret)

//   const mostLikes = _.keys(count).reduce(
//     (most, author) => {
//       if (count[author] > most.likes) {
//         most.likes = count[author]
//         most.author = author
//       }
//       return most
//     },
//     { author: '', likes: 0 }
//   )
//   return mostLikes
// }
// console.log(mostLikes1(blogs))
// let count = _.countBy(blogs, 'likes')

// let max = 0

// for (let key in count) {
//   console.log(parseInt(key))
//   if (parseInt(key) > max) {
//     max = parseInt(key)
//   }
// }
// console.log(max)
// const auth = blogs.filter((blog) => blog.likes === max)
// console.log(auth)
// const ret = { author: '', likes: 0 }
// _.forEach(auth, (blog) => {
//   if (blog.likes > ret.likes) {
//     ret.author = blog.author
//     ret.likes = blog.likes
//   }
// })
// console.log(ret)
let q = _.countBy(blogs, 'author')
console.log('WW', q)
// let totalLikesForEachAuthor = _.map(w, (author) => {
//   return author.likes
// })
// console.log('totalLikesForEachAuthor', totalLikesForEachAuthor)
// let names = _.keys(q)
// console.log('names', names)
// let totalLikes = _.map(names, (author) => {
//   return w[author]
// })
// const Total = blogs.reduce(
//   (total, blog) => {
//     total += blog.likes
//     return total
//   },
//   { total: 0 }
// )
// console.log('Total', Total)

const tot = {}
blogs.map((blog) => {
  if (tot[blog.author]) {
    tot[blog.author] += blog.likes
  } else {
    tot[blog.author] = blog.likes
  }
})
console.log('tot', tot)
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
console.log('mostLikes', mostLikes)

const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const sorted = blogs.sort((a, b) => {
  if (a.title < b.title) {
    return -1
  }
})
console.log('sorted', sorted)
