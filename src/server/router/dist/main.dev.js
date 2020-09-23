"use strict";

var admin = require('./admin');

module.exports = function (app) {
  app.use('/admin', admin);
};