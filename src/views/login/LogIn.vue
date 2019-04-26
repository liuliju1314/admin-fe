<template>
    <div>
        <div class="login-box">
            <div class="container">
                <div class="left-content">
                    <div style="margin-top: 20%;font-size: 20px;">物联网基础系统登录</div>
                    <el-form
                        ref="loginForm"
                        :model="loginForm"
                        :rules="loginRules"
                        class="login-form"
                        auto-complete="on"
                    >
                        <el-form-item prop="phone" :error="errors.userLoginError">
                            <span class="svg-container">
                                <svg-icon icon-class="user"/>
                            </span>
                            <el-input
                                v-model="loginForm.phone"
                                placeholder="用户名"
                                name="phone"
                                type="text"
                                auto-complete="on"
                            />
                        </el-form-item>

                        <el-form-item prop="password">
                            <span class="svg-container">
                                <svg-icon icon-class="password"/>
                            </span>
                            <el-input
                                type="password"
                                v-model="loginForm.password"
                                placeholder="密码"
                                name="password"
                                auto-complete="on"
                                @keyup.native.enter="handleLogin"
                            />
                        </el-form-item>
                        <div class="btn-container">
                            <el-button
                                class="btn"
                                v-loading="loading"
                                type="primary"
                                @click.native.prevent="handleLogin"
                            >登 录</el-button>
                        </div>
                    </el-form>
                </div>
                <div class="right-content">
                    <img src="/images/iot.png" style="width: 70%;margin-top:25%" alt>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LogIn",
    data() {
        return {
            loginForm: {
                phone: "",
                password: ""
            },
            loginRules: {
                phone: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ]
            },
            errors: {
                userLoginError: ""
            },
            loading: false
        };
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.loginForm.phone = this.loginForm.phone.trim();
                    this.$store
                        .dispatch("UserLogin", this.loginForm)
                        .then(() => {
                            this.loading = false;
                            this.$router.push("/home");
                        })
                        .catch(error => {
                            this.loading = false;
                            if (error.code === 10102 || error.code === 10103) {
                                this.errors.userLoginError = error.message;
                            }
                            if (error.code === 10105) {
                                this.errors.verifyCodeError = error.message;
                            }
                        });
                }
            });
        }
    }
};
</script>
<style>
.login-box .el-input input {
    padding: 0 36px;
}
</style>
<style lang="less" scoped>
.login-box {
    margin-top: 150px;
    .login-title {
        text-align: center;
        font-size: 20px;
    }
    .login-form {
        padding: 35px 0px 0px 35px;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        margin-top: -130px;
        width: 41%;
    }
    .btn {
        margin-top: 24px;
        width: 100%;
        width: 100%;
        border: 0;
        outline: 0;
        color: white;
        font-size: 15px;
        font-weight: 300;
        position: relative;
        z-index: 3;
        letter-spacing: 2px;
        background: linear-gradient(45deg, #27a4f2, #3d71d9);
    }
    .btn-container {
        position: relative;
    }
    .svg-container {
        position: absolute;
        padding: 0px 12px;
        vertical-align: middle;
        color: #dcdfe6;
        z-index: 20;
    }
    .error {
        position: absolute;
        color: #f56c6c;
        font-size: 12px;
    }
}

.container {
    width: 850px;
    height: 500px;
    background: white;
    position: relative;
    grid-template: 2% 50%;
    -webkit-box-shadow: 2px 2px 10px 0 rgba(51, 51, 51, 0.2);
    box-shadow: 2px 2px 10px 0 rgba(51, 51, 51, 0.2);
    margin: 0 auto;
    .left-content {
        float: left;
        width: 50%;
    }
    .right-content:before {
        position: absolute;
        content: "";
        width: 1px;
        height: 70%;
        background: #c3c3d8;
        opacity: 0.3;
        left: 50%;
        top: 15%;
    }
    .right-content {
        float: right;
        width: 50%;
    }
}
</style>
