<template>
    <div>
        <el-row :gutter="20">
            <el-card shadow="hover" style="height:400px;">
                <el-col>
                    <el-card shadow="hover">
                        <schart class="schart" canvasId="line2" :options="options4"></schart>
                    </el-card>
                </el-col>
            </el-card>
        </el-row>
        <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
        >
            <el-table-column prop="name" label="设施名字" align="center"></el-table-column>
            <el-table-column prop="type" label="设施型号" align="center"></el-table-column>
            <el-table-column  label="图片" align="center">
                <template slot-scope="scope">
                    <el-image
                            :src="scope.row.road"
                            style=" height: 100px;width: 100px;margin: auto"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="总数量" align="center"></el-table-column>
            <el-table-column prop="used" label="已使用" align="center"></el-table-column>
            <el-table-column prop="damage" label="已损坏" align="center"></el-table-column>
            <el-table-column prop="last" label="库存剩余" align="center"></el-table-column>
        </el-table>

    </div>

</template>

<script>
  import Schart from 'vue-schart';
  export default {
    name: "aerobics",
    components: {
      Schart
    },
    data() {
      return {
        tableData:[
          {
          name:"跑步机",
          type:"速尔F950L",
          road:require("../../assets/img/aerobics.jpg"),
          num:"15",
          used:"10",
          damage:"3",
            last:"2"
        },
          {
          name:"划船器",
          type:"速尔SR950",
          road:require("../../assets/img/aerobics3.png"),
          num:"10",
          used:"8",
          damage:"1",
            last:"1",
        },
          {
          name:"动感单车",
          type:"泰诺健SKTLLBIKE",
          road:require("../../assets/img/aerobics2.jpg"),
          num:"10",
          used:"8",
          damage:"2",
            last:"0"
        },
          {
          name:"上身拉伸器",
          type:"泰诺健ANTERIOR",
            road:require("../../assets/img/aerobics4.gif"),
          num:"5",
          used:"5",
          damage:"0",
            last:"0",
        },
        ],
        options4: {
          type: 'pie',
          title: {
            text: '器材损坏情况'
          },
          bgColor: '#fbfbfb',
          labels: ['跑步机', '动感单车', '划船器', '上身拉伸器'],
          datasets: [
            {
              data: [3,1,2,0]
            }
          ]
        },
      };
    },
    // methods:{
    //   qqq(){
    //     console.log(this.row)
    //   }
    // }
  };
</script>

<style scoped>
    .schart {
        height: 400px;
    }
</style>