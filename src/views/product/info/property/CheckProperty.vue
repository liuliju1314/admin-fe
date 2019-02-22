<template>
    <el-main>
        <pre class="jsonData">{{data}}</pre>
    </el-main>
</template>

<script>
export default {
    data() {
        return {
            data: {
                properties: [
                    {
                        identifier: "PowerSwitch"
                    }
                ],
                events: [
                    {
                        outputData: [
                            {
                                identifier: "ErrorCode"
                            }
                        ],
                        identifier: "Error"
                    }
                ]
            }
        };
    },
    created() {},
    methods: {}
};
</script>
<style lang="less" scoped>
.jsonData {
    margin: 0 auto;
}
</style>