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

//获取数据
router.get('/all_class', (req, res) => {
  var sql = $sql.class.all;
  var params = req.body;
  console.log(params);
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.send(result);
    }
  })
});

router.post('/add_class', (req, res) => {
  var sql = $sql.class.add;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.name,params.teacher,params.time,params.daytime], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.send(result);
    }
  })
});

router.post('/today_class', (req, res) => {
  var sql = $sql.class.today;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.time], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.send(result);
    }
  })
});

module.exports = router;

