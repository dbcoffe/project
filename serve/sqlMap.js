var sqlMap = {
  class: {
    all: "select * from class",
    add: "update class set name=? ,teacher=? where mydata=? and mytime=?",
    today: "select * from class where mytime=? "

  },
  vip: {
    all: "select * from vip ",
    next: "select * from vip limit ?,?",
    change: "update vip set vip_name=? , vip_phone=? where vip_id=?",
    delete: "delete  from vip where vip_id=?",
    search: "select * from vip where (vip_cardkind=? or ?=0) and (vip_name=? or ?=0)",
    moreDelete: "delete from vip where vip_id=? or vip_id=? or vip_id=? or vip_id=? or vip_id=? or vip_id=? or vip_id=? or vip_id=? or vip_id=? or vip_id=?",
    add: "insert into vip(vip_name,vip_sex,vip_phone,vip_logintime,vip_lefttime,vip_card,vip_cardkind,vip_usetime,vip_time) VALUES(?,?,?,?,?,?,?,?,?)"
  },
  staff: {
    teacher: "select * from staff where staff_job='教练'",
    all: "select * from staff ",
    next: "select * from staff limit ?,?",
    change: "update staff set staff_kind=?,staff_begintime=?,staff_endtime=?,staff_kindreason=?where staff_id=?",
    delete: "delete  from staff where staff_id=?",
    search: "select * from staff where (staff_kind=? or ?=0) and (staff_name=? or ?=0)",
    moreDelete: "delete from staff where staff_id=? or staff_id=? or staff_id=? or staff_id=? or staff_id=? or staff_id=? or staff_id=? or staff_id=? or staff_id=? or staff_id=?",
    add: "insert into staff(staff_name,staff_passname,staff_password,staff_power,staff_job,staff_pic,staff_kind,staff_begintime,staff_endtime,staff_kindreason) VALUES(?,?,?,?,?,?,?,?,?,?)"
  },
  login:{
    log:"select * from staff where staff_passname=? and staff_password=?"
  },
  user:{
    password: "update staff set staff_password=? where staff_id=?",
    img: "update staff set staff_pic=? where staff_id=?",
  }
};
module.exports = sqlMap;