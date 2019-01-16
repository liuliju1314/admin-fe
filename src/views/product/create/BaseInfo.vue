<template>
<el-main>
    <el-form
        ref="baseInfoForm"
        :model="baseInfoForm"
        label-width="90px"
        size="small"
        :rules="formRules"
    >
        <el-form-item label="产品型号" prop="model">
            <el-input v-model="baseInfoForm.model"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
            <el-input v-model="baseInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="category">
            <el-input v-model="baseInfoForm.category"></el-input>
        </el-form-item>
        <el-form-item label="产品描述">
          <el-input type="textarea" v-model="baseInfoForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</el-main>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      baseInfoForm: {
        model: "",
        name: "",
        category: "",
      },
      formRules: {
        productName: [{required: true,message: "请输入测站名称",trigger: "blur"}],
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleNext() {
      this.$emit("listenNext", true);
    },
    onSubmit() {
      console.log("baocun")
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.el-main {
  background-color: #fff;
}
</style>