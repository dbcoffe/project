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

router.post('/log', (req, res) => {
  var sql = $sql.login.log;
  var params = req.body;
  console.log(params);
  conn.query(sql,[params.name,params.password] ,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result);
      jsonWrite(res, result);
    }
  })
});

module.exports = router;

