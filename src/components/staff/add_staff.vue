<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="员工号" prop="name" style="width: 400px" >
                        <el-input v-model="form.nu" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="员工名字" prop="name" style="width: 400px">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="员工级别" prop="region">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="card1" label="普通职员" value="普通职员"></el-option>
                            <el-option key="card2" label="教练" value="教练"></el-option>
                        </el-select>
                    </el-form-item>
                    <div style="margin:0 0 10px 2px;color: #606266 "><a class="red">* </a> 员工初始密码为 : <a class="red">111111</a></div>
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
    name: "add_staff",
    inject:["reload"],
    data() {
      return {
        form: {
          name: "",
          region: "",
          nu:"",
        },
        rules: {
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择级别', trigger: 'change' }
          ],
        }
      };
    },
    created(){
      this.onbegin()
    },
    methods: {
      onbegin(){
        this.$http.get("/api/staff/all_staff",{
        })
          .then((response) => {
            var a=response.data.length-1;
            this.form.nu=response.data[a].staff_id + 101
          })
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post("/api/staff/add_staff",{
              name:this.form.name,
              nu:this.form.nu,
              job:this.form.region,
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
<style scoped>
.red{
    color: #F56C6C;
    margin-right: 5px;
}
</style>