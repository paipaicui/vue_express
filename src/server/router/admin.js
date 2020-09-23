var express = require('express');
var router = express.Router();
var request = require("request");

router.use(function (req, res, next) {

  req.pipe(request({
    uri: 'http://localhost:3000' + req.url,
    encoding: null,
    timeout: 30000
  }).on('error', function (err) {
    res.json({
      status: '1',
      error: true,
      msg: err
    })
  }).on('response', function (response) {
    res.set(response.headers);
    if (response.statusCode === 200) {
      response.pipe(res);
    } else if (response.statusCode > 200 && response.statusCode < 300) {
      res.writeHead(response.statusCode, response.headers);
      response.pipe(res)
    } else {
      res.json({
        status: '2',
        error: true,
        msg: response
      })
    }
  }))
});

module.exports = router;
