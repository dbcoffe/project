var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
};

router.post('/password', (req, res) => {
  var sql = $sql.user.password;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.pass,params.id] ,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

router.post('/img', (req, res) => {
  var sql = $sql.user.img;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.img,params.id] ,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

module.exports = router;

