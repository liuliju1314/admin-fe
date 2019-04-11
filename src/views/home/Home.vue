<template>
    <div class="box-card" shadow="never">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row class="el-content">
                    <!-- 产品信息 -->
                    <el-col :span="24">
                        <div class="product-item">
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
                    <!-- 设备信息 -->
                    <!-- <el-col :span="7">
                        <div class="device-info">
                            <div class="device-content">
                                <div>
                                    <span class="label">当前设备总数：</span>
                                    <span class="device-num">20</span>
                                </div>
                                <div>
                                    <span class="label">当前在线设备：</span>
                                    <span class="device-num">20</span>
                                </div>
                                <div>
                                    <span class="label">当前离线设备：</span>
                                    <span class="device-num">0</span>
                                </div>
                            </div>
                            <div>
                                <el-button
                                    type="primary"
                                    round
                                    class="device-btn"
                                    size="small"
                                >查看设备详情</el-button>
                            </div>
                        </div>
                    </el-col>-->
                </el-row>
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
    };
    .button-box {
        .el-button+.el-button {
            margin: 0 15px;
        }        
    }

}
</style>

<style lang='less' scoped>
.el-content {
    margin: 0px;
    background-color: #fff;
    .label {
        display: inline-block;
        width: 70px;
        color: #909399;
    }
    .text {
        color: #606266;
    }
}

p > span {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
}

.product-item {
    // border-right: 1px dashed #ebeef5;
    padding: 20px;
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
    // .button-box {
    //     .button-details {
    //         color: #999;
    //         background-color: #fff;
    //         border: 1px solid rgb(24, 144, 255);
    //     }
    //     .button-details:hover {
    //         color: #fff;
    //         background-color: rgb(24, 144, 255);
    //         border: 1px solid rgb(24, 144, 255);
    //     }
    // }
}
.device-info {
    padding: 20px;
    .device-content {
        min-height: 120px;
        .device-num {
            font-size: 25px;
            color: #606266;
        }
    }
    .device-btn {
        color: #999;
        background-color: #fff;
        border: 1px solid rgb(24, 144, 255);
    }
    .device-btn:hover {
        color: #fff;
        background-color: rgb(24, 144, 255);
        border: 1px solid rgb(24, 144, 255);
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