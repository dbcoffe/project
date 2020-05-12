<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                unique-opened
                router
        >
            <template v-for="item in items">

                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                    v-if="subItem.subs"
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                >{{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
  import bus from "../common/bus";

  export default {
    data() {
      return {
        collapse: false,
        // items: [
        //   {
        //     icon: "el-icon-lx-home",
        //     index: "dashboard",
        //     title: "首页",
        //     meta:{
        //       roles:["admin","teacher"]
        //     }
        //   },
        //   {
        //     icon: "el-icon-lx-people",
        //     index: "table",
        //     title: "会员",
        //     subs: [
        //       {
        //         index: "table",
        //         title: "会员详情"
        //       },
        //       {
        //         index: "add_vip",
        //         title: "添加会员"
        //       }
        //     ]
        //   },
        //   {
        //     icon: "el-icon-lx-calendar",
        //     index: "class",
        //     title: "课程",
        //     subs: [
        //       {
        //         index: "class",
        //         title: "课程表"
        //       },
        //       {
        //         index: "add_class",
        //         title: "添加课程"
        //       }
        //     ]
        //   },
        //   {
        //     icon: "el-icon-lx-group",
        //     index: "staff",
        //     title: "员工",
        //     subs: [
        //       {
        //         index: "staff",
        //         title: "员工详情"
        //       },
        //       {
        //         index: "add_staff",
        //         title: "添加员工"
        //       }
        //     ]
        //   },
        //   {
        //     icon: "el-icon-lx-cascades",
        //     index: "facility",
        //     title: "场地",
        //     subs: [
        //       {
        //         index: "aerobics",
        //         title: "有氧呼吸区"
        //       },
        //       {
        //         index: "swim",
        //         title: "游泳馆"
        //       },
        //       {
        //         index: "dance",
        //         title: "瑜伽,舞蹈室"
        //       }
        //
        //     ]
        //   },
        //   {
        //     icon: "el-icon-lx-rank",
        //     index: "statistics",
        //     title: "统计",
        //     meta:{
        //       roles:["admin"]
        //     }
        //   }
        // ]
        items:[],
      };
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace("/", "");
      }
    },
    created() {
      this.choose();
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on("collapse", msg => {
        this.collapse = msg;
        bus.$emit("collapse-content", msg);
      });
    },
    methods:{
      choose(){
        if (localStorage.getItem('userpower')=="1"){
          this.items.push(
            {
              icon: "el-icon-lx-home",
              index: "dashboard",
              title: "首页",
              meta:{
                roles:["admin","teacher"]
              }
            },
            {
              icon: "el-icon-lx-people",
              index: "table",
              title: "会员",
              subs: [
                {
                  index: "table",
                  title: "会员详情"
                },
                {
                  index: "add_vip",
                  title: "添加会员"
                }
              ]
            },
            {
              icon: "el-icon-lx-calendar",
              index: "class",
              title: "课程",
              subs: [
                {
                  index: "class",
                  title: "课程表"
                },
                {
                  index: "add_class",
                  title: "添加课程"
                }
              ]
            },
            {
              icon: "el-icon-lx-group",
              index: "staff",
              title: "员工",
              subs: [
                {
                  index: "staff",
                  title: "员工详情"
                },
                {
                  index: "add_staff",
                  title: "添加员工"
                }
              ]
            },
            {
              icon: "el-icon-lx-cascades",
              index: "facility",
              title: "场地",
              subs: [
                {
                  index: "aerobics",
                  title: "有氧呼吸区"
                },
                {
                  index: "swim",
                  title: "游泳馆"
                },
                {
                  index: "dance",
                  title: "瑜伽,舞蹈室"
                }

              ]
            },
            {
              icon: "el-icon-lx-rank",
              index: "statistics",
              title: "统计",
              meta:{
                roles:["admin"]
              }
            },
          )
        } ;
        if(localStorage.getItem('userpower')=="2"){
          this.items.push(
            {
              icon: "el-icon-lx-home",
              index: "dashboard",
              title: "首页",
              meta:{
                roles:["admin","teacher"]
              }
            },
            {
              icon: "el-icon-lx-calendar",
              index: "class",
              title: "课程",
            },
          )
        }

      }
    }

  };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;

    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
