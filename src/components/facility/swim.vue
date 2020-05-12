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
            <el-table-column prop="num" label="数量" align="center"></el-table-column>
            <el-table-column prop="used" label="使用率" align="center"></el-table-column>
            <el-table-column prop="damage" label="损坏率" align="center"></el-table-column>
            <el-table-column prop="last" label="库存剩余" align="center"></el-table-column>
        </el-table>
    </div>

</template>

<script>
  import Schart from 'vue-schart';
  export default {
    name: "swim",
    components: {
      Schart
    },
    data() {
      return {
        tableData:   [
          {
          name:"泳帽",
          type:"泳帽",
          road:require("../../assets/img/swim1.jpg"),
          num:"20",
          used:"5",
          damage:"0",
          last:"15",
        },
            {
        name:"泳镜",
          type:"泳镜",
        road:require("../../assets/img/swim2.jpg"),
        num:"20",
        used:"10",
        damage:"0",
        last:"10",
      },
    ],
      options4: {
        type: 'pie',
          title: {
          text: '设备使用人数'
        },
        bgColor: '#fbfbfb',
          labels: ['泳帽', '泳镜'],
          datasets: [
          {
            data: [5,10]
          }
        ]
      },
    };
    }
  };
</script>

<style scoped>
    .schart {
        height: 400px;
    }
</style>
