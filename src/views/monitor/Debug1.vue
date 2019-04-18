<template>
    <el-card class="box-card debug-wrapper" shadow="never">
        <div slot="header" class="clearfix">
            <span class="card-title">在线调试</span>
        </div>
        <div class="text-wrapper">
            <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small">
                <el-form-item label="请选择设备" class="form-item" filterable prop="pid">
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
            </el-form>

            <el-row :gutter="12">
                <el-col :span="8">
                    <div class="left">
                        <div>
                            <h3>设备编辑</h3>
                        </div>
                        <el-tabs v-model="activeName" v-if="form.did">
                            <el-tab-pane label="调试真实设备" name="trueDevice">
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
                                        <el-option label="设置" value="set"></el-option>
                                        <el-option label="获取" value="get"></el-option>
                                    </el-select>
                                </div>
                                <div ref="editor" id="editor" style="height: 43vh"></div>
                                <el-button
                                    size="small"
                                    type="primary"
                                    style="margin-top: 20px"
                                    @click="sendData"
                                >发送</el-button>
                                <el-button
                                    size="small"
                                    type="primary"
                                    style="margin-top: 20px"
                                    @click="closeLink"
                                >关闭长连接</el-button>
                            </el-tab-pane>
                            <el-tab-pane label="虚拟真实设备" name="virtualDevice">
                                <div
                                    v-if="openDevice"
                                    class="openDevice"
                                    style="height: 50vh;line-height: 50vh;text-align: center"
                                >
                                    <el-button
                                        size="small"
                                        type="primary"
                                        @click="openVirtualDevice"
                                    >启动虚拟设备</el-button>
                                </div>
                                <div v-else>
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

                                        <el-select
                                            v-model="method"
                                            placeholder="请选择方法"
                                            size="small"
                                        >
                                            <el-option label="设置" value="set"></el-option>
                                            <el-option label="获取" value="get"></el-option>
                                        </el-select>
                                    </div>

                                    <div ref="editor1" id="editor1" style="height: 43vh"></div>

                                    <el-button
                                        size="small"
                                        type="primary"
                                        style="margin-top: 20px"
                                        @click="sendData"
                                    >发送</el-button>
                                    <el-button
                                        size="small"
                                        type="primary"
                                        style="margin-top: 20px"
                                        @click="closeLink"
                                    >关闭长连接</el-button>
                                    <el-button
                                        size="small"
                                        type="primary"
                                        style="margin-top: 20px"
                                        @click="closeVirtualDevice"
                                    >关闭虚拟设备</el-button>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                        <div
                            v-else
                            style="height: 50vh;line-height: 50vh;text-align: center;font-size: 20px;color:#303133"
                        >
                            <svg-icon icon-class="virtualDevice" style="margin: 0 10px"></svg-icon>请先选择调试设备
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="right">
                        <div>
                            <h3>实时</h3>
                        </div>
                        <el-table :data="wsData" stripe style="width: 100%" size="small">
                            <el-table-column prop="date" label="类型/时间" width="180"></el-table-column>
                            <el-table-column prop="name" label="内容"></el-table-column>
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
import { startVirtualDevice, stopVirtualDevice } from "@/api/debug/debug";
export default {
    data() {
        return {
            openDevice: true,
            activeName: "virtualDevice",
            form: {
                pid: "",
                did: ""
            },
            propId: "",
            method: "",
            device: "",
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
            editor1: "",
            content: {},
            editorOption: {
                mode: "code",
                modes: ["text", "code"]
            },
            productList: [],
            deviceList: [],
            propList: []
        };
    },
    created() {
        this.getProduct();
    },
    // mounted() {
    //     this.$nextTick(() => {
    //         this.editor = new JSONEditor(this.$refs.editor, this.editorOption);
    //         this.editor.set(this.content);
    //     });
    // },
    beforeDestroy() {
        this.closeLink();
    },
    methods: {
        // 获取产品信息
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
        // 获取产品下的设备的信息
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
        // 获取产品下的设备的属性信息
        doDeviceSearch() {
            // this.$nextTick(() => {
            //     this.editor = new JSONEditor(
            //         this.$refs.editor,
            //         this.editorOption
            //     );
            //     this.editor.set(this.content);
            // });
            getDeviceProps(this.form).then(res => {
                this.propList = res.payload;
            });
            this.openLink();
        },
        // 启动虚拟设备
        openVirtualDevice() {
            this.$refs.form.validate(valid => {
                this.$nextTick(() => {
                    this.editor1 = new JSONEditor(
                        this.$refs.editor1,
                        this.editorOption
                    );
                    this.editor1.set(this.content);
                });
                if (valid) {
                    this.openDevice = false;
                    const data = {
                        ...this.form
                    };
                    startVirtualDevice(data).then(() => {});
                } else {
                    return false;
                }
            });
        },
        // 关闭虚拟设备
        closeVirtualDevice() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.openDevice = true;
                    const data = {
                        ...this.form
                    };
                    stopVirtualDevice(data).then(() => {});
                } else {
                    return false;
                }
            });
        },
        // 发送数据
        sendData() {
            this.content = this.editor1.get(); //把编辑框中的文本赋值过来
            console.dir(this.content);
            const data = {
                pid: this.form.pid,
                did: this.form.did,
                payload: {}
            };
            if (this.method == "get") {
                const payload = {
                    action: this.method,
                    data: this.propId
                };
                data.payload = payload;
                this.ws.send(JSON.stringify(data));
            } else if (this.method == "set") {
                if (Object.values(this.content)[0] === null) {
                    this.$message({
                        type: "warning",
                        message: "属性值不能为空"
                    });
                } else {
                    const payload = {
                        action: this.method,
                        key: Object.keys(this.content)[0],
                        value: Object.values(this.content)[0]
                    };
                    data.payload = payload;
                    this.ws.send(JSON.stringify(data));
                }
            }
        },
        // 打开webSocketLink连接
        openLink() {
            this.WebSocketLink();
        },
        // 关闭webSocketLink连接
        closeLink() {
            this.ws.close();
        },
        // 新建一个webSocket
        WebSocketLink() {
            if ("WebSocket" in window) {
                // 打开一个 web socket
                this.ws = new WebSocket(
                    "ws://47.107.91.58:11021/api/ws_message"
                );
                // this.ws = new WebSocket(
                //     "ws://" + location.host + "/api/ws_message"
                // );
                this.ws.onopen = () => {
                    this.sendData();
                };

                this.ws.onmessage = evt => {
                    console.log("evt.data: " + evt.data);
                    this.wsData.push(evt.data);
                };

                this.ws.onclose = () => {
                    console.log("关闭WebSocket");
                };
            } else {
                // 浏览器不支持 WebSocket
                alert("您的浏览器不支持 WebSocket!");
            }
        },

        setProp(value) {
            this.content = {};
            const prop = this.propList.find(item => item.label === value);
            this.content = Object.assign({}, { [prop.label]: prop.value });
            this.editor1.set(this.content);
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
    height: 65vh;
    td {
        padding: 4px;
        margin: 4px;
    }
}
</style>