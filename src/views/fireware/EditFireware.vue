<template>
    <el-form ref="fwForm" :model="fwForm" label-width="80px" :rules="fwFormRules">
    <el-form-item label="UID" prop="fwID">
        <el-input v-model="firewareForm.fwID" disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="固件版本" prop="version">
        <el-input v-model="fwForm.version"></el-input>
    </el-form-item>
    <el-form-item label="固件分组" prop="group">
        <el-select v-model="fwForm.group">
            <el-option label="正式版" value="release"></el-option>
            <el-option label="测试版" value="develop"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="升级描述" prop="desc"> 
        <el-input type="textarea" v-model="fwForm.desc"></el-input>
    </el-form-item>

    </el-form>
</template>

<script>
import { uploadFirmware } from "@/api/fireware/fireware";

  export default {
    name:'',
    props:['firewareForm'],
    data () {
      return {
        fwForm: {
            fwID: '',
            version: '',
            group: '',
            desc: '',
            pid: '',
            fileList: [{name: '', url: ''}],
        },
        fwFormRules: {
          version: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
          ],
          group: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
          ],
        }
      };
    },

    components: {},

    computed: {},

    created() {
        this.fwForm.group = this.firewareForm.group;
        this.fwForm.pid = this.firewareForm.pid;
        this.fwForm.fileList.name = this.firewareForm.files.filename;
        this.fwForm.fileList.url = this.firewareForm.files.path;
        console.log("this.fwForm.fileList: " + JSON.stringify(this.fwForm.fileList))
    },

    beforeMount() {},

    mounted() {},

    methods: {
        uploadFirmware() {    
            this.$refs.fwForm.validate((valid) => {
                if (valid) {
                    uploadFirmware(this.fwForm)
                    .then(res => {
                        this.firewareList = res.payload.result;
                        this.count = res.payload.count;
                    })
                    .catch(error => {
                        return error;
                    });
                } else {
                    console.log('error submit!!');
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