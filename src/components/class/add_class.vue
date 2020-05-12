<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="课程名称" prop="name" style="width: 400px">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="教练名字" prop="teacher">
                            <el-cascader :options="teacher" v-model="form.teacher"></el-cascader>

                    </el-form-item>
                    <el-form-item label="上课时间" prop="time">
                        <el-select v-model="form.time" placeholder="请选择">
                            <el-option key="time1" label="10:00" value="10:00"></el-option>
                            <el-option key="time2" label="11:00" value="11:00"></el-option>
                            <el-option key="time3" label="12:00" value="12:00"></el-option>
                            <el-option key="time4" label="14:00" value="14:00"></el-option>
                            <el-option key="time5" label="15:00" value="15:00"></el-option>
                            <el-option key="time6" label="16:00" value="16:00"></el-option>
                            <el-option key="time7" label="17:00" value="17:00"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  prop="daytime">
                        <el-select v-model="form.daytime" placeholder="请选择">
                            <el-option key="daytime1" label="周一" value="周一"></el-option>
                            <el-option key="daytime2" label="周二" value="周二"></el-option>
                            <el-option key="daytime3" label="周三" value="周三"></el-option>
                            <el-option key="daytime4" label="周四" value="周四"></el-option>
                            <el-option key="daytime5" label="周五" value="周五"></el-option>
                            <el-option key="daytime6" label="周六" value="周六"></el-option>
                            <el-option key="daytime7" label="周天" value="周天"></el-option>
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
    name: 'add_class',
    inject:["reload"],
    created(){
        this.first()
  },
    data() {
      return {
        teacher: [],
        form: {
          name: '',
         time:"",
          daytime:"",
         teacher: [],
        },
        rules:{
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
          ],
          teacher: [
            { required: true, message: '请选择教练', trigger: 'change' }
          ],
          time: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
          daytime: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      first() {
        this.$http.get("/api/staff/all_teacher",{
        })
          .then((response) => {
            for(var i=0;i<response.data.length;i++){
              this.teacher.push({
                    value:response.data[i].staff_name,
                    label:response.data[i].staff_name,
              })
            }
          })
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var a=this.form.name+" 教练 : "+this.form.teacher;
            this.$http.post("/api/class/add_class",{
              name:a,
              time:this.form.time,
              daytime:this.form.daytime,
              teacher:this.form.teacher[0],
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

      },
    }
  };
</script>