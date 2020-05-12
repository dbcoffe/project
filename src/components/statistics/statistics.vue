<template>
    <div>
        <div class="container">
            <div class="schart-box">
                <schart class="schart" canvasId="line" :options="options2"></schart>
            </div>
            <div class="schart-box">
                <schart class="schart" canvasId="ring2" :options="options1"></schart>
            </div>
            <div class="schart-box">
                <schart class="schart" canvasId="pie" :options="options3"></schart>
            </div>
            <div class="schart-box">
                <schart class="schart" canvasId="line2" :options="options4"></schart>
            </div>
        </div>
    </div>
</template>

<script>
  import Schart from 'vue-schart';
  export default {
    name: 'statistics',
    components: {
      Schart
    },
    data() {
      return {
        options2: {
          type: 'line',
          title: {
            text: '最近入馆情况'
          },
          bgColor: '#fbfbfb',
          labels: ['6月', '7月', '8月', '9月', '10月'],
          datasets: [
            {
              label: '入馆人数',
              data: [0, 1120, 1233, 1504, 1234]
            },
          ]
        },
        options1: {
          type: 'line',
          title: {
            text: '新会员情况'
          },
          bgColor: '#fbfbfb',
          labels: ['6月', '7月', '8月', '9月', '10月'],
          datasets: [
            {
              label: '新会员数',
              data: [0, 11, 22, 19, 15]
            },
          ]
        },
        options3: {
          type: 'bar',
          title: {
            text: '会员活跃度'
          },
          legend: {
            position: 'left'
          },
          bgColor: '#fbfbfb',
          labels: ['半年以上', '3个月','每月', '每周', '每天',],
          datasets: [
            {
              data: [1520,900, 560, 100, 30]
            }
          ]
        },
        options4: {
          type: 'pie',
          title: {
            text: '课程人数情况'
          },
          bgColor: '#fbfbfb',
          labels: ['健身操', '瑜伽', '游泳', '有氧运动', '舞蹈'],
          datasets: [
            {
              data: [300,400,500,400, 300]
            }
          ]
        },
      };
    }
  };
</script>

<style scoped>
    .schart-box {
        display: inline-block;
        margin: 20px;
    }
    .schart {
        width: 655px;
        height: 400px;
    }

</style>