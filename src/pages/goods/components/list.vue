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
        <el-table-column prop="id" label="商品编号"  width="110">
        </el-table-column>
        <el-table-column prop="goodsname" label="商品名称"  width="100">
        </el-table-column>
        <el-table-column prop="price" label="商品价格"  width="100">
        </el-table-column>
        <el-table-column prop="market_price" label="市场价格"  width="100">
        </el-table-column>
        <el-table-column label="图片"  width="150">
            <template slot-scope="scope"> 
              <img :src="$preImg+scope.row.img" alt="">
            </template>
        </el-table-column>


        <el-table-column prop="status" label="是否新品" width="100">
          

          <template slot-scope="scope" >
            <el-button type="primary" v-if="scope.row.isnew == 1"
              >是</el-button
            >
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否热卖" width="100">
          

          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.ishot == 1"
              >是</el-button
            >
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" width="120">
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
      <div class="you">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalSJ"
          :current-page="page"
          :page-size="size"
          @current-change="cheng"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
// 引入数据
import { mapGetters, mapActions } from "vuex";
import {reqGoodsDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      totalSJ:'goods/totalSJ',
      page:'goods/page',
      size:'goods/size'
    }),
  },
  data() {
    return {
      
    };
  },
  methods: {
    // 改变页数
    cheng(page) {
        this.requstGoodsPage(page)
        // this.requstGoodsList()
         this.requestGoodsList()
    },
    ...mapActions({
      requestGoodsList:'goods/requestGoodsList',
      requstGoodsListCount:'goods/requstGoodsListCount',
      requstGoodsPage:'goods/requstGoodsPage'
    }),
    
    // 编辑显示数据
  bianji(id){
      // 1先通知父组件弹窗
      // 2传过去一个方法
      this.$emit('bianji',id)
  },
  // 删除
    del(id){
     reqGoodsDel({id:id}).then(res=>{
       this.requstGoodsPage()
       this.requestGoodsList()
       this.requstGoodsListCount()
     })
    }
  },
  mounted() {
    this.requestGoodsList()
    this.requstGoodsListCount()
  },
  
};
</script>
<style>
img{
  width: 80px;
  height: 80px;
}
.you {
  text-align: right;
}
</style>