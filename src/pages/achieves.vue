<template>
    <div id="achieves" class="mainpage">
        <sologan text="归档页" />
        <panel :ps="posts" />
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import Sologan from "../components/sologan.vue";
import Panel from "../components/panel.vue";
import { getAchieve } from "../api/post";

interface Post {
    id: string
    title: string
    createTime: string
    public: boolean
}

let posts = reactive<Post[]>([]);

getAchieve().then(({ data }) => {
    for (const it of data) {
        posts.push({
            id: it.id,
            title: it.title,
            createTime: it.createTime,
            public: it.public
        })
    }
})

</script>


<style lang="scss" scoped>
// #achieves {
// }
</style>
