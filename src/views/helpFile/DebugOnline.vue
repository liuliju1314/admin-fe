<template>
    <div class="create-pro-help-box">
        <h3 class="title">硬件调试</h3>
        <ul>
            <li>
                <h4 class="list-item">硬件调试的定义：设备端开发完成后，您可以使用平台的在线调试功能，从控制台下发指令给设备端进行功能测试。</h4>
                <p class="list-item">1. 选择要调试的产品和设备后出现下图</p>
                <div>
                    <img src="/images/debugOnline-1.png" alt>
                </div>
            </li>

            <li>
                <p class="list-item">2. 选择要调试的属性类型和设置或者获取操作，即可在右侧实时查看调试结果</p>
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
