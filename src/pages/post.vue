<template>
    <div id="post" class="mainpage">
        <div class="header">
            <div class="title">{{ post.title }}</div>
            <div class="time">
                {{ post.createTime.getFullYear() }}年
                {{ post.createTime.getMonth() + 1 }}月
                {{ post.createTime.getDate() }}日
                {{ ["上午", "下午"][Math.round(post.createTime.getHours() / 12)] }}
            </div>
            <div class="tag">
                <template v-for="(i, j) in post.tags" :key="j">
                    <a-tag @click="toTags(i.id)" :color="colors[j % colors.length]">{{ i.name }}</a-tag>
                </template>
            </div>
        </div>
        <div class="content"></div>
    </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { getPost } from "../api/post";
import ATag from "ant-design-vue/lib/tag"
import "ant-design-vue/lib/tag/style/index.css"
import "ant-design-vue/lib/spin/style/index.css"
import { reactive, ref, watch } from "vue";
import Vditor from 'vditor'


interface Tag {
    id: string
    name: string
}

interface Post {
    id: string
    top: number
    tags: Tag[]
    title: string
    public: boolean
    content: string
    createTime: Date
}

const route = useRoute()
const colors = ["pink", "red",
    "orange", "green", "cyan",
    "blue", "purple"]
let post: Post = reactive({
    id: "",
    top: 0,
    tags: [],
    title: "",
    public: true,
    content: "",
    createTime: new Date()
})

let loaded = ref(false);
watch(loaded, (n, o) => {
    console.log(n, o);
})
getPost(route.params.pid as string)
    .then(({ data }) => {
        post.id = data.id
        post.top = data.top
        post.title = data.title
        post.public = data.public
        post.content = data.content;
        post.createTime = new Date(data.createTime)
        for (const ind in data.tags) {
            post.tags.push({
                id: data.tags[ind].id,
                name: data.tags[ind].name
            })
        }
        loaded.value = true;
        const div = document.createElement("div");
        Vditor.preview(div, post.content, {
            mode: "light",
            anchor: 1,
            markdown: {
                toc: true,
            }
        });
        document.getElementsByClassName("content")[0].appendChild(div);
    })

const router = useRouter();
const toTags = (id: string) => {
    router.push({ path: `/tag/${id}` });
}
</script>


<style lang="scss" scoped>
#post {
    width: 80%;
    margin: 8% auto 8% auto;
    color: white;
    .header {
        text-align: center;
        .title {
            font-size: 25px;
            font-weight: 700;
        }
    }
    .content {
        margin-top: 8%;
        padding: 2% 10% 2% 10%;
        box-shadow: 0 12px 15px 0 rgb(0 0 0 / 24%),
            0 17px 50px 0 rgb(0 0 0 / 19%);
        border-radius: 0.5rem;
        background-color: white;
    }
}
</style>

