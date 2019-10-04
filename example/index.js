// Idea for gateway usage

const app = require('microsia-gateway')

const routes = {
  hello: 'greater.hello', // /api/hello
  hi: 'greater.hi', // /api/hi
  status: 'healthy.status', // /api/status
  custom: async (req, res) => {
    const [fooRes, barRes] = await Promise.all([
      app.call('foo.get', req),
      app.call('bar.get', req),
    ])

    res.json({
      fooRes,
      barRes,
    })
  },
}

// We can use any express middleware or custom middleware here
const middlewares = [
  function greater(req, res, next) {
    console.log('Greater service was called')
    next()
  },
]

app.createGateway({
  restrict: true,
  prefix: 'api',
  routes,
  middlewares,
})

// Or use route/middleware manual
app.use('baz', (req, res, next) => {

})

module.exports = app
