<template>
    <draggable
        class="rule-logic-box"
        :list="ruleEvent"
        :options="{ group: { name: 'g1' } }"
    >
        <div class="rule-logic-box" v-for="(item, index) of ruleEvent" :key="index">
            <div class="item clearfix">
                <div class="title">{{item.id ? item.id: item.logic}}</div>
                <div class="desc">{{item.desc}}</div>
                <div class="icon-box">
                    <i class="el-icon-edit"></i>
                    <i class="el-icon-delete"></i>
                </div>
            </div>

            <div style="margin-left: 28px" v-if="item.children">
                <rule-event :ruleEvent="item.children"></rule-event>
            </div>

        </div>
    </draggable>
</template>

<script>
import eventVue from '@/components/commonEvent'
import draggable from "vuedraggable";
export default {
    name: "RuleEvent",
    props: ["ruleEvent"],
    data() {
        return {
        };
    },
    created() {},
    watch: {
        ruleEvent() {
           eventVue.$emit("listenRuleChange", ' ')
        }
    },
    components: {
        draggable
    },
    methods: {
    }
};
</script>

<style lang='less' scoped>
.rule-logic-box:hover {
    cursor: move;
}
.rule-event-logic {
    .item {
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        margin: 10px 0;
        &:hover {
            border: 1px solid @baseColor;
        }
        .title {
            color: #606266;
            float: left;
            padding: 9px 15px;
            box-sizing: content-box;
            border-right: 1px dashed #ddd;
        }
        .desc {
            float: left;
            width: auto;
            padding: 9px 15px;
        }
        .icon-box {
            float: right;
            padding: 9px 15px;
            i {
                cursor: pointer;
                padding-left: 9px;
            }
        }
    }
}
</style>
