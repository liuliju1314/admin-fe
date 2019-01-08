<template>
    <div class="login-box">
        <div class="login-title">账号登录</div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on">
            <el-form-item prop="username" :error="errors.userLoginError">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input v-model="loginForm.username" placeholder="用户名" name="username" type="text" auto-complete="on" />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input type="password" v-model="loginForm.password" placeholder="密码" name="password" auto-complete="on" @keyup.native.enter="handleLogin" />
            </el-form-item>
            <div class="btn-container">
                <el-button class="btn" v-loading="loading" type="primary" @click.native.prevent="handleLogin"> 登 录</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "LogIn",
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            loginRules: {
                username: [
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
                    this.$store
                        .dispatch("UserLogin", this.loginForm)
                        .then(() => {  
                            // 验证用户是否绑定手机
                            this.loading = false;
                            this.$router.push("/home");                               
                        }).cacth( error => {
                            return error
                        })
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
    margin-top: 120px;
    .login-title {
        text-align: center;
        font-size: 20px;
        box-sizing: border-box;
    }
    .login-form {
        width: 420px;
        max-width: 100%;
        padding: 35px 35px 15px 35px;
        margin: 0 auto;
    }
    .btn {
        margin-top: 24px;
        width: 100%;
        font-size: 16px;
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
</style>
