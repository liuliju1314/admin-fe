<template>
    <div class="base-info-box">
        <table class="table-box">
            <tr>
                <td class="label">规则名称:</td>
                <td class="value">智能遥感水位传感器</td>
            </tr>
            <tr>
                <td class="label">标志符:</td>
                <td class="value">Y2435464g</td>
            </tr>
            <tr>
                <td class="label">规则描述:</td>
                <td class="value">该产品主要用于水利方向的图像检测和水位检测</td>
            </tr>
        </table>
        <el-button
            @click="dialogVisible=true"
            style="padding: 10px 22px; margin: 30px 0 0 100px;"
        >编辑</el-button>
        <!-- 编辑产品对话框 -->
        <el-dialog title="信息编辑" :visible.sync="dialogVisible" center>
           <add-engine :rule="rule"></add-engine>
        </el-dialog>
    </div>
</template>

<script>
import AddEngine from "@/views/rule/AddEngine";
export default {
    name: "BaseInfo",
    data() {
        return {
            dialogVisible: false
        };
    },
    components: {
        AddEngine
    },
    created() {
        console.log("this.$router: " + JSON.stringify(this.$route.params.pid));
    },
    methods: {
    }
};
</script>
<style lang="less">
// .base-info-box {
//     .notEdit {
//         input {
//             border: 0;
//             padding: 0;
//             height: 30px;
//             font-size: 16px;
//             color: #333;
//         }
//     }
// }
</style>
<style lang='less' scoped>
.ve-pie {
    height: 190px !important;
}
.add-category {
    margin-left: 90px;
    padding-top: 0 !important;
    padding-bottom: 22px !important;
}
.link-item {
    text-decoration: none;
    padding-right: 22px;
}
.base-info-box {
    width: 60%;
    margin: 20px auto;
    .label {
        width: 100px;
        color: #797979;
        padding: 12px 10px;
        box-sizing: border-box;
    }
    .value {
        padding: 12px 0;
    }
}
</style>