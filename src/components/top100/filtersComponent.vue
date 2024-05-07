<!--左侧筛选器面板组件-->
<script setup lang="ts">

</script>

<template>
  <div class="collapse">
    <el-collapse class="collapse" accordion>
      <el-collapse-item class="collapse" title="111">
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
      </el-collapse-item>
      <el-collapse-item title="Feedback">
        <div style="background-color: #72767b">
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
      </el-collapse-item>
      <el-collapse-item title="Efficiency">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
      </el-collapse-item>
      <el-collapse-item title="Controllability" >
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<style scoped>
.el-collapse{
  border-radius: 10px;
  --el-collapse-header-bg-color: #3a3a3a;
  --el-collapse-border-color: #525252;
  --el-collapser-color: #e8e8e8;
  --el-collapse-content-bg-color: #3a3a3a;;
  --el-collapse-header-text-color:#ffffff;
  overflow: hidden;
}

.collapse{
  border-radius: 10px;
  background-color: #72767b !important;
}

</style>