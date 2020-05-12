<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">健身房后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  inject:["reload"],
    data: function() {
        return {
            param: {},
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                  var a=this.param.username;
                  var b=this.param.password;
                  console.log(a,b)
                  this.$http.post("/api/login/log",{
                    name:a,password:b
                    })
                    .then((response) => {
                      console.log(response.data)
                    if (response.data.length==0){
                      this.$alert('账号或密码错误', '错误', {
                        confirmButtonText: '确定',
                      });
                      this.reload();
                    }
                    if (response.data.length==1){
                        this.$alert('登录成功', '提示', {
                          confirmButtonText: '确定',
                        });
                        console.log(response.data);
                        localStorage.setItem('userpower', response.data[0].staff_power);
                        localStorage.setItem('username', response.data[0].staff_name);
                        localStorage.setItem('userjob', response.data[0].staff_job);
                        localStorage.setItem('userid', response.data[0].staff_id);
                        localStorage.setItem('userpic', response.data[0].staff_pic);
                        this.$router.push('/dashboard');
                      }
                  });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>