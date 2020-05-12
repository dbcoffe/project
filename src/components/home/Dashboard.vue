<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height: 175px">
                    <div class="user-info">
                        <img :src="road" class="user-avator" alt/>
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:428px;">
                    <div slot="header" class="clearfix">
                        <span>今日课表</span>
                    </div>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%;font-size: 12px"
                    >
                        <el-table-column
                                prop="date"
                                label="时间"
                                :span="12"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="class"
                                label="课程"
                                :span="12"
                                align="center"
                        >
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8" >
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>客户入馆数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-group grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{this.teacher}}</div>
                                    <div>教练人数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-favor grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{this.vip}}</div>
                                    <div>会员数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:453px;">
                    <el-col>
                        <el-card shadow="hover" style="margin-top: 30px">
                            <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                        </el-card>
                    </el-col>
                </el-card>
            </el-col>
          </el-row>
    </div>
</template>

<script>
  import Schart from "vue-schart";
  import bus from "../common/bus";

  export default {
    name: "dashboard",
    created() {
      this.begin()
    },
    data() {
      return {
        name: localStorage.getItem('username'),
        role: localStorage.getItem('userjob'),
        options: {
          type: "bar",
          title: {
            text: "今日场地入场情况"
          },
          xRorate: 25,
          labels: ["早上", "中午", "下午"],
          datasets: [
            {
              label: "有氧呼吸区",
              data: [234, 278, 244]
            },
            {
              label: "游泳馆",
              data: [47, 112, 138]
            },
            {
              label: "瑜伽，舞蹈室",
              data: [40, 42, 98]
            }
          ]
        },
        tableData:[
          {
          date:"10:00",
          class:""
        },
          {
          date:"11:00",
          class:""
        },
          {
            date:"12:00",
            class:""
          },
          {
            date:"14:00",
            class:""
          },
          {
            date:"15:00",
            class:""
          },
          {
            date:"16:00",
            class:""
          },
          {
            date:"17:00",
            class:""
          },
        ],
        road:"",
        vip:"",
        teacher:""
      };
    },
    components: {
      Schart
    },
    methods: {

      begin(){
        let url=localStorage.getItem('userpic');
        this.road=require("../../assets/img/"+url);
        var l = ["天","一","二","三","四","五","六"];
        var d = new Date().getDay();
        var str = "周" + l[d];
          this.$http.post("/api/class/today_class",{
            time:str,
        })
          .then((response) => {
            for (var i=0;i<7;i++){
              this.tableData[i].class=response.data[i].name;
            }
          });
        this.$http.get("/api/staff/all_teacher",{
        }).then((response) => {
          this.teacher=response.data.length
          });
        this.$http.get("/api/vip/all_vip",{
        }).then((response) => {
          this.vip=response.data.length
          })
      }
    }
  };
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 150px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 150px;
        text-align: center;
        line-height: 150px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
</style>
