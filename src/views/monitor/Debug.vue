<template>
    <el-card class="box-card debug-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">在线调试</span>
        </div>
        <div class="text-wrapper">
            <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small">
                <el-form-item class="form-item" filterable prop="pid">
                    <el-select placeholder="请选择产品" v-model="form.pid">
                        <el-option
                            v-for="product in productList"
                            :label="product.name"
                            :value="product.pid"
                            :key="product.pid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-item" prop="did">
                    <el-select
                        placeholder="请选择设备"
                        v-model="form.did"
                        @focus="getDevice(form)"
                        @change="doDeviceSearch(form)"
                        filterable
                    >
                        <el-option
                            v-for="device in deviceList"
                            :label="device.did"
                            :value="device.did"
                            :key="device.did"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <span v-if="form.did">{{isdevOnline ? '在线': '离线'}}</span>
            </el-form>
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
                                @click="doSend"
                            >发送</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                style="margin-top: 20px"
                                @click="closeLink"
                            >关闭长连接</el-button>
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
                            <h3>
                                实时
                                <span class="link-status">{{linkStatus}}</span>
                            </h3>
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
export default {
    components: {},
    props: {},
    data() {
        return {
            form: {
                pid: "",
                did: ""
            },
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
            isdevOnline: false
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
        doSend() {
            const wsStatus = this.ws.readyState;
            if (wsStatus === 1) {
                //已经链接并且可以通讯
                this.sendData();
            } else {
                this.openLink();
            }
        },
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
            const curDev = this.deviceList.find(
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
            this.ws.close();
        },
        openLink() {
            const _this = this;
            this.linkStatus = "连接中";
            if ("WebSocket" in window) {
                // 打开一个 web socket
                this.ws = new WebSocket(
                    "ws://" + location.host + "/api/ws_message"
                );

                this.ws.onopen = () => {
                    this.sendData();
                };

                this.ws.onmessage = evt => {
                    const data = JSON.parse(evt.data);
                    if (data.code === 0) {
                        if (data.payload) {
                            _this.wsData.unshift(data.payload);
                        } else {
                            this.$message({
                                message: "指令发送成功",
                                type: "success"
                            });
                        }
                    } else if (data.code === 110004) {
                        this.$message({
                            message: "指令发送失敗",
                            type: "warning"
                        });
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
        getDevice(data) {
            this.deviceList = [];
            if (data.pid) {
                getDeviceList({ isPage: false, pid: data.pid })
                    .then(res => {
                        this.deviceList = res.payload.items;
                    })
                    .catch(error => {
                        return error;
                    });
            }
        },
        setProp(value) {
            this.content = {};
            const prop = this.propList.find(item => item.label === value);
            this.propPermission = prop.permission;
            this.content = Object.assign({}, { [prop.label]: prop.value });
            this.editor.set(this.content);
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