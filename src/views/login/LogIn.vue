<template>
    <div>
        <div class="login-box">
            <div class="login-title">账号登录</div>
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

        <!-- <div class="container">
            <div class="form form--signup">
                <div class="form--heading">账号登录</div>
                <form autocomplete="off">
                    <div
                        style="border-bottom: 1px solid rgba(195, 195, 216, 0.5);margin-bottom:15px"
                    >
                        <svg-icon icon-class="user"/>
                        <input type="text" placeholder="请输入用户名" v-model="loginForm.phone">
                    </div>
                    <div style="border-bottom: 1px solid rgba(195, 195, 216, 0.5);">
                        <svg-icon icon-class="password"/>
                        <input type="text" placeholder="请输入密码" v-model="loginForm.password">
                    </div>
                    <el-button
                        class="button"
                        v-loading="loading"
                        type="primary"
                        @click.native.prevent="handleLogin"
                    >登 录</el-button>
                </form>
            </div>
            <div class="message signup">
                <div class="btn-wrapper"></div>
            </div>
        </div>-->
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
                            this.$router.push("/product");
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

.container {
    width: 700px;
    height: 400px;
    background: white;
    position: relative;
    display: grid;
    grid-template: 100% / 50% 50%;
    box-shadow: 2px 2px 10px 0 rgba(#333, 0.2);
    margin: 0 auto;
    form > * {
        margin: 10px;
    }
    .form {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        vertical-align: baseline;
        .form--heading {
            font-size: 20px;
            height: 50px;
            color: #809bce;
            font-family: "Playfair Display", serif;
        }
        form {
            width: 70%;
            .button {
                width: 100%;
                height: 30px;
                border: 0;
                outline: 0;
                color: white;
                font-size: 15px;
                font-weight: 300;
                position: relative;
                z-index: 3;
                letter-spacing: 2px;
                background: linear-gradient(45deg, #809bce, #9893da);
                font-family: "Playfair Display", serif;
                padding: 0px;
                border-radius: 0px;
            }
        }
        form input {
            width: 85%;
            border: 0;
            font-size: 13px;
            font-weight: 300;
            color: #797a9e;
            letter-spacing: 0.11em;
            padding-left: 10px;
        }
        form input::placeholder {
            padding-left: 5px;
            color: #c3c3d8;
            font-size: 10px;
        }

        form input:focus {
            outline: 0;
            // border-bottom: 1px solid rgba(195, 195, 216, 0.7);
            transition: 0.6s all ease;
        }
    }
    .message {
        position: absolute;
        background: white;
        width: 50%;
        height: 100%;
        transition: 0.5s all ease;
        transform: translateX(100%);
        z-index: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .button {
            margin: 5px 0;
        }

        .btn-wrapper {
            width: 60%;
            .button {
                width: 100%;
                height: 30px;
                border: 0;
                outline: 0;
                color: white;
                font-size: 15px;
                font-weight: 300;
                position: relative;
                z-index: 3;
                letter-spacing: 2px;
                background: linear-gradient(45deg, #809bce, #9893da);
                font-family: "Playfair Display", serif;
            }
        }
    }
    .message:before {
        position: absolute;
        content: "";
        width: 1px;
        height: 70%;
        background: #c3c3d8;
        opacity: 0;
        left: 0;
        top: 15%;
    }
    .signup:before {
        opacity: 0.3;
        left: 0;
    }
}
</style>
