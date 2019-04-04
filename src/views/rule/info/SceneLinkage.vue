<template>
    <div class="linkage-box">
        <el-form size="small" ref="form" :model="form">
            <div class="condition-box">
                <div class="title">触发条件：</div>
                <div
                    class="condition-item"
                    v-for="(item, index) in form.triggerList"
                    :key="item.key"
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
                                <el-select placeholder="请选择产品" v-model="item.pid"></el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.did'"
                                :rules="{
                                    required: true, message: '请选择设备', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择设备" v-model="item.did" filterable></el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.prop'"
                                :rules="{
                                    required: true, message: '请选择属性', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择属性" v-model="item.prop" filterable></el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'triggerList.' + index + '.mode'"
                                :rules="{
                                    required: true, message: '请选择比较方式', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择比较模式" v-model="item.mode">
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
                            required: true, message: '请选择过滤类型', trigger: 'blur'
                        }"
                        >
                            <el-select
                                placeholder="请选择过滤类型"
                                v-model="item.type"
                                @change="changeTriggerType(item)"
                            >
                                <el-option label="设备触发" value="device"></el-option>
                            </el-select>
                        </el-form-item>
                        <template v-if="item.type === 'device'">
                            <el-form-item
                                class="form-item"
                                :prop="'filterList.' + index + '.pid'"
                                :rules="{
                                    required: true, message: '请选择产品', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择产品" v-model="item.pid"></el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'filterList.' + index + '.did'"
                                :rules="{
                                    required: true, message: '请选择设备', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择设备" v-model="item.did" filterable></el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'filterList.' + index + '.prop'"
                                :rules="{
                                    required: true, message: '请选择属性', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择属性" v-model="item.prop" filterable></el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'filterList.' + index + '.mode'"
                                :rules="{
                                    required: true, message: '请选择比较方式', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择比较模式" v-model="item.mode">
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
                                :prop="'filterList.' + index + '.value'"
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
                        @click.prevent="removeTrigger(item, 'filterList')"
                    >删除</el-button>
                </div>
                <div>
                    <el-button type="text" @click="addTrigger('filterList')">+ 新增执行条件</el-button>
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
                                <el-select placeholder="请选择产品" v-model="item.pid"></el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'actionList.' + index + '.did'"
                                :rules="{
                                    required: true, message: '请选择设备', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择设备" v-model="item.did" filterable></el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'actionList.' + index + '.prop'"
                                :rules="{
                                    required: true, message: '请选择属性', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择属性" v-model="item.prop" filterable></el-select>
                            </el-form-item>
                            <el-form-item
                                class="form-item"
                                :prop="'actionList.' + index + '.mode'"
                                :rules="{
                                    required: true, message: '请选择比较方式', trigger: 'blur'
                                }"
                            >
                                <el-select placeholder="请选择比较模式" v-model="item.mode">
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
                                :prop="'actionList.' + index + '.value'"
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
                        @click.prevent="removeTrigger(item, 'actionList')"
                    >删除</el-button>
                </div>
                <div>
                    <el-button type="text" @click="addTrigger('actionList')">+ 新增过滤条件</el-button>
                </div>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitRule">确定并保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
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
                        type: "device"
                    }
                ]
            }
        };
    },
    created() {
        for (let key in this.form) {
            const arr = this.form[key];
            arr.forEach(item => {
                if (item.type === "device") {
                    Object.assign(item, {
                        pid: "",
                        did: "",
                        prop: "",
                        mode: "",
                        value: "",
                        key: Date.now()
                    });
                }
            });
        }
    },
    components: {},
    methods: {
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
            console.log(data);
            if (data.type === "device") {
                Object.assign(data, {
                    pid: "",
                    did: "",
                    prop: "",
                    mode: "",
                    value: "",
                    key: Date.now()
                });
            }
        },
        submitRule() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let count = 1;
                    const event = {
                            rules: [],
                            logic: ''
                        },
                        actions = this.form.actionList;
                    const trigger = [], filter = [];
                    for (let key in this.form) {
                        if (key !== "actionList") {
                            const arr = this.form[key];
                            arr.forEach(item => {
                                key === 'triggerList' ? trigger.push(count) : filter.push(count);
                                event.rules.push(Object.assign(
                                    {}, item, {id: count++}
                                ));
                            });
                        }
                    }
                    event.logic = '(' + trigger.join(' or ') + ') or (' + filter.join(' and ') + ')';
                }
            });
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
