<template>
    <div id="signin">
        <a-input v-model:value="username" placeholder="用户名..." />
        <a-input-password v-model:value="password" placeholder="密码..." />
        <a-button type="primary" :size="'large'" @click="toSignin">登录...</a-button>
    </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import AInput from "ant-design-vue/lib/input";
import "ant-design-vue/lib/input/style/index.css";
import AInputPassword from "ant-design-vue/lib/input";
import "ant-design-vue/lib/input/style/index.css";
import AButton from "ant-design-vue/lib/button";
import "ant-design-vue/lib/button/style/index.css";
import message from "ant-design-vue/lib/message";
import "ant-design-vue/lib/message/style/index.css";
import { signin } from "../api/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";


let username = ref("");
let password = ref("");
const router = useRouter();
const store = useStore();
const toSignin = () => {
    if (username.value === "" || password.value === "") {
        message.error("请输入用户名或密码");
        return;
    }
    signin(username.value, password.value).then((res: any) => {
        console.log(res);
        if (res.code === 2000) {
            message.success("成功登录，跳转去管理员界面!!!");
            router.push("/admin");
            let t = {
                uname: res.data.username,
                avatar: res.data.avatar,
                token: res.data.token,
            };
            console.log(t)
            store.commit("signin", t)
        }
    });
}
</script>


<style lang="scss" scoped>
#signin {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: absolute;
    left: 25%;
    top: 120px;
}
</style>
