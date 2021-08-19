<template>
    <nav id="th-nav" class="site-nav">
        <div @click="toPage(0)">TheDoor</div>
        <ul id="menu">
            <li v-for="(i, j) in pages" :key="j" @click="toPage(j)">{{ i.name }}</li>
        </ul>
    </nav>
</template>


<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { isSignin } from "../store";

interface Page {
    path: string
    name: string
}

let pages: Page[] = reactive([]);

pages.push({ path: "/", name: "首页" });
pages.push({ path: "/tag", name: "标签" });
pages.push({ path: "/achieves", name: "归档" });
// pages.push({ path: "/categories", name: "分类" });
pages.push({ path: "/about", name: "关于" });

if (isSignin()) {
    pages.push({ path: "/admin", name: "管理面板" })
}
const router = useRouter();
const toPage = (ind: number) => {
    router.push({ path: pages[ind].path });
}
</script>


<style lang="scss" scoped>
#th-nav {
    width: 100%;
    display: flex;
    position: sticky;
    z-index: 101;
    top: 0;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    & > * {
        cursor: pointer;
    }
    div {
        padding: 8px 8px 8px 32px;
    }
    #menu {
        display: flex;
        justify-content: space-between;
        top: 0;
        li {
            list-style: none;
            padding: 16px;
        }
    }
}
</style>