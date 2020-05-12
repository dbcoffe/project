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
router.get('/all_vip', (req, res) => {
  var sql = $sql.vip.all;
  var params = req.body;
  console.log(params);
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result);
      res.send(result);
    }
  })
});

router.post('/next_vip', (req, res) => {
  var sql = $sql.vip.next;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.top,params.last] ,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

router.post('/change_vip', (req, res) => {
  var sql = $sql.vip.change;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.name,params.phone,params.id] ,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

router.post('/delete_vip', (req, res) => {
  var sql = $sql.vip.delete;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.id] ,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

router.post('/search_vip', (req, res) => {
  var sql = $sql.vip.search;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.kind,params.num,params.name,params.num2] ,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

router.post('/moreDelete_vip', (req, res) => {
  var sql = $sql.vip.moreDelete;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.id,params.id1,params.id2,params.id3,params.id4,params.id5,params.id6,params.id7,params.id8,params.id9,] ,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});


router.post('/add_vip', (req, res) => {
  var sql = $sql.vip.add;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.name,params.sex,params.phone,params.logintime,params.lefttime,params.card,'正常',0,0] ,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

module.exports = router;

