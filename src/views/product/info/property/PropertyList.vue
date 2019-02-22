<template>
    <el-main>
        <div class="btn-box">
            <el-button type="primary" size="small" @click="addProperty">+ 添加属性</el-button>
        </div>
        <el-table :data="propertList" style="width: 100%; margin-top: 12px" border size="small">
            <el-table-column prop="propertyName" label="属性名称"></el-table-column>
            <el-table-column prop="label" label="标识符"></el-table-column>
            <el-table-column prop="type" label="属性类型"></el-table-column>
            <el-table-column prop="permission" label="属性读写"></el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="editProperty(scope.row)"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button type="primary" size="small" @click="checkProperty">查看属性</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="handleDeletefirmware(scope.row)"
                        icon="el-icon-delete"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加属性对话框 -->
        <el-dialog
            :title="title"
            center
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="cancelAddfirmware"
        >
            <add-property
                :property="property"
                :isEdit="isEdit"
                @listenPropertyOp="listenPropertyOp"
            ></add-property>
        </el-dialog>

        <!-- 查看属性文件对话框 -->
        <el-dialog
            :title="title"
            center
            :visible.sync="dialogVisibleProperty"
            width="60%"
            :before-close="cancelAddfirmware"
        >
            <check-property></check-property>
        </el-dialog>
    </el-main>
</template>

<script>
import AddProperty from "./AddProperty";
import CheckProperty from "./CheckProperty";

export default {
    name: "PropertyList",
    data() {
        return {
            propertList: [
                {
                    label: "",
                    type: "",
                    permission: "",
                    desc: ""
                }
            ],
            isEdit: "",
            title: "添加属性",
            property: "",
            dialogVisible: false,
            dialogVisibleProperty: false
        };
    },
    components: {
        AddProperty,
        CheckProperty
    },
    watch: {},
    computed: {},
    methods: {
        editProperty(attr) {
            this.title = "属性编辑";
            this.isEdit = true;
            this.property = attr;
            this.dialogVisible = true;
        },
        addProperty() {
            this.title = "添加属性";
            this.isEdit = false;
            this.property = "";
            this.dialogVisible = true;
        },
        checkProperty() {
            this.title = "查看属性文件";
            this.dialogVisibleProperty = true;
        },
        //   删除属性
        handleDeletePropert() {
            console.log("删除属性");
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="less" scoped>
.el-main {
    background-color: #fff;
}
.el-dialog__wrapper {
    position: fixed;
    top: -50px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
}
</style>