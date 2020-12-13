<template>
  <div class="menu_list">
    <template>
      <el-table
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
       
        <el-table-column prop="title" label="活动名称"  width="180">
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
            <el-button type="primary" @click="edit(scope.row.id)"
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
export default {
  components: {},
  data() {
    return {};
  },
};
</script>
<script>
// 引入
import { mapGetters, mapActions } from "vuex";
import { reqSeckillDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestSeckillList: "seckill/requestSeckillList",
    }),

    // 编辑
    edit(id) {
      // 先通知父组件弹窗
      this.$emit("edit", id);
      // this.$emit('edit',id)
    },
    // 删除
    del(id) {
      reqSeckillDel({ id: id }).then(res => {
       
        this.requestSeckillList();
      });
    },
  },
  mounted() {
    this.requestSeckillList();
  },
};
</script>
<style>
.menu_list {
  margin-top: 20px;
}
</style>