<template>
    <el-main>
        <div class="btn-box">
            <el-button type="primary" size="small" @click="addPropert()">+ 添加属性</el-button>
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
                        @click="handleDeleteFireware(scope.row)"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="handleDeleteFireware(scope.row)"
                        icon="el-icon-delete"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加属性对话框 -->
        <el-dialog
            title="添加属性"
            center
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="cancelAddFireware"
        >
            <add-property ref="addPropertyFrom"></add-property>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddFireware">取 消</el-button>
                <el-button type="primary" @click="addProperty()">确 定</el-button>
            </span>
        </el-dialog>
    </el-main>
</template>

<script>
import AddProperty from "./AddProperty";

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
            dialogVisible: false
        };
    },
    components: {
        AddProperty
    },
    watch: {},
    computed: {},
    methods: {
        addPropert() {
            this.dialogVisible = true;
        },
        // 关闭前清除表单
        cancelAddFireware() {
            this.$refs.addPropertyFrom.resetForm();
            this.dialogVisible = false;
        },
        // 添加属性
        addProperty() {
            this.$refs.addPropertyFrom.validate(valid => {
                if (valid) {
                    this.cancelAddFireware();
                    this.$message({
                        type: "success",
                        message: "添加成功!"
                    });
                }
            });
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