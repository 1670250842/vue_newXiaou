<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width" >
          <el-select v-model="form.pid" placeholder="===请选择===" @change ="gbtype">
            <el-option label="顶级菜单" value="0"></el-option>
            <!-- 动态获取添加的数据 -->
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择活动区域">
            <el-option label="星星" value="el-icon-star-on">
              <i class="el-icon-star-on"></i>
            </el-option>
            <el-option label="人物" value="el-icon-user-solid">
              <i class="el-icon-user-solid"></i>
            </el-option>
            <el-option label="铃铛" value="el-icon-message-solid">
              <i class="el-icon-message-solid"></i>
            </el-option>
            <el-option label="书签" value="">
              <i class="el-icon-collection-tag"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option
              v-for="item in indexRouter"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
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
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 获取菜单地址
import { indexRouter } from "../../../router/index";
// 引入ajax
import {reqMenuAdd,reqMenuListOne,reqMenuEdit} from '../../../util/request.js'
// 引入数据循环
import { mapGetters, mapActions } from "vuex";
export default {
   computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  props:['info'],
 
  components: {},
  data() {
    return {
      // isShow: true,
      width: "160px",
      form: {
        pid: "",
        title: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouter: indexRouter,
    };
  },
  methods: {
    hide(){
      this.info.isShow=false
    },
  //  刷新
     ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
     // 添加一条数据
    add(){
      reqMenuAdd(this.form).then(res=>{
        this.hide();
        // 刷新
        this.requestMenuList()
      })
      
    },
    gbtype(){
     this.form.type= this.form.pid==0?1:2
    },
    // 获取一条数据
    look(id){
      reqMenuListOne({id:id}).then(res=>{
        this.form = res.data.list
        this.form.id=id
      })
    },
    // 修改
    update(){
      reqMenuEdit(this.form).then(res=>{
         this.hide();
        // 刷新
        this.requestMenuList()
      })
    },
    // 初始值
    csz(){
      this.form = {
        pid: "",
        title: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      }
    }
  },
  mounted() {
  },
};
</script>
<style>
</style>