<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened='chengEditor'>
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
          <el-select v-model="form.first_cateid" placeholder="--请选择--" @change="change_arr1">
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
          <el-select
            v-model="form.second_cateid"
            placeholder="--请选择--"
            
          >
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

        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="商品价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>




        <el-form-item label="图片" :label-width="width">
          <!-- 图片 -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        


         <el-form-item label="商品规格" :label-width="width">
          <el-select
            v-model="form.specsid"
            placeholder="--请选择--" @change="change_arr2">
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>



         <el-form-item label="规格属性" :label-width="width">
          <el-select
            v-model="form.specsattr"
            placeholder="--请选择--" multiple>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in second_arr2"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>



        <el-form-item label="是否新品" :label-width="width">
          <el-radio v-model="form.isnew" :label="1" >是</el-radio>
          <el-radio v-model="form.isnew" :label="2" >否</el-radio>
        </el-form-item>


        <el-form-item label="是否热卖" :label-width="width">
          <el-radio v-model="form.ishot" :label="1" >是</el-radio>
          <el-radio v-model="form.ishot" :label="2" >否</el-radio>
        </el-form-item>


        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>

         <el-form-item label="商品描述" :label-width="width">
          <!-- <textarea name="" id="" cols="30" rows="10" v-model="form.description"></textarea> -->
          <div id="div1" v-if='info.isShow'></div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from 'wangeditor'
import {reqGoodsAdd,reqGoodsListOne,reqGoodsEdit} from '../../../util/request'
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed:{
    ...mapGetters({
      cateList:'classify/list',
      specList:'spec/list'
    })
  },
  data() {
    return {
      width: "160px",
      second_arr1:[],
      second_arr2:[],
      form: {
        first_cateid:0,
        second_cateid:0,
        img:null,
        status:1,
        goodsname:'',
        price:0,
        market_price:0,
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1
      },
      imageUrl:''
    };
  },
  methods: {
    //   弹窗开始时加载
    chengEditor(){
        this.editor = new E('#div1')
        // 或者 const editor = new E( document.getElementById('div1') )
        this.editor.create()
        this.editor.txt.html(this.form.description)
    },
    //   获取二级分类
    change_arr1(){
        this.second_arr1 = this.cateList.find((item)=>{return item.id==this.form.first_cateid}).children
    },
    // 获取规格二级分类
    change_arr2(){
        this.form.specsattr=[];
        this.second_arr2 = this.specList.find((item)=>{return item.id==this.form.specsid}).attrs
    },
    // 重置
    empty() {
    
    this.imageUrl=''
      this.form = {
        first_cateid:0,
        second_cateid:0,
        img:null,
        status:1,
        goodsname:'',
        price:0,
        market_price:0,
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1,
        
      };
    },
    hied(){
      this.info.isShow = false
    },
    // 添加
    add() {
        this.form.description = this.editor.txt.html()
      reqGoodsAdd(this.form).then(res=>{
        this.hied()
        this.requstGoodsListCount()
        this.requestGoodsList()
      })
    },
    // 修改
    update() {
      this.form.description = this.editor.txt.html()
      reqGoodsEdit(this.form).then(res=>{
        this.hied()
        this.requestGoodsList()
      })
    },
    // 图片
    changeImg(e){
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
      this.form.img = file

    },
    look(id){
      reqGoodsListOne({id:id}).then(res=>{
        console.log(res);
        this.form = res.data.list
        this.form.id = id
        this.imageUrl = this.$preImg+res.data.list.img
        this.form.specsattr = this.form.specsattr.split(',')
      })
      
    },
    ...mapActions({
      requestClassifyList:'classify/requestClassifyList',
      requstSpecList:'spec/requstSpecList',
      requestGoodsList:'goods/requestGoodsList',
      requstGoodsListCount:'goods/requstGoodsListCount',

    })
  },
  mounted() {
    this.requestClassifyList()
    this.requstSpecList()
    
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>