<template>
    <div class="step">
        <div :class='["node", data.status,"running"]'>
            <img class="logo" :src='data.image.logo' />
            <span class="label">{{data.label}}</span>
            <span class="status">
                <img :src=data.image.running />
            <!-- {{data.status === 'success'<img src={data.image.success} />}}
            {data.status === 'failed' && <img src={data.image.failed} />}
            {data.status === 'running' && <img src={data.image.running} />} -->
            </span>
        </div>
        
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  
  export default defineComponent({
    name: 'stepView',
    setup() {
      const data = {
        image: {
            logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
            success:
                'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
            failed:
                'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
            running:
                'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ',
        },
        status: 'default',
        label: '测试'
      }

      return {
        data
      }
    }
  });
  </script>
  <style scoped>
  .step {
    width: 180px;
    text-align: left;
    height: 36px;
    line-height: 36px;
    margin: 0 auto;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  .node {
    position: relative;
  }
  .node img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: 8px;
  position: absolute;
  right: 6px;
  top: 10px;
}
.node img.logo {
    left: 0px;
}
.node .label {
  display: inline-block;
  flex-shrink: 0;
  width: 104px;
  margin-left: 8px;
  color: #666;
  font-size: 12px;
}
.node.running img {
  animation: spin 1s linear infinite;
}
  </style>
  