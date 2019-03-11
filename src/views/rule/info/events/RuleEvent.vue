<template>
    <div>
                    <el-tree :data="ruleEvent" node-key="id" default-expand-all draggable>
                        <div class="custom-tree-node" slot-scope="{ node, data }">
                            <div class="item clearfix">
                                <div class="title">{{data.label}}</div>
                                <div class="desc">{{data.msg}}</div>
                                <div class="icon-box">
                                    <i class="el-icon-edit" @click="() => handleEdit(node,data)"></i>
                                    <i class="el-icon-delete" @click="() => deleteEvent(node, data)"></i>
                                </div>
                            </div>
                        </div>
                    </el-tree>
    </div>
</template>

<script>
import eventVue from "@/components/commonEvent";
export default {
    name: "RuleEvent",
    props: ["ruleEvent"],
    data() {
        return {};
    },
    created() {},
    watch: {
        ruleEvent() {
            eventVue.$emit("listenRuleChange", " ");
        }
    methods: {
        handleEdit(item) {
            if(item.logic) {
                eventVue.$emit("listenRuleChange", " ");
            } else {
                eventVue.$emit("listenEdit", );                
            }
        },
        deleteEvent(index) {

            eventVue.$emit("listenRuleChange", " ");
        }
    }
};
</script>
<style lang="less">
    .item .el-input {
        input {
            border: 0;
        }
    }
</style>
<style lang='less' scoped>

</style>
