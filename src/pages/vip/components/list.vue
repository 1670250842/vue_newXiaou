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
        <el-table-column prop="uid" label="用户编号" sortable width="180">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" sortable width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" sortable width="180">
        </el-table-column>
        

        <el-table-column prop="status" label="状态">
          

          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="danger" v-else>禁用</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import {reqVipDel} from '../../../util/request'
export default {
  computed:{
     ...mapGetters({
      list: "vip/list",
    }),
  },
  data() {
    return {};
  },
  mounted() {
      this.requestVipList()
  },
  methods:{
    ...mapActions({
      requestVipList: "vip/requestVipList",
    }),
    //编辑 
    edit(id){
      this.$emit('edit',id)
    },
    // 删除
    del(id){
    //   reqVipDel({id:id}).then(res=>{
    //       this.requestVipList();
    //   })
    }
  }
};
</script>
<style>
</style>