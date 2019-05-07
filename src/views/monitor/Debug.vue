<template>
    <el-card class="box-card debug-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">在线调试</span>
        </div>
        <div class="text-wrapper">
            <el-button
                type="primary"
                icon="el-icon-plus"
                style="margin-bottom:20px"
                @click="dialogVisible = true"
            >选择设备</el-button>

            <div style="margin-bottom:20px">当前选中产品：{{chooseData.name}}，当前选择设备：{{chooseData.did}}</div>

            <el-dialog title="选择设备" :visible.sync="dialogVisible" center>
                <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small">
                    <el-form-item class="form-item" prop="pid">
                        <el-select
                            placeholder="请选择产品"
                            filterable
                            v-model="form.pid"
                            @change="getDeviceListMethod(form.pid)"
                        >
                            <el-option
                                v-for="product in productList"
                                :label="product.name"
                                :value="product.pid"
                                :key="product.pid"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-table :data="getDeviceListData">
                        <el-table-column width="100" label="选择">
                            <template slot-scope="scope">
                                <el-radio
                                    v-model="radio"
                                    :label="scope.row.did"
                                    @change="handleDeviceChoice(scope.row)"
                                >选择</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column prop="did" label="设备编号"></el-table-column>

                        <el-table-column label="设备类型">
                            <template slot-scope="scope">
                                <span>{{ handleFormatter(scope.row, 'deviceType', scope.row.deviceType) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="在线状态">
                            <template slot-scope="scope">
                                <span
                                    class="cell-item"
                                    :class="scope.row.status === 1? 'online': 'outline'"
                                ></span>
                                <span>{{ handleFormatter(scope.row, 'status', scope.row.status) }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
                <!-- 分页逻辑 -->
                <div class="pagination-box" v-if="form.pageSize < total">
                    <el-pagination
                        :page-size="form.pageSize"
                        :page="form.page"
                        layout="prev, pager, next"
                        :total="total"
                        @current-change="handlePage"
                    ></el-pagination>
                </div>
            </el-dialog>
            <el-row :gutter="12">
                <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
                    <div class="left">
                        <div>
                            <h3>设备编辑</h3>
                        </div>
                        <div v-if="form.did">
                            <div style="margin-bottom: 10px;display: flex;">
                                <el-select
                                    v-model="propId"
                                    placeholder="请选择功能"
                                    size="small"
                                    style="margin-right: 10px"
                                    @change="setProp"
                                >
                                    <el-option
                                        v-for="prop in propList"
                                        :label="prop.name"
                                        :value="prop.label"
                                        :key="prop.id"
                                    ></el-option>
                                </el-select>

                                <el-select v-model="method" placeholder="请选择方法" size="small">
                                    <el-option
                                        v-if="propPermission === 'RW' || propPermission === 'WO'"
                                        label="设置"
                                        value="set"
                                    ></el-option>
                                    <el-option
                                        v-if="propPermission === 'RW' || propPermission === 'RO'"
                                        label="获取"
                                        value="get"
                                    ></el-option>
                                </el-select>
                            </div>

                            <div ref="editor" id="editor" style="height: 43vh"></div>

                            <el-button
                                size="small"
                                type="primary"
                                style="margin-top: 20px"
                                @click="sendData"
                            >发送</el-button>
                        </div>
                        <div
                            v-else
                            style="height: 50vh;line-height: 50vh;text-align: center;font-size: 20px;color:#303133"
                        >
                            <svg-icon icon-class="virtualDevice" style="margin: 0 10px"></svg-icon>请先选择调试设备
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
                    <div class="right">
                        <div>
                            <h3 style="float: left">
                                实时
                                <span class="link-status">{{linkStatus}}</span>
                            </h3>
                            <el-select
                                v-model="level"
                                placeholder="请选择日志等级"
                                @change="chooseLogLevel"
                                style="margin:10px 20px ;float: left"
                                size="small"
                            >
                                <el-option label="调试" value="debug"></el-option>
                                <el-option label="消息" value="info"></el-option>
                                <el-option label="预警" value="warning"></el-option>
                                <el-option label="错误" value="error"></el-option>
                            </el-select>
                            <el-button
                                size="small"
                                type="text"
                                style="margin-top: 20px;float:right;"
                                icon="el-icon-setting"
                                @click="closeLink"
                            >{{ws ? '关闭设备连接': '开启设备连接'}}</el-button>
                        </div>
                        <el-table
                            :data="wsData"
                            height="57vh"
                            stripe
                            style="width: 100%;"
                            size="small"
                        >
                            <el-table-column prop="msgType" label="类型" width="120"></el-table-column>
                            <el-table-column prop="time" label="时间" width="150"></el-table-column>
                            <el-table-column label="内容">
                                <template slot-scope="scope">{{JSON.stringify(scope.row.content)}}</template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
import { getProductList } from "@/api/product/product";
import { getDeviceList, getDeviceProps } from "@/api/device/device";
import { sendMessage, sendDebugLevel } from "@/api/debug/debug";
export default {
    components: {},
    props: {},
    data() {
        return {
            form: {
                pid: "",
                did: "",
                page: 1,
                pageSize: 10
            },
            level: "debug",
            propId: "",
            method: "",
            rules: {
                pid: [
                    { required: true, message: "请选择产品", trigger: "blur" }
                ],
                did: [
                    { required: true, message: "请选择设备", trigger: "blur" }
                ]
            },
            ws: "",
            wsData: [],
            // 富文本
            editor: "",
            content: {},
            editorOption: {
                mode: "code",
                modes: ["text", "code"]
            },
            productList: [],
            deviceList: [],
            propList: [],
            propPermission: "",
            linkStatus: "",
            isdevOnline: false,
            dialogVisible: false,
            getDeviceListData: [],
            radio: "",
            total: "",
            chooseData: ""
        };
    },
    created() {
        this.getProduct();
    },
    mounted() {},
    beforeDestroy() {
        this.closeLink();
    },
    methods: {
        // 发送数据
        sendData() {
            this.content = this.editor.get(); //把编辑框中的文本赋值过来
            if (!this.content) {
                this.$message({
                    type: "warning",
                    message: "指令不能为空"
                });
            }

            if (this.method == "set") {
                if (Object.values(this.content).some(item => item === null)) {
                    this.$message({
                        type: "warning",
                        message: "属性值不能为空"
                    });
                    return;
                }
            }
            const data = {
                pid: this.form.pid,
                did: this.form.did,
                action: this.method,
                payload: { ...this.content }
            };
            sendMessage(data)
                .then(() => {
                    this.$message({
                        message: "指令发送成功",
                        type: "success"
                    });
                })
                .catch(err => {
                    return err;
                });
            this.ws.send(JSON.stringify(data));
            this.linkStatus = "设备上线";
        },

        doDeviceSearch() {
            if (!this.editor) {
                this.$nextTick(() => {
                    this.editor = new JSONEditor(
                        this.$refs.editor,
                        this.editorOption
                    );
                    this.editor.set(this.content);
                });
            }
            // 选中设备在离线状态判断
            const curDev = this.getDeviceListData.find(
                dev => dev.did === this.form.did
            );

            this.isdevOnline = curDev.status === 1 ? true : false;
            getDeviceProps({ ...this.form, businessType: [1, 2, 3] }).then(
                res => {
                    this.propList = res.payload;
                }
            );
        },
        closeLink() {
            if (this.ws) {
                this.ws.close();
                this.ws = "";
            } else {
                this.openLink();
            }
        },
        openLink() {
            const _this = this;
            if (!this.form.did) {
                this.$message({
                    type: "warning",
                    message: "请选择需要连接的设备"
                });
                return;
            }
            if ("WebSocket" in window) {
                // 打开一个 web socket
                this.ws = new WebSocket(
                    "ws://" + location.host + "/api/ws_message"
                );

                this.ws.onopen = () => {
                    const data = {
                        pid: this.form.pid,
                        did: this.form.did
                    };
                    this.ws.send(JSON.stringify(data));
                    _this.linkStatus = "连接中";
                };

                this.ws.onmessage = evt => {
                    const data = JSON.parse(evt.data);
                    if (data.code === 0) {
                        if (data.payload) {
                            _this.linkStatus = "通讯中";
                            _this.wsData.unshift(data.payload);
                        }
                    }
                };

                this.ws.onclose = () => {
                    _this.linkStatus = "连接已关闭";
                };
                this.ws.onerror = function(event) {
                    console.error("WebSocket error observed:", event);
                };
            } else {
                // 浏览器不支持 WebSocket
                alert("您的浏览器不支持 WebSocket!");
            }
        },
        getProduct() {
            if (this.productList.length === 0) {
                getProductList({ isPage: false })
                    .then(res => {
                        this.productList = res.payload.result;
                    })
                    .catch(error => {
                        return error;
                    });
            }
        },
        getDevice() {
            const data = {
                pid: this.form.pid,
                page: this.form.page,
                pageSize: 10
            };
            getDeviceList(data)
                .then(res => {
                    this.getDeviceListData = res.payload.items;
                    this.total = res.payload.total;
                })
                .catch(error => {
                    return error;
                });
        },
        setProp(value) {
            console.log("value: " + value);
            this.content = {};
            const prop = this.propList.find(item => item.label === value);
            this.propPermission = prop.permission;
            this.content = Object.assign({}, { [prop.label]: prop.value });
            this.editor.set(this.content);
        },
        getDeviceListMethod(value) {
            this.getDeviceListData = [];
            this.form.page = 1;
            this.form.pid = value;
            if (value) {
                this.getDevice();
            }
        },
        //分页
        handlePage(value) {
            this.form.page = value;
            this.getDevice();
        },
        // 日志等级
        chooseLogLevel(value) {
            if (!this.form.did) {
                return;
            }
            const data = {
                pid: this.form.pid,
                did: this.form.did,
                level: value
            };
            sendDebugLevel(data).then(() => {});
        },
        handleDeviceChoice(value) {
            this.form.pid = value.pid;
            this.form.did = value.did;
            this.doDeviceSearch();
            this.dialogVisible = false;
            this.chooseData = value;
            if (this.ws) {
                this.closeLink();
            }

            this.openLink();
        },
        // 格式化表单显示
        handleFormatter(row, column, cellValue) {
            const prop = column.property || column;
            let result;
            switch (prop) {
                case "status":
                    if (cellValue === 0) {
                        result = "未知状态";
                    } else if (cellValue === 1) {
                        result = "在线";
                    } else if (cellValue === 2) {
                        result = "离线";
                    }
                    break;
                case "deviceType":
                    if (cellValue === "true") {
                        result = "真实设备";
                    } else if (cellValue === "virtual") {
                        result = "虚拟设备";
                    }
                    break;
            }
            return result;
        }
    }
};
</script>
<style lang="less">
.debug-wrapper {
    .el-card__body {
        padding-bottom: 0px;
    }
    div.jsoneditor-menu > button,
    div.jsoneditor-menu > div.jsoneditor-modes > button {
        display: none;
    }
    div.jsoneditor {
        border: 1px solid #efefef;
    }
    div.jsoneditor-menu {
        background: #efefef;
        border: 1px solid #efefef;
    }
    div.jsoneditor-statusbar {
        display: none;
    }
    div.jsoneditor-outer.has-status-bar {
        margin-bottom: 0;
        padding-bottom: 0;
    }
}
</style>

<style lang="less" scoped>
.left,
.right {
    border: 1px solid #ddd;
    padding: 10px 18px;
    font-size: 14px;
    height: 63vh;
    td {
        padding: 4px;
        margin: 4px;
    }
    .link-status {
        font-size: 13px;
        font-weight: normal;
        color: #1890ff;
    }
}
</style>