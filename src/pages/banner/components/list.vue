<template>
  <div>
    <template>
      <el-table
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="id" label="编号" sortable width="180">
        </el-table-column>
        <el-table-column prop="title" label="轮拨图标题" sortable width="180">
        </el-table-column>
        <el-table-column label="图片" sortable width="180">
        <template slot-scope="scope"> 
          <img :src="$preImg+scope.row.img" alt="">
        </template>
      </el-table-column>

        <el-table-column prop="status" label="状态">
          <!-- <el-button type='primary' >启用</el-button> 
          <el-button type='danger' >禁用</el-button>  -->

          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="danger" v-else>禁用</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="bianji(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
    </template>
  </div>
</template>
<script>
// 引入数据
import { mapGetters, mapActions } from "vuex";
import {reqBannerDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "banner/list",
    
    }),
  },
  data() {
    return {
      
    };
  },
  methods: {
    ...mapActions({
      requestBannerList:'banner/requestBannerList'
    }),
    
    // 编辑显示数据
  bianji(id){
      // 1先通知父组件弹窗
      // 2传过去一个方法
      this.$emit('bianji',id)
      
  },
  // 删除
    del(id){
     reqBannerDel({id:id}).then(res=>{
       this.requestBannerList()
     })
    }
  },
  mounted() {
    this.requestBannerList()
    
  },
  
};
</script>
<style>
img{
  width: 80px;
  height: 80px;
}
</style>