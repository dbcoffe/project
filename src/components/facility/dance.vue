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
    name: "dance",
    components: {
      Schart
    },
    data() {
      return {
        tableData:[
          {
            name:"瑜伽垫",
            type:"瑜伽垫",
            road:require("../../assets/img/dance1.jpg"),
            num:"20",
            used:"20",
            damage:"0",
            last:"0",
          },
          {
            name:"平衡球",
            type:"平衡球",
            road:require("../../assets/img/dance2.jpg"),
            num:"20",
            used:"15",
            damage:"0",
            last:"5",
          },
          {
            name:"半圆平衡球",
            type:"半圆平衡球",
            road:require("../../assets/img/dance3.jpg"),
            num:"20",
            used:"5",
            damage:"0",
            last:"15",
          },
        ],
        options4: {
          type: 'pie',
          title: {
            text: '设备使用人数'
          },
          bgColor: '#fbfbfb',
          labels: ['瑜伽垫', '平衡球',"半圆平衡球"],
          datasets: [
            {
              data: [20,15,5]
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