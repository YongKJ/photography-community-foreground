<template>
  <div id="login">
    <div class="cc_item cc_btns">
        <a href="javascript:void(0)" class="gp_button gp_button_h40 register_btn gp_button_none" @click="register('form_wrap')">注册</a> 
        <a href="javascript:void(0)" class="gp_button gp_button_h40 gp_button_topic_main" @click="register('form_wraps')">登录</a> 
    </div>
        <div class="form-wrap" id="form_wrap">
            <div class="form">
                <div class="close-wrap">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    @click="close('form_wrap')"
                >
                    <path
                    fill="#FFF"
                    fill-rule="evenodd"
                    d="M9.664 8l5.116 5.116a1 1 0 0 1 0 1.415l-.25.25a1 1 0 0 1-1.414 0L8 9.663 2.884 14.78a1 1 0 0 1-1.415 0l-.25-.25a1 1 0 0 1 0-1.414L6.337 8 1.22 2.884a1 1 0 0 1 0-1.415l.25-.25a1 1 0 0 1 1.414 0L8 6.337l5.116-5.116a1 1 0 0 1 1.415 0l.25.25a1 1 0 0 1 0 1.414L9.663 8z"
                    ></path>
                </svg>
                </div>
                <div class="form_tittle">注册</div>
                <input
                class="normal-input norinput"
                type="text"
                placeholder="请输入邮箱地址"
                v-model="email"
                @click="reNew"
                ref="email_text"
                />
                <div class="ui-input captcha login__input">
                <input placeholder="邮箱验证码" type="text" v-model="code" ref="code_text">
                <a class="captcha__sms" v-show="show" @click="getCode">获取验证码</a>
                <a class="captcha__sms" v-show="!show">{{count}}s后重新发送</a>
                </div>
                <input
                class="normal-input"
                type="password"
                placeholder="请确认密码"
                v-model="password"
                ref="pwd_text"
                />
                <div class="error_div">
                <span class="error_text" ref="error"></span>
                </div>
                <div class="submit-button" @click="addRegister">注册</div>
                <div class="form_footer">
                <div class="change-type">
                    已有账号？<span @click="switchh('form_wraps', 'form_wrap')"
                    >立即登录</span
                    >
                </div>
                </div>
            </div>
        </div>
        <div class="form-wraps" id="form_wraps">
            <div class="form">
                <div class="close-wrap">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    @click="close('form_wraps')"
                >
                    <path
                    fill="#FFF"
                    fill-rule="evenodd"
                    d="M9.664 8l5.116 5.116a1 1 0 0 1 0 1.415l-.25.25a1 1 0 0 1-1.414 0L8 9.663 2.884 14.78a1 1 0 0 1-1.415 0l-.25-.25a1 1 0 0 1 0-1.414L6.337 8 1.22 2.884a1 1 0 0 1 0-1.415l.25-.25a1 1 0 0 1 1.414 0L8 6.337l5.116-5.116a1 1 0 0 1 1.415 0l.25.25a1 1 0 0 1 0 1.414L9.663 8z"
                    ></path>
                </svg>
                </div>
                <div class="form_tittle">登录</div>
                <input
                class="normal-input"
                type="text"
                placeholder="请输入邮箱"
                v-model="loginemail"
                ref="login_text"
                value=""
                style="padding: 0px 6px 8px 0;"
                />
                <input
                class="normal-input J_login-password"
                type="password"
                placeholder="请输入密码"
                v-model="loginpassword"
                value=""
                />
                <div class="error_div">
                <span class="error_text" ref="error1"></span>
                </div>
                <label
                class="ant-checkbox-wrapper"
                style="margin: 20px 0px 12px 42px; color: rgb(34, 34, 34)"
                >
                <span class="ant-checkbox">
                    <input type="checkbox" class="ant-checkbox-input" value="" style="cursor:pointer;" id="checkboxInput"/>
                    <span class="ant-checkbox-inner"></span>
                </span>
                <span
                    >已阅读并同意<a target="_blank" href="#/agr" style="color:#32b3bd;">《用户协议》</a>
                </span>
                </label>
                <div class="submit-button" style="margin-top: 0px" @click="loginUser">登录</div>
                <div class="form_footer">
                <div class="change-type">
                    没有账号？<span @click="switchh('form_wrap', 'form_wraps')"
                    >立即注册</span
                    >
                </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            show: true,
            count: '',
            timer: null,
            email: '',
            code: '',
            password: '',
            loginemail: '',
            loginpassword: '',
            registerEmail: false,
            loginEmail: false,
            registerPwd: false,
            loginPwd: false
        }
    },
    inject: ["reload"],
    methods: {
        register: (id) => {
            document.getElementById(id).style.display = "flex";
        },
        close: (id) => {
            document.getElementById(id).style.display = "none";
        },
        switchh: (register, login) => {
            document.getElementById(register).style.display = "flex";
            document.getElementById(login).style.display = "none";
        },

        addRegister() {
            if (this.email != '') {
                this.changeEmail(this.email,'register','email_text');
            }
            if(this.email && !this.registerPwd) {
                this.checkPassword(this.password,'register','error')
            }
            if(this.email == '' && this.password == '' && this.code == '') {
                this.$refs.error_div.innerHTML = '';
                setTimeout(() => {
                this.$refs.error_div.innerHTML = '缺少参数';
                },50)
            }else if(this.code == '' || this.password == ''){
                this.$refs.error_div.innerHTML = '';
                setTimeout(() => {
                this.$refs.error_div.innerHTML = '缺少参数';
                },50)
            }else{
                this.$refs.error_div.innerHTML = '';
            }
            if(this.registerEmail && this.registerPwd && this.code != '') {
                this.$axios({
                    method: 'post',
                    url: this.$store.state.localhostUrl+'/user/register',
                    data: {
                    email: this.email,
                    password: this.password,
                    code: this.code
                    }
                }).then(res=>{
                    switch (res.data["subject"]) {
                        case 0:
                            this.$message({
                                message: res.data["message"],
                                type: 'warning'
                            });
                            break;
                        case 1:
                            this.$message({
                                message: res.data["message"],
                                type: 'error'
                            });
                            break;
                        case true:
                            this.$message({
                                message: res.data["message"],
                                type: 'success'
                            });
                            this.email = '';
                            this.code = '';
                            this.password = '';
                            this.switchh('form_wraps', 'form_wrap')
                            break;
                        case false:
                            this.$message({
                                message: res.data["message"],
                                type: 'warning'
                            });
                            break;
                    }
                },err=>{
                    console.log(err);
                })
            }
        },
        loginUser() {
            var boolean = document.getElementById("checkboxInput").checked;
            if (this.loginemail != '') {
                this.changeEmail(this.loginemail,'login','login_text');
            }
            if(this.loginemail == '' && this.loginpassword == ''&& !boolean) {
                this.$refs.error1.innerHTML = '';
                setTimeout(() => {
                this.$refs.error1.innerHTML = '缺少参数';
                },50)
            }else if(!boolean || this.loginpassword == ''){
                this.$refs.error1.innerHTML = '';
                setTimeout(() => {
                this.$refs.error1.innerHTML = '缺少参数';
                },50)
            }else{
                this.loginPwd = true;
                this.$refs.error1.innerHTML = '';
            }
            if (this.loginPwd && this.loginEmail && boolean) {
                this.$axios({
                    method: 'post',
                    url: this.$store.state.localhostUrl+'/user/login',
                    data: {
                    email: this.loginemail,
                    password: this.loginpassword,
                    }
                }).then(res=>{
                    switch (res.data["head"]) {
                        case true:
                            this.$message({
                                message: res.data["message"],
                                type: 'success'
                            });
                            localStorage.setItem("Access-Token",res.data["token"]);
                            localStorage.setItem("userId",res.data["id"]);
                            this.loginemail = '';
                            this.loginpassword = '';
                            setTimeout(() => {
                                this.$emit('changediv');
                                this.$emit('changediv1');
                                this.$emit('changegallery');
                                setTimeout(() => {
                                    this.reload();
                                },500)
                            },1000);
                            break;
                        case false:
                            this.$message({
                                message: res.data["message"],
                                type: 'warning'
                            });
                            break;
                    }
                    },err=>{
                        console.log(err);
                    })
            }
        },
        reNew() {
            this.$refs.email_text.setAttribute("class","normal-input norinput");
        },
        changeEmail(email,registerEmail,name) {
            var boolean = false;
            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(!reg.test(email)) {
                this.$refs[name].setAttribute("class","normal-input norinput err change");
                this.$message.error("邮箱地址无效");
                boolean = false;
            }else {
                this.$refs[name].setAttribute("class","normal-input norinput");
                boolean = true;
            }
            switch (registerEmail) {
                case 'register':
                    this.registerEmail = boolean;
                    break;
                case 'login':
                    this.loginEmail = boolean;
                    break;
                default:
                    break;
            }
        },
        getCode() {
            const TIME_COUNT = 60;
            this.changeEmail(this.email,'register','email_text');
            if (!this.timer && this.registerEmail) {
                this.$axios({
                method: 'post',
                url: this.$store.state.localhostUrl+'/user/sendmail',
                data: {
                email: this.email,
                }
            }).then(res=>{
                if (res.data["head"]) {
                    this.$message({
                        message: res.data["message"],
                        type: 'success'
                    });
                }else {
                    this.$message.error(res.data["message"]);
                }
            },err=>{
                console.log(err);
            })
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                }
                }, 1000)
            }else {
                if(this.email == ''){
                this.$refs.email_text.setAttribute("class","normal-input norinput err change");
                }else{
                this.$message.error("邮箱地址无效");
                } 
            }
        },
        checkPassword(password,ispwd,name){
            var boolean = false;
            var reg1 = /[!@#$%^&*()_?<>{}]{1}/;
            var reg2 = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){8,18}/;
            var reg3 = /[a-zA-Z]+/;
            var reg4 = /[0-9]+/;
            if(reg1.test(password) && reg2.test(password) && reg3.test(password) && reg4.test(password)){
                boolean = true;
            }else if(!reg1.test(password)){
                this.$refs[name].innerHTML = '';
                setTimeout(() => {
                this.$refs[name].innerHTML = '密码需包含一个特殊字符';
                },50)
                boolean = false;
            }else if(!reg2.test(password)){
                this.$refs[name].innerHTML = '';
                setTimeout(() => {
                this.$refs[name].innerHTML = '密码长度在8-18位';
                },50)
                boolean = false;
            }else if(!reg3.test(password)){
                this.$refs[name].innerHTML = '';
                setTimeout(() => {
                this.$refs[name].innerHTML = '密码需含有字母';
                },50)
                boolean = false;
            }else if(!reg4.test(password)){
                this.$refs[name].innerHTML = '';
                setTimeout(() => {
                this.$refs[name].innerHTML = '密码需含有数字';
                },50)
                boolean = false;
            }
            switch (ispwd) {
                case 'register':
                    this.registerPwd = boolean;
                    break;
                case 'login':
                    this.loginPwd = boolean;
                    break;
                default:
                    break;
            }
        }
    },
}
</script>

<style scoped>
@import '../../assets/css/login.css';
</style>