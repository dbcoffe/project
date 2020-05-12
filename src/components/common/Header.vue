<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img :src="road"/>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="password">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="img">修改头像</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <el-dialog title="更改密码" :visible.sync="editVisible" width="30%">
                    <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules" label-width="110px">
                        <el-form-item label="请输入密码" prop="pass">
                            <el-input v-model="ruleForm2.pass"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input v-model="ruleForm2.checkPass"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit('ruleForm2')">确 定</el-button>
                     </span>
                </el-dialog>

                <el-dialog title="更改头像" :visible.sync="editVisible2" width="30%">
                    <el-form ref="ruleForm" :model="ruleForm" :rules="rules2" label-width="110px">
                        <el-form-item label="选择图片">
                            <input type="file" name="fileup" id="uploadEventFile" v-on:change="fileChange($event)"
                                   style="display:none">
                            <el-button type="primary" plain @click="importData($event)">选择文件</el-button>
                            <span style="margin-left: 10px" v-if="this.file_name !='' " >{{this.file_name}}</span>
                            <div style="color:#F56C6C" v-if="this.aa==0">*请选择图片</div>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="saveimg()">确 定</el-button>
                     </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
  import bus from "../common/bus";
  import $ from 'jquery'
  export default {
    inject:["reload"],
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.ruleForm2.checkPass !== "") {
            this.$refs.ruleForm2.validateField("checkPass");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        collapse: false,
        fullscreen: false,
        name: "linxin",
        message: 2,
        road: "",
        aa:"1",
        editVisible: false,
        editVisible2: false,
        file_name:"",
        ruleForm2: {
          pass: "",
          checkpass: ""
        },
        ruleForm: {
         aa:""
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: "blur" },
            { min: 6, message: '最少6个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: "blur" },
          ],
        },
        rules2: {
          pop: [
            { required: true, message: '请选择图片', trigger: 'change' }
          ]
        }
      };
    },
    created() {
      this.begin();
    },
    computed: {
      username() {
        let username = localStorage.getItem("username");
        return username ? username : this.name;
      }
    },
    methods: {
      begin() {

        let url = localStorage.getItem("userpic");
        this.road = require("../../assets/img/" + url);

      },
      saveEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var a=localStorage.getItem('userid');
            this.$http.post("/api/user/password",{
                id:a,
              pass:this.ruleForm2.pass,
            })
              .then((response) => {
                this.$alert('更改成功', '提示', {
                  confirmButtonText: '确定',
                });
                this.editVisible=false
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      saveimg() {
            var a=localStorage.getItem('userid');
            this.$http.post("/api/user/img",{
                id:a,
              img:this.file_name,
            })
              .then((response) => {
                this.$alert('更改成功', '提示', {
                  confirmButtonText: '确定',
                });
                localStorage.setItem('userpic', this.file_name);
                this.editVisible2=false;
                this.reload()
              });
      },
      importData(event) {
        event.preventDefault();
        $('#uploadEventFile').trigger('click');

      },
      fileChange(el) {
        el.preventDefault();//取消默认行为
        let uploadEventFile = $('#uploadEventFile').val();
        console.log(uploadEventFile.lastIndexOf('.jpg'));
        this.file_name = uploadEventFile.split('\\')[2];
        if (uploadEventFile.lastIndexOf('.jpg') < 0) {
          this.aa = 0;
          console.log(this.aa)
        } else {
          this.aa = 1;
        }
      },
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if (command == "loginout") {
          localStorage.clear();
          this.$router.push("/login");
        }
        if (command == "password") {
          this.editVisible = true;
        }
        if (command == "img") {
          this.editVisible2 = true;
        }
      },
      // 侧边栏折叠
      collapseChage() {
        this.collapse = !this.collapse;
        bus.$emit("collapse", this.collapse);
      },
      // 全屏事件
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    },
    mounted() {
      if (document.body.clientWidth < 1500) {
        this.collapseChage();
      }
    }
  };
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }

    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }

    .header .logo {
        float: left;
        width: 250px;
        line-height: 70px;
    }

    .header-right {
        float: right;
        padding-right: 50px;
    }

    .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
    }

    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }

    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }

    .btn-bell .el-icon-bell {
        color: #fff;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avator {
        margin-left: 20px;
    }

    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
