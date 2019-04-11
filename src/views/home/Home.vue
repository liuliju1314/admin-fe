<template>
    <div class="box-card" shadow="never">
        <el-row class="product-item" :gutter="10">
            <!-- 产品信息 -->
            <el-col :span="8">
                <div class="base-box">
                    <div class="product-content">
                        <div class="product-name">
                            <span style="font-size: 22px; line-height: 32px;">测试产品</span>
                            <span>
                                <span class="product-circle"></span>
                                <span style="font-size: 13px; color: #606266">开发中</span>
                            </span>

                            <span style="float: right">
                                <el-button type="primary" size="small">发布</el-button>
                            </span>
                        </div>
                        <div class="product-info">
                            <div>
                                <span class="label">产品ID：</span>
                                <span class="text">
                                    ck8bufgjc3k
                                    <el-button
                                        class="copy-box"
                                        size="mini"
                                        @click="copyPid('ck8bufgjc3k')"
                                        round
                                    >复制</el-button>
                                </span>
                            </div>
                            <div>
                                <span class="label">创建时间：</span>
                                <span class="text">2019-04-01</span>
                            </div>
                        </div>
                    </div>
                    <div class="button-box">
                        <div>
                            <el-button
                                type="primary"
                                round
                                class="button-details"
                                size="small"
                            >查看产品详情</el-button>
                            <el-button type="text" style="float:right;" size="small">删除</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="base-box">
                    <div class="device-content">
                        <div>
                            <div class="label">当前设备总数：</div>
                            <div class="device-num">20</div>
                        </div>
                        <div>
                            <div class="label">当前在线设备：</div>
                            <div class="device-num">20</div>
                        </div>
                        <div>
                            <div class="label">当前离线设备：</div>
                            <div class="device-num">0</div>
                        </div>
                    </div>
                    <div>
                        <el-button type="primary" round class="device-btn" size="small">查看设备详情</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import copy from "@/views/mixins/copy";
export default {
    mixins: [copy],
    name: "Home",
    data() {
        return {};
    },

    created() {},

    watch: {},

    components: {},

    computed: {},

    methods: {}
};
</script>
<style lang="less">
.product-item {
    .el-button--mini,
    .el-button--mini.is-round {
        padding: 4px 12px;
    }
    .button-box {
        .el-button + .el-button {
            margin: 0 15px;
        }
    }
}
</style>

<style lang='less' scoped>
.product-item {
    height: 192px;
    box-sizing: border-box;
    .base-box {
        background: #fff;
        padding: 20px;
    }
    .product-content {
        height: 120px;
        .product-name {
            margin-bottom: 12px;
            height: 32px;
            line-height: 32ppx;
        }
        .product-info {
            font-size: 13px;
            & > div {
                margin-bottom: 10px;
            }
            .copy-box {
                margin-left: 4px;
            }
            .label {
                font-size: 13px;
                display: inline-block;
                width: 70px;
                color: #909399;
            }
            .text {
                color: #606266;
            }
        }
        .product-circle {
            width: 6px;
            height: 6px;
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px 0 10px;
            border-radius: 50%;
            background-color: #1890ff;
        }
    }

    .device-content {
        display: flex;
        align-items: center;
        height: 120px;
        & > div {
            margin-right: 20px;
        }
        .device-num {
            text-align: center;
            margin: 12px 0;
            font-size: 25px;
            color: #606266;
        }
        .label {
            color: #909399;
            font-size: 13px;
        }
    }
}
.firmware-info {
    padding: 20px;
    .firmware-content {
        min-height: 120px;
        .firmware-num {
            font-size: 25px;
        }
    }
    .firmware-btn {
        color: #999;
        background-color: #fff;
        border: 1px solid rgb(24, 144, 255);
    }
    .firmware-btn:hover {
        color: #fff;
        background-color: rgb(24, 144, 255);
        border: 1px solid rgb(24, 144, 255);
    }
}
</style>