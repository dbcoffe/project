<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="会员名字" prop="name" style="width: 400px">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="form.sex" >
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="会员手机" prop="phone" style="width: 400px">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="会员级别" prop="region">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="card1" label="普通年卡" value="普通年卡"></el-option>
                            <el-option key="card2" label="黄金年卡" value="黄金年卡"></el-option>
                            <el-option key="card3" label="钻石年卡" value="钻石年卡"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "add_vip",
    inject:["reload"],
    data() {
      return {
        form: {
          name: "",
          region: "",
          sex: "",
          phone: ""
        },
        rules: {
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择级别', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],

        }
      };
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var date = myDate.getDate();
            //获取当前时间
            var now = year + "-" + month + "-" + date;
            if (this.form.region == "普通年卡") {
              var last = (year + 1) + "-" + month + "-" + date;
            }
            if (this.form.region == "黄金年卡") {
              var last = (year + 2) + "-" + month + "-" + date;
            }
            if (this.form.region == "钻石年卡") {
              var last = (year + 3) + "-" + month + "-" + date;
            }
            this.$http.post("/api/vip/add_vip",{
              name:this.form.name,
              sex:this.form.sex,
              phone:this.form.phone,
              card:this.form.region,
              logintime:now,
              lefttime:last,
            })
              .then((response) => {
                console.log(response);
                this.$alert('添加成功', '提示', {
                  confirmButtonText: '确定',
                });
                this.reload()
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      }
    }
  };
</script>