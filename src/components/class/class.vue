<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%;font-size: 15px"
        >
            <el-table-column
                    prop="date"
                    label="时间"
                    width="90"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="Mon"
                    label="周一"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="Tu"
                    label="周二"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="Thr"
                    label="周三"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="Whe"
                    label="周四"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="Fri"
                    label="周五"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="Str"
                    label="周六"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="Sun"
                    label="周天"
                    align="center">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
  export default {
    name: "class",
    created(){
      this.begin()
    },
    data() {
      return {
        tableData: [{
          date: '10:00',
          Mon:"",
          Tu:"",
          Thr:"",
          Whe:"",
          Fri:"",
          Str:"",
          Sun:"",
        }, {
          date: '11:00',
          Mon:"",
          Tu:"",
          Thr:"",
          Whe:"",
          Fri:"",
          Str:"",
          Sun:"",
        }, {
          date: '12:00',
          Mon:"",
          Tu:"",
          Thr:"",
          Whe:"",
          Fri:"",
          Str:"",
          Sun:"",
        }, {
          date: '14:00',
          Mon:"",
          Tu:"",
          Thr:"",
          Whe:"",
          Fri:"",
          Str:"",
          Sun:"",
        },{
          date:'15:00',
          Mon:"",
          Tu:"",
          Thr:"",
          Whe:"",
          Fri:"",
          Str:"",
          Sun:"",
        },{
          date:'16:00',
          Mon:"",
          Tu:"",
          Thr:"",
          Whe:"",
          Fri:"",
          Str:"",
          Sun:"",
        },{
          date:'17:00',
          Mon:"",
          Tu:"",
          Thr:"",
          Whe:"",
          Fri:"",
          Str:"",
          Sun:"",
        }]
      }
    },
    methods:{
      begin(){
        this.$http.get("/api/class/all_class",{
        })
          .then((response) => {
            for (var i=0;i<7;i++){
              this.tableData[i].Mon=response.data[0+i].name;
              this.tableData[i].Tu=response.data[7+i].name;
              this.tableData[i].Thr=response.data[14+i].name;
              this.tableData[i].Whe=response.data[21+i].name;
              this.tableData[i].Fri=response.data[28+i].name;
              this.tableData[i].Str=response.data[35+i].name;
              this.tableData[i].Sun=response.data[42+i].name;
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>