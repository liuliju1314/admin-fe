<template>
    <el-form ref="addProductForm" :model="addProductForm" label-width="80px" :rules="addProductRules">
        <el-form-item label="产品图标">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
            <el-input v-model="addProductForm.name"></el-input>
        </el-form-item>
        <el-form-item label="产品型号" prop="model">
            <el-input v-model="addProductForm.model"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="category">
            <el-input v-model="addProductForm.category"></el-input>
        </el-form-item>
        <el-form-item label="产品描述">
            <el-input type="textarea" v-model="addProductForm.desc"></el-input>
        </el-form-item>
        
    </el-form>
</template>

<script>

export default {
  name: 'ProductCreate',
  data() {
    return {
      imageUrl: '',
      addProductForm: {
          name: "",
          model: "",
          category: "",
          desc: "",
      },    
      addProductRules: {
          name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
          ],
          model: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
          ],
          category: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
          ]
        }
    }
  },
  components: {},
  watch: {},
  computed: {},
  methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
      
  },
  created() {},
  mounted() {}
}
</script>
<style>
  .avatar-uploader .el-upload{
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