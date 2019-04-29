<template>
    <div class="create-pro-help-box">
        <h3 class="title">添加属性</h3>
        <ul>
            <li>
                <h4 class="list-item">属性的定义：一般用于描述设备运行时的状态，如水利设备所读取的当前雨量水情等。应用系统可发起对属性的读取和设置请求。</h4>
                <p class="list-item">1. 进入产品管理，选择属性管理,点击添加属性</p>
                <div>
                    <img src="/images/createPer-1.png" alt>
                </div>
            </li>
            <li>
                <p class="list-item">添加属性参数含义如下：</p>
                <table class="table">
                    <thead>
                        <tr>
                            <td width="20%">参数名称</td>
                            <td>描述</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>属性名称</td>
                            <td>为属性命名，不具有全局唯一性，支持中文、英文字母、数字和下划线。</td>
                        </tr>
                        <tr>
                            <td>标识符</td>
                            <td>同产品下具有唯一性。支持字母、数字，首单词不支持数字，同产品下不可重复，多个单词请使用小驼峰命名</td>
                        </tr>
                        <tr>
                            <td>属性类型</td>
                            <td>属性的数据类型，有多种选择。</td>
                        </tr>
                        <tr>
                            <td>读写属性</td>
                            <td>设置属性的读写，应用系统可发起读取或设置请求。</td>
                        </tr>
                        <tr>
                            <td>属性类型</td>
                            <td>设置属性的存储位置。</td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {}
};
</script>

<style lang='less' scoped>
.table {
    width: 80%;
    font-size: 13px;
    min-height: 25px;
    line-height: 25px;
    border-collapse: collapse;
}
table,
table tr th,
table tr td {
    padding: 16px 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
.create-pro-help-box {
    margin-left: 30px;
}
</style>
