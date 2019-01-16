<template>
    <el-form :model="addfirewareForm" ref="addfirewareForm" label-width="100px" class="demo-ruleForm" :rules="rules">
        
        <el-form-item label="选择固件1">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList">
                <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
        </el-form-item> -->
        <el-form-item label="选择固件2">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList">
                <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
        </el-form-item>
        <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-form-item label="选择产品" prop="pid">
            <el-select v-model="addfirewareForm.pid" placeholder="请选择" @click.native="getProList()" @change="handlerPid">
                <el-option
                v-for="item in productList"
                :key="item.pid"
                :label="item.model"
                :value="item.pid"
                >                   
                </el-option>
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
                <el-option
                    v-for="(item,index) in fwTypesList"
                    :key="index"
                    :label="item.desc"
                    :value="item.name"
                >                   
                </el-option>
            </el-select>           
        </el-form-item>
        <el-form-item label="固件版本" prop="version" style="width: 500px">
            <el-input v-model="addfirewareForm.version"></el-input>
        </el-form-item>
        <el-form-item label="升级描述" prop="desc" style="width: 500px">
            <el-input type="textarea" v-model="addfirewareForm.desc"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
import { getProductList } from "@/api/product/product";
import { updateFirmware } from "@/api/fireware/fireware";


  export default {
    name:'',
    props:[''],
    data () {
      return {
        form: {},
        productList: [],
        fwTypesList: [],
        addfirewareForm: {
            pid: '',
            group: '',
            name: '',
            version: '',
            desc: ''
        },
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        rules: {
            pid: [
                { required: true, message: '请选择产品', trigger: 'change' },
            ],
            group: [
                { required: true, message: '请选择固件分组', trigger: 'change' }
            ],
            name: [
                { required: true, message: '请选择固件名称', trigger: 'change' }
            ],
            version: [
                { required: true, message: '请填写固件版本', trigger: 'blur' }
            ]
        }
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        getProList() {
            getProductList(this.form)
            .then(res => {
                this.productList = res.payload.result;
            })
            .catch(error => {
                return error;
            });
        },
        handlerPid(value) {
            this.productList.find((item) => {
                if(item.pid === value) {
                    console.log("item: " + JSON.stringify(item))
                    this.fwTypesList = item.fwTypes;
                    console.log("fwTypesList: " + JSON.stringify(this.fwTypesList))
                    return item;
                }
            });
        },
        addFireware() {
          this.$refs.addfirewareForm.validate(valid => {
                if (valid) {
                    const data = {
                        ...this.addfirewareForm,
                        fileList: this.fileList
                    };
                    updateFirmware(data)
                    .then(() => {
                        console.log("添加成功")
                    })
                    .catch(() => {
                        console.log("添加失败")
                    });
                } else {
                    return false;
                }
            });
        }
    },

    watch: {}

  }
</script>
<style lang='' scoped>

</style>