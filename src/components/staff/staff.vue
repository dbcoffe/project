<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除</el-button>
                <el-select v-model="query.kind" placeholder="状态" class="handle-select mr10">
                    <el-option key="1" label="正常" value="正常"></el-option>
                    <el-option key="2" label="请假" value="请假"></el-option>
                    <el-option key="3" label="不选择" value=""></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="员工名字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="员工名字"></el-table-column>
                <el-table-column prop="job" label="员工职业"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        {{scope.row.kind}}
                    </template>
                </el-table-column>
                <el-table-column prop="begintime" label="开始时间" align="center"></el-table-column>
                <el-table-column prop="endtime" label="结束时间" align="center" > </el-table-column>
                <el-table-column prop="reason" label="理由" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next,sizes"
                        :current-page="query.pageIndex"
                        :page-sizes="[2, 5, 10]"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                        @size-change="handleSizeChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="职业">
                    <el-input v-model="form.job"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.kind" >
                        <el-option label="正常" value="正常"></el-option>
                        <el-option label="请假" value="请假"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="原因">
                    <el-input v-if="form.kind == '正常'" size="small" v-model="form.reason"
                              :disabled="true"></el-input>
                    <el-input v-else v-model="form.reason" :disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                            v-if="form.kind == '正常'"
                            v-model="form.begintime"
                            type="date"
                            :disabled="true" >
                    </el-date-picker>
                    <el-date-picker
                            v-else
                            v-model="form.begintime"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :disabled="false" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                            v-if="form.kind == '正常'"
                            v-model="form.endtime"
                            type="date"

                            :disabled="true" >
                    </el-date-picker>
                    <el-date-picker
                            v-else
                            v-model="form.endtime"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :disabled="false" >
                    </el-date-picker>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'staff',
    inject:["reload"],
    data() {
      return {
        query: {
          kind: '',
          name: '',
          pageIndex: 1,
          pageSize: 2
        },
        tableData: [],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        pageTotal: 0,
        form: {},
        idx: -1,
        id: -1
      };
    },
    created() {
      this.begin()
    },
    methods: {
      begin(){
        this.$http.get("/api/staff/all_staff",{
        })
          .then((response) => {
            this.pageTotal=response.data.length;
            for(var i=0;i<2;i++){
              this.tableData.push({
                id:response.data[i].staff_id,
                name:response.data[i].staff_name,
                job:response.data[i].staff_job,
                kind:response.data[i].staff_kind,
                begintime:response.data[i].staff_begintime,
                endtime:response.data[i].staff_endtime,
                reason:response.data[i].staff_kindreason,

              })
            }
          })
      },
      // 触发搜索按钮
      handleSearch() {

        if (this.query.name==""){
          var a=0
        }else {
          a=1
        }

        if (this.query.kind=="") {
          var b = 0
        }else {
          b=1
        }
        var myname=this.query.name;
        var mykind=this.query.kind;
        this.$http.post("/api/staff/search_staff",{
          kind:mykind,num:b,name:myname,num2:a
        })
          .then((response) => {
            this.pageTotal=response.data.length;
            this.tableData=[];
            for(var i=0;i<this.query.pageSize;i++) {
              this.tableData.push({
                id:response.data[i].staff_id,
                name:response.data[i].staff_name,
                job:response.data[i].staff_job,
                kind:response.data[i].staff_kind,
                begintime:response.data[i].staff_begintime,
                endtime:response.data[i].staff_endtime,
                reason:response.data[i].staff_kindreason,
              })
            }
          });
      },
      // 删除操作
      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            var a=row.id;
            this.$http.post("/api/staff/delete_staff",{
              id:a,
            })
              .then((response) => {
                console.log(response);
                this.$alert('删除成功', '提示', {
                  confirmButtonText: '确定',
                });
                this.reload()
              });
          })
          .catch(() => {});
      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      delAllSelection() {
        var Array=[];
        const length = this.multipleSelection.length;
        let str = '';
        this.delList = this.delList.concat(this.multipleSelection);
        for (let i = 0; i < length; i++) {
          Array.push(this.multipleSelection[i].id );
        }
        for(var i=Array.length;i<10;i++){
          Array.push(0)
        }
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$http.post("/api/staff/moreDelete_staff",{
              id:Array[0],
              id1:Array[1],
              id2:Array[2],
              id3:Array[3],
              id4:Array[4],
              id5:Array[5],
              id6:Array[6],
              id7:Array[7],
              id8:Array[8],
              id9:Array[9],
            })
              .then((response) => {
                console.log(Array);
                this.multipleSelection = [];
                Array=[];
                this.$alert('删除成功', '提示', {
                  confirmButtonText: '确定',
                });
                this.reload()
              });
          })
          .catch(() => {});
      },
      // 编辑操作
      handleEdit(index, row) {
        this.idx = index;
        this.form = row;
        this.editVisible = true;

      },
      // 保存编辑
      saveEdit() {
        var a=this.form.kind;
        if (a=="请假"){
          var b=this.form.reason;
          var c=this.form.begintime;
          var d=this.form.endtime;
        } ;
        if (a=="正常"){
          var b="";
          var c="";
          var d="";
        } ;
        console.log(b)
        console.log(c)
        console.log(d)
        this.$http.post("/api/staff/change_staff",{
          kind:a,reason:b,begintime:c,endtime:d,id:this.form.id
        })
          .then((response) => {
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
            });
          });
        this.editVisible = false
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        if(this.query.pageIndex==1){
          var a=this.query.pageIndex-1;
          var b=this.query.pageSize;
        }
        if(this.query.pageIndex!=1 ) {
          var a=(this.query.pageIndex-1)*this.query.pageSize;
          var b=this.query.pageIndex*this.query.pageSize;
        }
        this.$http.post("/api/staff/next_staff",{
          top:a,last:b,
        })
          .then((response) => {
            this.tableData=[];
            for(var i=0;i<this.query.pageSize;i++){
              this.tableData.push({
                id:response.data[i].staff_id,
                name:response.data[i].staff_name,
                job:response.data[i].staff_job,
                kind:response.data[i].staff_kind,
                begintime:response.data[i].staff_begintime,
                endtime:response.data[i].staff_endtime,
                reason:response.data[i].staff_kindreason,

              })
            }
          })
      },
      handleSizeChange(val) {
        this.query.pageSize=val;
        this.$http.get("/api/staff/all_staff",{
        })
          .then((response) => {
            this.tableData=[];
            for(var i=0;i<val;i++){
              this.tableData.push({
                id:response.data[i].staff_id,
                name:response.data[i].staff_name,
                job:response.data[i].staff_job,
                kind:response.data[i].staff_kind,
                begintime:response.data[i].staff_begintime,
                endtime:response.data[i].staff_endtime,
                reason:response.data[i].staff_kindreason,


              })
            }
          })
      },
    }
  };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
