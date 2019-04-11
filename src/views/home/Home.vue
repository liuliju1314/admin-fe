<template>
    <div class="box-card" shadow="never">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-row class="el-content">
                    <!-- 产品信息 -->
                    <el-col :span="14">
                        <div class="product-info">
                            <div class="product-content">
                                <p class="product-name">
                                    <span>测试产品</span>
                                    <span class="product-circle"></span>
                                    <span style="font-size: 13px;margin:5px 0 0 0">开发中</span>
                                    <span style="float: right">
                                        <el-button
                                            type="primary"
                                            icon="el-icon-upload"
                                            size="small"
                                        >发布</el-button>
                                    </span>
                                </p>
                                <p>
                                    <span class="label">产品ID：</span>
                                    <span class="text">ck8bufgjc3k</span>
                                </p>
                                <p>
                                    <span class="label">创建时间：</span>
                                    <span class="text">2019-04-01</span>
                                </p>
                            </div>
                            <div class="button-box">
                                <p>
                                    <el-button
                                        type="primary"
                                        round
                                        class="button-details"
                                        size="small"
                                    >查看产品详情</el-button>
                                    <el-button type="text" style="float:right;">删除</el-button>
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <!-- 设备信息 -->
                    <el-col :span="8">
                        <div class="device-info">
                            <div class="device-content">
                                <p>
                                    <span class="label">当前设备总数：</span>
                                    <span class="device-num">20</span>
                                </p>
                                <p>
                                    <span class="label">当前在线设备：</span>
                                    <span class="device-num">20</span>
                                </p>
                                <p>
                                    <span class="label">当前离线设备：</span>
                                    <span class="device-num">0</span>
                                </p>
                            </div>
                            <p>
                                <el-button
                                    type="primary"
                                    round
                                    class="device-btn"
                                    size="small"
                                >查看设备详情</el-button>
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
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
<style lang='less' scoped>
.el-content {
    margin: 30px;
    background-color: #fff;
    .label {
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

.product-info {
    border-right: 1px dashed #ebeef5;
    padding: 20px;
    .product-content {
        min-height: 120px;
        .product-name {
            font-size: 20px;
            overflow: hidden;
            line-height: 40px;
            height: 40px;
        }
        .product-circle {
            width: 6px;
            height: 6px;
            display: inline-block;
            margin: 0 4px 0 10px;
            border-radius: 50%;
            vertical-align: middle;
            background-color: #1890ff;
        }
    }
    .button-box {
        p {
            overflow: hidden;
        }
        .button-details {
            color: #999;
            background-color: #fff;
            border: 1px solid rgb(24, 144, 255);
        }
        .button-details:hover {
            color: #fff;
            background-color: rgb(24, 144, 255);
            border: 1px solid rgb(24, 144, 255);
        }
    }
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