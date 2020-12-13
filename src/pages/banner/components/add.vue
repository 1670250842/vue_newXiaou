<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
import {
  reqBannerAdd,
  reqBannerListOne,
  reqBannerEdit,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "classify/list",
    }),
  },
  data() {
    return {
      width: "160px",
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imageUrl: "",
    };
  },
  methods: {
    // 重置
    empty() {
      this.imageUrl = "";
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
    },
    hied() {
      this.info.isShow = false;
    },
    // 添加
    add() {
      reqBannerAdd(this.form).then((res) => {
        this.hied();
        this.requestBannerList()
      });
    },
    // 修改
    update() {
        console.log(this.form);
        
      reqBannerEdit(this.form).then((res) => {
        this.hied();
        this.requestBannerList();
      });
    },
    // 图片
    changeImg(e) {
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
      this.form.img = file;
    },
    look(id) {
      reqBannerListOne({ id: id }).then((res) => {
        console.log(res);
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + res.data.list.img;
      });
    },
    ...mapActions({
      requestBannerList:'banner/requestBannerList'
    }),
  },
  mounted() {
    // this.requestClassifyList()
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
  border-color: #409eff;
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