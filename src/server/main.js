var admin = require('./router/admin')

module.exports = function (app) {
  app.use('/admin', admin)
}
