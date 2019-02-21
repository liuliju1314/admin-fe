<template>
    <el-form
        :model="form"
        ref="form"
        label-width="100px"
        class="form-box"
        :rules="rules"
        size="small"
    >
        <div style="display: flex" v-for="(item,index) in upload" :key="index">
            <el-form-item label="选择固件">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-success="getFile"
                >
                    <el-button size="small" type="primary" icon="el-icon-upload">选择文件</el-button>
                </el-upload>
            </el-form-item>
            <div style="vertical-align: top; margin-left: 10px;">
                <el-button
                    type="text"
                    icon="el-icon-delete"
                    size="small"
                    v-if="index > 0"
                    @click="upload.splice(index, 1)"
                >删除</el-button>
            </div>
        </div>

        <div style="margin-left: 100px">
            <el-button
                type="text"
                size="small"
                style="padding-top: 0"
                @click="upload.push( { index: '' })"
            >+ 新增固件</el-button>
        </div>
        <el-form-item label="固件名称" prop="fwName">
            <el-select v-model="form.fwName" filterable default-first-option placeholder="请选择固件名称">
                <el-option label="正式版" value="0"></el-option>
                <el-option label="测试版" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="固件分组" prop="group">
            <el-radio-group v-model="form.group" placeholder="请选择">
                <el-radio label="0">正式版</el-radio>
                <el-radio label="1">测试版</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="升级方式" prop="upgrade">
            <el-radio-group v-model="form.upgrade">
                <el-radio :label="3">手动升级</el-radio>
                <el-radio :label="6">静默升级</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="固件版本" prop="version">
            <el-input v-model="form.version" placeholder="建议采用版本递增进行管理"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="addfirmware" size="small">确 定</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getProductList } from "@/api/product/product";
import { updateFirmware } from "@/api/firmware/firmware";

export default {
    name: "Addfirmware",
    data() {
        return {
            upload: [{ index: "" }],
            form: {
                upgrade: "",
                group: "",
                name: "",
                version: "",
                desc: "",
                fwName: ""
            },
            rules: {
                group: [
                    {
                        required: true,
                        message: "请选择固件分组",
                        trigger: "blur"
                    }
                ],
                upgrade: [
                    {
                        required: true,
                        message: "请选择升级方式",
                        trigger: "blur"
                    }
                ],
                version: [
                    {
                        required: true,
                        message: "请填写固件版本",
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    methods: {
        // 文件上传成功后返回值
        getFile(response, file, fileList) {},
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
            this.productList.find(item => {
                if (item.pid === value) {
                    console.log("item: " + JSON.stringify(item));
                    this.fwTypesList = item.fwTypes;
                    console.log(
                        "fwTypesList: " + JSON.stringify(this.fwTypesList)
                    );
                    return item;
                }
            });
        },
        addfirmware() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    updateFirmware(this.addfirmwareForm)
                        .then(() => {
                            console.log("添加成功");
                        })
                        .catch(() => {
                            console.log("添加失败");
                        });
                } else {
                    return false;
                }
            });
        }
    },

    watch: {}
};
</script>
<style lang='less' scoped>
.form-box {
    width: 80%;
    margin: auto;
}
</style>