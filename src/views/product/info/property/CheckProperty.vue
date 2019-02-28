<template>
    <el-main>
        <pre class="jsonData">{{data}}</pre>
    </el-main>
</template>

<script>
export default {
    props: ["propertyJson"],
    data() {
        return {
            data: {}
        };
    },
    watch: {
        propertyJson(newValue) {
            this.data = newValue;
        }
    },
    created() {
        this.data = this.propertyJson;
    },
    methods: {}
};
</script>
<style lang="less" scoped>
.jsonData {
    margin: 0 auto;
}
</style>