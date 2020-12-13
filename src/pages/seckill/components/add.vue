<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="width">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <!-- {{value1}} -->
          </div>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="width">
          <el-select
            v-model="form.first_cateid"
            placeholder="--请选择--"
            @change="change_arr1"
          >
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="--请选择--"
          @change="change_arr2">
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in second_arr1"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="width">
          <el-select
            v-model="form.goodsid"
            placeholder="===请选择==="
           >
            <el-option label="顶级菜单" value="0"></el-option>
            <el-option
              v-for="item in second_arr2"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
            >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

// 引入ajax
import { reqSeckillAdd,reqSeckillListOne,reqSeckillEdit } from "../../../util/request.js";
// 引入数据循环
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      cateList: "classify/list",
      goodsList: "goods/list",
      
    }),
  },
  props: ["info"],

  components: {},
  data() {
    return {
      second_arr1: [],
      second_arr2: [],
      // isShow: true,
      width: "160px",
      form: {
        title: "",
        status: 1,
        begintime: '',
        endtime: '',
        first_cateid: '',
        second_cateid: '',
        goodsid: '',
      },
      value1: [],
    };
  },
  methods: {
    //   获取二级分类
    change_arr1() {
      this.second_arr1 = this.cateList.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },
    // 获取二级商品
    change_arr2() {
      console.log(this.goodsList);
      this.form.goodsid=''
      for(let i=0;i<this.goodsList.length;i++){
        if(this.goodsList[i].second_cateid==this.form.second_cateid){
          this.second_arr2.push(this.goodsList[i])
        }
      }
      console.log(this.second_arr2);
    },
    hide() {
      this.info.isShow = false;
    },
    //  刷新
    ...mapActions({
      requestClassifyList: "classify/requestClassifyList",
      requestGoodsList:'goods/requestGoodsList',
      requestSeckillList: "seckill/requestSeckillList",
    }),
    // 添加一条数据
    add() {
      this.form.begintime = this.value1[0];
      this.form.endtime = this.value1[1];
      reqSeckillAdd(this.form).then((res) => {
        this.hide();
        // 刷新
        this.requestSeckillList();
      });
    },
    
    // 获取一条数据
    look(id) {
      reqSeckillListOne({ id: id }).then((res) => {
      this.value1=[]
      this.form = res.data.list;
      this.value1.push(res.data.list.begintime,res.data.list.endtime)
      this.form.begintime = this.value1[0];
      this.form.endtime = this.value1[1];
      this.form.id = id;
      });
    },
    // 修改
    update() {
      reqSeckillEdit(this.form).then((res) => {
      this.hide();
      // 刷新
      this.requestSeckillList();
      });
    },
    // 初始值
    csz() {
       this.form = {
        title: "",
        status: 1,
        begintime: '',
        endtime: '',
        first_cateid: '',
        second_cateid: '',
        goodsid: '',
      };
      this.value1=[]
    },
  },
  mounted() {
    this.requestClassifyList();
    this.requestGoodsList()
    this.requestSeckillList()
  },
};
</script>
<style>
</style>