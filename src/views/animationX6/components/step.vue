<template>
    <div class="step">
        <div :className='["node", data.status]'>
            <img :src='data.image.logo' />
            <span className="label">{{data.label}}</span>
            <span className="status">
                <img :src=data.image.success />
            <!-- {{data.status === 'success'<img src={data.image.success} />}}
            {data.status === 'failed' && <img src={data.image.failed} />}
            {data.status === 'running' && <img src={data.image.running} />} -->
            </span>
        </div>
        
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Graph } from '@antv/x6';
  
  
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
    border: 1px solid #ddd;
    margin: 0 auto;
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
  right: 0;
  top: 10px;
}
.node .label {
  display: inline-block;
  flex-shrink: 0;
  width: 104px;
  margin-left: 8px;
  color: #666;
  font-size: 12px;
}
  </style>
  