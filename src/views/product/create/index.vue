<template>
    <el-main>
        <el-card class="box-card create-product-wrapper" shadow="never">
            <div slot="header" class="clearfix">
                <span class="card-title">创建产品</span>
            </div>
            <div class="product-form-box">
                <el-steps :active="active" >
                    <el-step title="产品基本信息"></el-step>
                    <el-step title="添加属性"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
                <div class="form-box">
                    <keep-alive>
                        <component :is="component" @listenNext="handleNext"></component>
                    </keep-alive>
                </div>
            </div>
        </el-card>
    </el-main>
</template>

<script>
import AddPropert from "./AddProperty";
import BaseInfo from "./BaseInfo";

  export default {
    name:'',
    props:[''],
    data () {
      return {
            active: 0,
            components: [
                BaseInfo,
                AddPropert,
            ],
            component: BaseInfo
        };
    },

     methods: {
        handleNext(value) {
            this.active = value ? this.active + 1 : this.active - 1;
            if (this.active === 1) {
                this.component = AddPropert;
            } else {
                this.component = this.components[this.active];
            }
        }
    }

  }

</script>
<style lang="less">
.create-product-wrapper {
    .el-step__title.is-process {
        color: #1890ff;
    }
    .el-step {
        width: auto;
        flex-basis: 25%!important;
    }
    .el-step__title,
    .el-form-item__label {
        font-size: #1890ff;
        font-size: 13px;
    }

    .el-step__head.is-process {
        color: #1890ff;
        border-color: #1890ff;
    }
    .el-step.is-horizontal .el-step__line {
        height: 1px;
        left: 35px;
        right: 8px;
    }
    .el-step__icon {
        width: 28px;
        height: 28px;
    }
    .el-step__icon.is-text {
        border: 1px solid !important;
    }
    .el-step__line-inner {
        border-style: none;
    }
    .title {
        font-size: 15px;
        padding: 6px 0;
        margin-bottom: 24px;
        border-bottom: 1px solid #ddd;
    }
    .el-row {
        margin-bottom: 20px;
    }
}
</style>
<style lang='less' scoped>
.create-product-wrapper {
    background-color: #fff;
    .product-form-box {
        margin: 0 auto;
        width: 80%;
        .form-box {
            padding: 24px 30px;
        }
    }
}
.box-card {
    text-align: left;
}
</style>