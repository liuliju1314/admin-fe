<template>
    <el-card class="box-card manage-wrapper" shadow="never">
        <el-row>
            <el-col :span="12">
                <el-row style="background-color:#f0f2f5;margin: 10px">
                    <!-- 产品信息 -->
                    <el-col :span="10">
                        <div class="product-info">
                            <div class="content">
                                <p class="content-name">
                                    <span>测试产品</span>
                                    <span class="content-circle"></span>
                                    <span style="font-size: 13px;">开发中</span>
                                    <el-button type="primary" round class="content-release">发布</el-button>
                                </p>
                                <p>
                                    <span>产品ID：</span>
                                    <span class="card-val monospace">ck8bufgjc3k</span>
                                </p>
                                <p>
                                    <span>创建时间：</span>
                                    <span class="card-val">2019-04-01</span>
                                </p>
                            </div>

                            <div class="button-box">
                                <p class="last" style="overfloe:hidden">
                                    <el-button type="primary" round class="button-details">
                                        <!-- <svg-icon icon-class="details"></svg-icon> -->
                                        <span>查看产品详情</span>
                                    </el-button>
                                    <el-button type="primary" round class="button-delete">删除</el-button>
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <!-- 设备信息 -->
                    <el-col :span="7">
                        <div class="device-info">
                            <div class="device-content">
                                <p>
                                    <span>当前设备总数：</span>
                                    <span class="device-num">20</span>
                                </p>
                                <p>
                                    <span>当前在线设备：</span>
                                    <span class="device-num">20</span>
                                </p>
                                <p>
                                    <span>当前离线设备：</span>
                                    <span class="device-num">0</span>
                                </p>
                            </div>
                            <p class="last">
                                <el-button type="primary" round class="device-btn">查看设备详情</el-button>
                            </p>
                        </div>
                    </el-col>
                    <!-- 固件信息 -->
                    <el-col :span="7">
                        <div class="firmware-info">
                            <div class="firmware-content">
                                <p>
                                    <span>当前固件数量：</span>
                                    <span class="firmware-num">10</span>
                                </p>
                            </div>
                            <p class="last">
                                <el-button type="primary" round class="firmware-btn">查看固件详情</el-button>
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="12">
                <el-row style="background-color:#f0f2f5;margin: 10px">
                    <!-- 产品信息 -->
                    <el-col :span="10">
                        <div class="product-info">
                            <div class="content">
                                <p class="content-name">
                                    <span>测试产品</span>
                                    <span class="content-circle"></span>
                                    <span style="font-size: 13px;">开发中</span>
                                    <el-button type="primary" round class="content-release">发布</el-button>
                                </p>
                                <p>
                                    <span>产品ID：</span>
                                    <span class="card-val monospace">ck8bufgjc3k</span>
                                </p>
                                <p>
                                    <span>创建时间：</span>
                                    <span class="card-val">2019-04-01</span>
                                </p>
                            </div>

                            <div class="button-box">
                                <p class="last" style="overfloe:hidden">
                                    <el-button type="primary" round class="button-details">查看产品详情</el-button>
                                    <el-button type="primary" round class="button-delete">删除</el-button>
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <!-- 设备信息 -->
                    <el-col :span="7">
                        <div class="device-info">
                            <div class="device-content">
                                <p>
                                    <span>当前设备总数：</span>
                                    <span class="device-num">20</span>
                                </p>
                                <p>
                                    <span>当前在线设备：</span>
                                    <span class="device-num">20</span>
                                </p>
                                <p>
                                    <span>当前离线设备：</span>
                                    <span class="device-num">0</span>
                                </p>
                            </div>
                            <p class="last">
                                <el-button type="primary" round class="device-btn">查看设备详情</el-button>
                            </p>
                        </div>
                    </el-col>
                    <!-- 固件信息 -->
                    <el-col :span="7">
                        <div class="firmware-info">
                            <div class="firmware-content">
                                <p>
                                    <span>当前固件数量：</span>
                                    <span class="firmware-num">10</span>
                                </p>
                            </div>
                            <p class="last">
                                <el-button type="primary" round class="firmware-btn">查看固件详情</el-button>
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
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
.product-info {
    border-right: 1px dashed #cccccc;
    padding: 30px;
    .content {
        min-height: 120px;
        .content-name {
            font-size: 20px;
            overflow: hidden;
            line-height: 40px;
            height: 40px;
        }
        .content-circle {
            width: 6px;
            height: 6px;
            display: inline-block;
            margin: 0 4px;
            border-radius: 50%;
            vertical-align: middle;
            background-color: #1890ff;
        }
        .content-release {
            color: #999;
            background-color: #fff;
            border: 1px solid rgb(24, 144, 255);
            float: right;
        }
        .content-release:hover {
            color: #fff;
            background-color: rgb(24, 144, 255);
            border: 1px solid rgb(24, 144, 255);
        }
    }
    .button-box {
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
        .button-delete {
            color: #999;
            background-color: #fff;
            border: 1px solid #f56c6c;
            float: right;
        }
        .button-delete:hover {
            color: #fff;
            background-color: #f56c6c;
            border: 1px solid #f56c6c;
        }
    }
}
.device-info {
    border-right: 1px dashed #cccccc;
    padding: 30px;
    .device-content {
        min-height: 120px;
        .device-num {
            font-size: 25px;
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
    padding: 30px;
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