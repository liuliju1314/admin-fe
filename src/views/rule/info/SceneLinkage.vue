<template>
    <div class="linkage-box">
        <el-form size="small" ref="form" :model="form">
            <div class="condition-box">
                <div class="title">触发条件：</div>
                <div
                    class="condition-item"
                    v-for="(item, index) in form.triggerList"
                    :key="item.only"
                >
                    <div class="sort">{{index + 1}}</div>
                    <div class="content">
                        <el-form-item
                            class="form-item"
                            :prop="'triggerList.' + index + '.type'"
                            :rules="{
                            required: true, message: '请选择触发类型', trigger: 'blur'
                        }"
                        >
                            <el-select
                                placeholder="请选择触发类型"
                                v-model="item.type"
                                @change="changeTriggerType(item)"
                            >
                                <el-option label="设备触发" value="device"></el-option>
                            </el-select>
                        </el-form-item>
                        <template v-if="item.type === 'device'">
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.pid'"
                                :rules="{
                                    required: true, message: '请选择产品', trigger: 'blur'
                                }"
                            >
                                <el-select
                                    placeholder="请选择产品"
                                    v-model="item.pid"
                                    @focus="getProduct"
                                >
                                    <el-option
                                        v-for="product in productList"
                                        :label="product.name"
                                        :value="product.pid"
                                        :key="product.pid"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.did'"
                                :rules="{
                                    required: true, message: '请选择设备', trigger: 'blur'
                                }"
                            >
                                <el-select
                                    placeholder="请选择设备"
                                    v-model="item.did"
                                    filterable
                                    @focus="getDevice(item)"
                                >
                                    <el-option
                                        v-for="device in deviceList"
                                        :label="device.did"
                                        :value="device.did"
                                        :key="device.did"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.key'"
                                :rules="{
                                    required: true, message: '请选择属性', trigger: 'blur'
                                }"
                            >
                                <el-select
                                    placeholder="请选择属性"
                                    v-model="item.key"
                                    filterable
                                    @focus="getProperty(item)"
                                >
                                    <el-option
                                        v-for="(property,index) in propertyList"
                                        :label="property.name"
                                        :value="property.label"
                                        :key="index"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.op'"
                                :rules="{
                                    required: true, message: '请选择比较方式', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择比较模式" v-model="item.op">
                                    <el-option label=">" value=">"></el-option>
                                    <el-option label=">=" value=">="></el-option>
                                    <el-option label="<" value="<"></el-option>
                                    <el-option label="<=" value="<="></el-option>
                                    <el-option label="==" value="=="></el-option>
                                    <el-option label="!=" value="!="></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.value'"
                                :rules="{
                                    required: true, message: '请输入比较值', trigger: 'blur'
                                }"
                            >
                                <el-input placeholder="请输入比较值" v-model="item.value"></el-input>
                            </el-form-item>
                        </template>
                    </div>
                    <el-button
                        size="small"
                        style="height: 32px; margin-left: 10px;"
                        @click.prevent="removeTrigger(item, 'triggerList')"
                    >删除</el-button>
                </div>
                <div>
                    <el-button type="text" @click="addTrigger('triggerList')">+ 新增触发条件</el-button>
                </div>
            </div>
            <div class="condition-box">
                <div class="title">过滤条件：</div>
                <div
                    class="condition-item"
                    v-for="(item, index) in form.filterList"
                    :key="item.key"
                >
                    <div class="sort">{{index + 1}}</div>
                    <div class="content">
                        <el-form-item
                            class="form-item"
                            :prop="'filterList.' + index + '.type'"
                            :rules="{
                            message: '请选择过滤类型', trigger: 'blur'
                        }"
                        >
                            <el-select
                                placeholder="请选择过滤类型"
                                v-model="item.type"
                                @change="changeTriggerType(item)"
                            >
                                <el-option label="设备过滤" value="device"></el-option>
                            </el-select>
                        </el-form-item>
                        <template v-if="item.type === 'device'">
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.pid'"
                                :rules="{
                                    message: '请选择产品', trigger: 'blur'
                                }"
                            >
                                <el-select
                                    placeholder="请选择产品"
                                    v-model="item.pid"
                                    @focus="getProduct"
                                >
                                    <el-option
                                        v-for="product in productList"
                                        :label="product.name"
                                        :value="product.pid"
                                        :key="product.pid"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.did'"
                                :rules="{
                                    message: '请选择设备', trigger: 'blur'
                                }"
                            >
                                <el-select
                                    placeholder="请选择设备"
                                    v-model="item.did"
                                    filterable
                                    @focus="getDevice(item)"
                                >
                                    <el-option
                                        v-for="device in deviceList"
                                        :label="device.did"
                                        :value="device.did"
                                        :key="device.did"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.key'"
                                :rules="{
                                    message: '请选择属性', trigger: 'blur'
                                }"
                            >
                                <el-select
                                    placeholder="请选择属性"
                                    v-model="item.key"
                                    filterable
                                    @focus="getProperty(item)"
                                >
                                    <el-option
                                        v-for="property in propertyList"
                                        :label="property.name"
                                        :value="property.label"
                                        :key="property.label"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.op'"
                                :rules="{
                                    message: '请选择比较方式', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择比较模式" v-model="item.op">
                                    <el-option label=">" value=">"></el-option>
                                    <el-option label=">=" value=">="></el-option>
                                    <el-option label="<" value="<"></el-option>
                                    <el-option label="<=" value="<="></el-option>
                                    <el-option label="==" value="=="></el-option>
                                    <el-option label="!=" value="!="></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.value'"
                                :rules="{
                                     message: '请输入比较值', trigger: 'blur'
                                }"
                            >
                                <el-input placeholder="请输入比较值" v-model="item.value"></el-input>
                            </el-form-item>
                        </template>
                    </div>
                    <el-button
                        size="small"
                        style="height: 32px; margin-left: 10px;"
                        @click.prevent="removeTrigger(item, 'filterList')"
                    >删除</el-button>
                </div>
                <div>
                    <el-button type="text" @click="addTrigger('filterList')">+ 新增过滤条件</el-button>
                </div>
            </div>
            <div class="condition-box">
                <div class="title">执行条件：</div>
                <div
                    class="condition-item"
                    v-for="(item, index) in form.actionList"
                    :key="item.key"
                >
                    <div class="sort">{{index + 1}}</div>
                    <div class="content">
                        <el-form-item
                            class="form-item"
                            :prop="'actionList.' + index + '.type'"
                            :rules="{
                            required: true, message: '请选择输出类型', trigger: 'blur'
                        }"
                        >
                            <el-select
                                placeholder="请选择输出类型"
                                v-model="item.type"
                                @change="changeTriggerType(item)"
                            >
                                <el-option label="设备输出" value="device"></el-option>
                            </el-select>
                        </el-form-item>
                        <template v-if="item.type === 'device'">
                            <el-form-item
                                class="form-item"
                                :prop="'actionList.' + index + '.pid'"
                                :rules="{
                                    required: true, message: '请选择产品', trigger: 'blur'
                                }"
                            >
                                <el-select
                                    placeholder="请选择产品"
                                    v-model="item.pid"
                                    @focus="getProduct"
                                >
                                    <el-option
                                        v-for="product in productList"
                                        :label="product.name"
                                        :value="product.pid"
                                        :key="product.pid"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'actionList.' + index + '.did'"
                                :rules="{
                                    required: true, message: '请选择设备', trigger: 'blur'
                                }"
                            >
                                <el-select
                                    placeholder="请选择设备"
                                    v-model="item.did"
                                    filterable
                                    @focus="getDevice(item)"
                                >
                                    <el-option
                                        v-for="device in deviceList"
                                        :label="device.did"
                                        :value="device.did"
                                        :key="device.did"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'actionList.' + index + '.key'"
                                :rules="{
                                    required: true, message: '请选择属性', trigger: 'blur'
                                }"
                            >
                                <el-select
                                    placeholder="请选择属性"
                                    v-model="item.key"
                                    filterable
                                    @focus="getProperty(item)"
                                    @change="getMetaData"
                                >
                                    <el-option
                                        v-for="property in propertyList"
                                        :label="property.name"
                                        :value="property.label"
                                        :key="property.label"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'actionList.' + index + '.value'"
                                :rules="{
                                    required: true, message: '请输入或选择值', trigger: 'blur'
                                }"
                            >
                                <el-select
                                    v-model="item.value"
                                    placeholder="请输入或选择值"
                                    allow-create
                                    filterable
                                >
                                    <el-option
                                        v-for="item in metaData"
                                        :key="item.propertyValue"
                                        :label="item.propertyDesc"
                                        :value="item.propertyValue"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </div>
                    <el-button
                        size="small"
                        style="height: 32px; margin-left: 10px;"
                        @click.prevent="removeTrigger(item, 'actionList')"
                    >删除</el-button>
                </div>
                <div>
                    <el-button type="text" @click="addTrigger('actionList')">+ 新增执行条件</el-button>
                </div>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitRule">确定并保存</el-button>
                <el-button @click="cancelEdit">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getProductList } from "@/api/product/product";
import { getDeviceList } from "@/api/device/device";
import { getDeviceProps } from "@/api/device/device";
export default {
    name: "SceneLinkage",
    data() {
        return {
            form: {
                triggerList: [
                    {
                        type: "device"
                    }
                ],
                filterList: [
                    {
                        type: "device"
                    }
                ],
                actionList: [
                    {
                        type: "device",
                        name: "123"
                    }
                ]
            },
            productList: [],
            deviceList: [],
            propertyList: [],
            metaData: []
        };
    },
    computed: {
        ...mapGetters(["ruleInfo"])
    },
    watch: {
        $route() {
            if (
                this.$route.path.indexOf("rule") >= 0 &&
                this.$route.params.id
            ) {
                this.init();
            }
        }
    },
    created() {
        this.init();
    },
    components: {},
    methods: {
        init() {
            const tid = this.$route.params.id;
            this.$store.dispatch("RuleInfoGet", { tid }).then(() => {
                if (this.ruleInfo) {
                    const ruleEvent = this.ruleInfo.ruleEvent;
                    if (ruleEvent.length > 0) {
                        const curRule = ruleEvent[0];
                        if (!curRule.filterList.length === 0) {
                            this.form.filterList = curRule.filterList;
                        }
                        this.form.triggerList = curRule.triggerList;
                        this.form.actionList = curRule.actionList;
                        for (let key in this.form) {
                            this.form[key].forEach(data => {
                                this.getProduct(data);
                                this.getDevice(data);
                                this.getProperty(data);
                                this.getMetaData(data);
                            });
                        }
                    }
                }
            });

            for (let key in this.form) {
                const arr = this.form[key];
                arr.forEach(item => {
                    this.changeTriggerType(item);
                });
            }
        },
        addTrigger(condition) {
            this.form[condition].push({
                type: ""
            });
        },
        removeTrigger(item, condition) {
            let index = this.form[condition].indexOf(item);
            if (index !== -1) {
                this.form[condition].splice(index, 1);
            }
        },
        changeTriggerType(data) {
            if (data.type === "device") {
                data = Object.assign({}, data, {
                    pid: "",
                    did: "",
                    key: "",
                    op: "",
                    value: "",
                    only: Date.now()
                });
            }
        },
        submitRule() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.form.triggerList.length === 0) {
                        this.$message({
                            type: "warning",
                            message: "请输入触发条件"
                        });
                        return;
                    } else if (this.form.actionList.length === 0) {
                        this.$message({
                            type: "warning",
                            message: "请输入执行条件"
                        });
                        return;
                    }
                    let count = 1;
                    const event = {
                            rules: [],
                            logic: ""
                        },
                        actions = this.form.actionList,
                        ruleEvent = [];
                    ruleEvent.push(this.form);
                    const trigger = [],
                        filter = [];

                    for (let key in this.form) {
                        if (key !== "actionList") {
                            let arr = this.form[key];
                            if (key === "filterList") {
                                arr = this.form[key].map(item => {
                                    let index = 0;
                                    for (let key in item) {
                                        if (item[key] === "") {
                                            index++;
                                        }
                                    }
                                    if (index === 0) return item;
                                });
                            }

                            arr.forEach(item => {
                                key === "triggerList"
                                    ? trigger.push(count)
                                    : filter.push(count);
                                event.rules.push(
                                    Object.assign({}, item, { id: count++ })
                                );
                            });
                        }
                    }

                    const tempA =
                        trigger.length > 1
                            ? "(" + trigger.join(" or ") + ")"
                            : trigger.join(" or ");
                    const tempB =
                        filter.length > 1
                            ? "(" + filter.join(" or ") + ")"
                            : filter.join(" or ");
                    event.logic = tempA + " or " + tempB;

                    const data = Object.assign({}, this.ruleInfo, {
                        event,
                        actions,
                        ruleEvent
                    });
                    this.$store
                        .dispatch("RuleInfoSet", data)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "更新成功"
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "success",
                                message: "更新失败"
                            });
                        });
                }
            });
        },
        cancelEdit() {
            this.form = this.ruleInfo.ruleEvent[0];
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
        getProperty(data) {
            this.propertyList = [];

            if (data.did) {
                getDeviceProps({
                    isPage: false,
                    pid: data.pid,
                    did: data.did,
                    businessType: [1, 2, 3]
                })
                    .then(res => {
                        this.propertyList = res.payload;
                    })
                    .catch(error => {
                        return error;
                    });
            }
        },
        getMetaData(value) {
            this.metaData = [];
            const curProp = this.propertyList.find(item => item.id === value);
            if (curProp) {
                const dataType = curProp.dataType;
                if (dataType.type === "enum") {
                    this.metaData = dataType.specs;
                }
            }
        }
    }
};
</script>

<style lang='less' scoped>
.condition-box {
    .title {
        margin-bottom: 10px;
    }
    .condition-item {
        display: flex;
        padding: 15px 15px 0 15px;
        margin-bottom: 10px;
        background: rgba(245, 245, 245, 0.4);
        .sort {
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
        }
        .form-item {
            margin-left: 10px;
        }
        .content {
            display: flex;
            flex-wrap: wrap;
        }
    }
}
</style>
