<template>
    <el-form :model="addfirewareForm" ref="addfirewareForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择文件">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item label="选择产品" prop="product">
            <el-select v-model="addfirewareForm.product" placeholder="请选择">
            <el-option label="YL3800" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="固件分组" prop="group">
            <el-select v-model="addfirewareForm.group" placeholder="请选择">
                <el-option label="正式版" value="0"></el-option>
                <el-option label="测试版" value="1"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="固件名字" prop="name">
            <el-select v-model="addfirewareForm.name" placeholder="请选择">
            <el-option label="mcu的固件" value="name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="固件版本" style="width: 500px">
            <el-input v-model="addfirewareForm.version"></el-input>
        </el-form-item>
        <el-form-item label="升级描述" prop="desc" style="width: 500px">
            <el-input type="textarea" v-model="addfirewareForm.desc"></el-input>
        </el-form-item>
        <!-- <el-form-item>
            <el-button type="primary" @click="submitForm('addfirewareForm')">立即创建</el-button>
            <el-button @click="resetForm('addfirewareForm')">重置</el-button>
        </el-form-item> -->
    </el-form>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          addfirewareForm: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          }
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
    },

    watch: {}

  }

</script>
<style lang='' scoped>

</style>