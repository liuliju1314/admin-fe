<template>
    <el-card class="box-card create-station-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">规则引擎</span>
        </div>
        <div class="product-wrapper">
            <el-form :inline="true" :model="form" size="small">
                <el-form-item label="规则名称">
                    <el-input v-model="form.productName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="dialogVisible=true" size="small">+新建规则</el-button>
            <!-- 开发中的产品 -->
            <el-table
                :data="ruleList"
                style="width: 100%; margin-top: 12px"
                border
                size="small"
                @row-click="expandDetail"
            >
                <el-table-column prop="name" label="规则名称"></el-table-column>
                <el-table-column prop="value" label="规则标识符"></el-table-column>
                <el-table-column prop="desc" label="规则描述"></el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{ changeTimeFormater(scope.row.createdAt) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <div>
                            <!-- <el-button
                                @click="edit(scope.row)"
                                type="text"
                                size="small"
                            >
                                <svg-icon icon-class="edit"></svg-icon>编辑
                            </el-button>-->
                            <!-- <el-button
                                @click="openDetails(scope.row)"
                                type="text"
                                size="small"
                                icon="el-icon-edit"
                            >详情</el-button>-->
                            <el-button
                                @click.stop="deleteRule(scope.row)"
                                type="text"
                                size="small"
                                icon="el-icon-delete"
                            >删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页逻辑 -->
            <div class="pagination-box" v-if="form.pageSize < count">
                <el-pagination
                    :page-size="form.pageSize"
                    :page="form.page"
                    layout="prev, pager, next"
                    :total="count"
                    @current-change="handlePage"
                ></el-pagination>
            </div>
        </div>

        <!-- 添加产品对话框 -->
        <add-engine :visible="dialogVisible" @listenAdd="listenAdd"></add-engine>
    </el-card>
</template>

<script>
import {  deleRule, upadateRule, getRuleList } from "@/api/rule/rule";
import { formatDate } from "@/utils/format";

export default {
    name: "RuleEngine",
    data() {
        return {
            form: {
                productName: "",
                productID: "",
                productStatus: "1",
                page: 1,
                pageSize: 10,
                isPage: true
            },
            ruleList: [
                {
                    id: '1sdfdfc323',
                    name: "1",
                    desc: "2324"
                }
            ],
            dialogVisible: false
        };
    },

    created() {
        this.handleRuleList();
    },

    components: {
        AddEngine: () => import("@/views/rule/AddEngine")
    },

    methods: {
        listenAdd(value) {
            this.dialogVisible = value;
        },
        expandDetail(row) {
            this.$router.push({ path: `/rule/${row.id}/detail` });
        },
        handleRuleList() {
            getRuleList(this.form)
                .then(res => {
                    this.ruleList = res.payload.items;
                })
                .catch(error => {
                    return error;
                });
        },
        //分页
        handlePage(value) {
            this.form.page = value;
            this.handleRuleList();
        },
        deleteRule(rule) {

        },
        changeTimeFormater(cellvalue) {
            return formatDate(cellvalue, "y-m-d");
        }
    },

    watch: {}
};
</script>
<style lang='less' scoped>
.svg-icon {
    width: 14px;
    height: 13px;
}
</style>