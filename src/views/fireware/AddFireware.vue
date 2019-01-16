<template>
    <el-form :model="addfirewareForm" ref="addfirewareForm" label-width="100px" class="demo-ruleForm" :rules="rules">
        
         <el-form-item label="选择文件A">
            <input id="fileSelectA" type="file" style="display:none" @change="fileSelectedA($event)">
            <label for="fileSelectA" class="input-lable">选择文件</label>
            <div v-if="selectedFileA === null" class="fileInfo">
                <p class="textItem">请选择固件文件A</p>
            </div>
            <div v-else class="fileInfo">
                <p class="textItem">文件名 ： {{selectedFileA.name}}</p>
                <p class="textItem">文件大小（字节） ： {{selectedFileA.size}} </p>
            </div>
        </el-form-item>

        <el-form-item label="选择文件B">
            <input id="fileSelectB" type="file" style="display:none" @change="fileSelectedB($event)">
            <label for="fileSelectB" class="input-lable">选择文件</label>
            <div v-if="selectedFileB === null" class="fileInfo">
                <p class="textItem">请选择固件文件B</p>
            </div>
            <div v-else class="fileInfo">
                <p class="textItem">文件名 ： {{selectedFileB.name}}</p>
                <p class="textItem">文件大小（字节） ： {{selectedFileB.size}} </p>
            </div>
        </el-form-item>

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
import CryptoJS from 'crypto-js'

function arrayBufferToWordArray(ab) {
    let i8a = new Uint8Array(ab)
    let a = []
    for (let i = 0; i < i8a.length; i += 4) {
        a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3])
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length)
}

export default {
    name:'',
    props:[''],
    data () {
    return {
         //upload file
        selectedFileA: null,
        selectedFileB: null,
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
        newForm: {
            zoneA: {},
            zoneB: {}
        },
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
                        fileList: this.newForm
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
        },
        fileSelectedA(event) {
            console.log('file selected A')

            let files = event.target.files
            if (files.length === 0) {
                console.log('select at least one file')
                return
            }

            this.selectedFileA = files[0]

            if (this.selectedFileA.size > 10 * 1024 * 1024) {
                console.log('文件太大啦: ', this.selectedFileA.size)
                this.$message.error('你好像选错文件了')
                this.selectedFileA = null
                return
            }

            this.newForm.zoneA.size = this.selectedFileA.size
            this.newForm.zoneA.filename = this.selectedFileA.name

            // do file checksum. when file size > 50MB, it will take long time.
            let reader = new FileReader()
            reader.onloadend = event => {
                let binary = event.target.result
                let wordArray = arrayBufferToWordArray(binary)
                // let wordArray = CryptoJS.lib.WordArray.create(binary)
                this.newForm.zoneA.md5 = CryptoJS.MD5(wordArray).toString()
                // console.log('json : ', JSON.stringify(this.formItem, null, 2))
                // console.log("file A md5: ", this.newForm.zoneA.md5)
            }
            reader.onerror = function () {
                console.error('Could not read the file')
                this.$message.error('读取文件失败')
            }
            reader.readAsArrayBuffer(this.selectedFileA)
        },

        fileSelectedB(event) {
            console.log('file selected B')

            let files = event.target.files
            if (files.length === 0) {
                console.log('select at least one file')
                return
            }

            this.selectedFileB = files[0]

            if (this.selectedFileB.size > 10 * 1024 * 1024) {
                console.log('文件太大啦: ', this.selectedFileB.size)
                this.$message.error('你好像选错文件了')
                this.selectedFileB = null
                return
            }

            this.newForm.zoneB.size = this.selectedFileB.size
            this.newForm.zoneB.filename = this.selectedFileB.name

            // do file checksum. when file size > 50MB, it will take long time.
            let reader = new FileReader()
            reader.onloadend = event => {
                let binary = event.target.result
                let wordArray = arrayBufferToWordArray(binary)
                // let wordArray = CryptoJS.lib.WordArray.create(binary)
                this.newForm.zoneB.md5 = CryptoJS.MD5(wordArray).toString()
                // console.log('json : ', JSON.stringify(this.formItem, null, 2))
                // console.log("file B md5: ", this.newForm.zoneB.md5)
            }
            reader.onerror = function () {
                console.error('Could not read the file')
                this.$message.error('读取文件失败')
            }
            reader.readAsArrayBuffer(this.selectedFileB)
        },
    },

    watch: {}

    }
</script>
<style lang='' scoped>

</style>