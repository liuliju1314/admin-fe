<template>
    <el-main>
        <div class="btn-box">
            <div style=" display: flex;justify-content: space-between;">
                <el-button
                    type="primary"
                    size="small"
                    @click="openDialog({action:'add', data: ''})"
                >+ 添加Action</el-button>
            </div>
        </div>
        <el-table :data="actionList" style="width: 100%; margin-top: 12px" border size="small">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="did" label="设备ID"></el-table-column>
            <el-table-column label="需执行的参数列表">
                <template slot-scope="scope">
                    <span>{{scope.row.value}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="openDialog({action:'edit', data: scope})"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="deleteAction(scope)"
                        icon="el-icon-delete"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="dialogVisible" center :before-close="beforeClose">
            <el-form
                :model="form"
                ref="form"
                label-width="100px"
                class="form-box"
                :rules="rules"
                size="small"
            >
                <el-form-item label="Action名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="执行参数" prop="value">
                    <div>
                        <span style="display: inline-block; width: 43%">标志符:</span>
                        <span style="display: inline-block; width: 40%">描述:</span>
                    </div>
                    <div
                        class="rain-item"
                        v-for="(item,index) in value"
                        :key="index"
                        style="margin: 0px 0px 10px 0px;"
                    >
                        <el-input v-model.number="item.key" class="small-width"></el-input>
                        <span
                            class="span"
                            style="display: inline-block;width: 3%;text-align: center"
                        >:</span>
                        <el-input v-model="item.value" class="small-width"></el-input>
                        <el-button
                            type="text"
                            @click="deleteValuerate(index)"
                            style="display: inline-block;margin-left: 10px"
                            v-if="index > 0"
                        >删除</el-button>
                    </div>
                    <el-button type="text" @click="addValuerate">+ 添加执行参数</el-button>
                </el-form-item>
                <el-form-item label="设备ID">
                    <el-input v-model="form.did"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="beforeClose" size="small">取 消</el-button>
                    <el-button type="primary" @click="addAction" size="small">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-main>
</template>

<script>
import { updateRule, getRuleInfo } from "@/api/rule/rule";
export default {
    name: "ActionList",
    data() {
        return {
            title: "",
            base: "",
            ruleId: "",
            actions: [],
            actionList: [],
            isEdit: "",
            index: 0, //用于存放当前编辑行
            dialogVisible: false,
            form: {
                name: "",
                did: "",
                value: []
            },
            value: [{ key: "", value: "" }],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入Action名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.init();
    },
    watch: {
        $route() {
            this.init();
        }
    },
    methods: {
        beforeClose() {
            this.$refs.form.resetFields();
            this.value = [{ key: "", value: "" }];
            this.dialogVisible = false;
            this.init();

        },
        openDialog(value) {
            if (value.action === "edit") {
                const data = value.data;
                this.index = data.$index;  
                this.value = [];
                this.$nextTick(() => {     
                    this.value = data.row.value.map(item=>{
                        return  {
                            key: Object.keys(item)[0],
                            value: Object.values(item)[0],
                        }
                    });  
                    this.form = {
                        ...this.form,
                        ...data.row,
                    };
                });
            }
            this.isEdit = value.action === "add" ? false : true;
            this.title = value.action === "add" ? "添加Action" : "Action编辑";
            this.dialogVisible = true;
        },
        init() {
            this.ruleId = this.$route.params.id;
            if (this.ruleId && this.$route.path.indexOf("rule") >= 0) {
                getRuleInfo({ tid: this.ruleId })
                    .then(res => {
                        this.base = res.payload;
                        this.base.actions = JSON.parse(this.base.actions);
                        this.base.event = JSON.parse(this.base.event);
                        this.actionList = this.base.actions
                            ? this._deepClone(this.base.actions)
                            : [];
                        this.actions = this.base.actions
                            ? this._deepClone(this.base.actions)
                            : [];
                    })
                    .catch(() => {});
            }
        },
        deleteAction(scope) {
            this.$confirm(`是否确认删除该Action?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.actions.splice(scope.$index, 1);
                this.updateAction("删除");
                this.init();
            });
        },
        addAction() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.value.forEach(value => {
                        let obj = {};
                        obj[value.key] = value.value;
                        this.form.value.push(obj);
                    });

                    const data = {
                        ...this.form
                    };
                    if (this.isEdit) {
                        this.actions.splice(this.index, 1, data);
                        this.updateAction("更新");
                    } else {
                        console.log(this.actions);
                        this.actions.push(data);
                        this.updateAction("添加");
                    }
                }
            });
        },
        // 更新Action编辑
        updateAction(event) {
            const data = {
                ...this.base,
                actions: this.actions
            };
            updateRule(data).then(() => {
                this.$message({
                    type: "success",
                    message: event + "成功"
                });
                if (this.dialogVisible) {
                    this.beforeClose();
                }
            });
        },
        // 添加枚举
        addValuerate() {
            this.value.push({
                key: "",
                value: ""
            });
        },
        // 删除枚举项
        deleteValuerate(index) {
            this.value.splice(index, 1);
        }
    }
};
</script>

<style lang="less" scoped>
.el-main {
    background-color: #fff;
}
.input-with-select {
    width: 320px;
}
.small-width {
    width: 40%;
}
</style>