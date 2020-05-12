import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/home/Dashboard.vue'),
                    meta: { title: '首页' }
                },
              {
                path: '/class',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/class/class.vue'),
                meta: { title: '课程' }
              },
              {
                path: '/add_class',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/class/add_class.vue'),
                meta: { title: '添加课程' }
              },

              {
                path: '/staff',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/staff/staff.vue'),
                meta: { title: '员工' }
              },
              {
                path: '/add_staff',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/staff/add_staff.vue'),
                meta: { title: '添加员工' }
              },

                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/vip_manager/BaseTable.vue'),
                    meta: { title: '会员' }
                },
                {
                    path: '/add_vip',
                    component: () => import(/* webpackChunkName: "table" */ '../components/vip_manager/add_vip.vue'),
                    meta: { title: '添加会员' }
                },

                {
                    path: '/facility',
                    component: () => import(/* webpackChunkName: "table" */ '../components/facility/aerobics.vue'),
                    meta: { title: '场地' }
                },
                {
                    path: '/aerobics',
                    component: () => import(/* webpackChunkName: "table" */ '../components/facility/aerobics.vue'),
                    meta: { title: '有氧呼吸区' }
                },
                {
                    path: '/swim',
                    component: () => import(/* webpackChunkName: "table" */ '../components/facility/swim.vue'),
                    meta: { title: '游泳馆' }
                },
                {
                    path: '/dance',
                    component: () => import(/* webpackChunkName: "table" */ '../components/facility/dance.vue'),
                    meta: { title: '瑜伽，舞蹈室' }
                },
                {
                    path: '/statistics',
                    component: () => import(/* webpackChunkName: "table" */ '../components/statistics/statistics.vue'),
                    meta: { title: '统计' }
                },




                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
