<template>
    <div id="home" class="mainpage">
        <sologan text="去年今日此门中，人面桃花相映红" />
        <div class="articles" v-if="ok" v-for="(i, j) in posts" :key="j">
            <th-card
                :id="i.id"
                :top="i.top"
                :tags="i.tags"
                :title="i.title"
                :public="i.public"
                :content="i.content"
                :create-time="i.createTime"
            ></th-card>
        </div>
        <div class="spin" v-else>
            <a-spin />
        </div>
        <pagination v-model:current="cur" :defaultPageSize="20" :total="tot" />
    </div>
</template>

<script lang="ts" setup>
import ThCard from "../components/thCard.vue";
import { getPosts, getPostTot } from "../api/post";
import { ref, watch } from "vue";
import Pagination from "ant-design-vue/lib/pagination"
import "ant-design-vue/lib/pagination/style/index.css"
import ASpin from "ant-design-vue/lib/spin"
import "ant-design-vue/lib/spin/style/index.css"
import Sologan from "../components/sologan.vue";

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

let posts: Post[] = [];
let tot = ref(0);
let cur = ref(1);
let ok = ref(false);

const getHomeDate = () => {
    ok.value = false
    getPostTot().then(({ data }) => {
        tot.value = data;
    })
    getPosts(cur.value).then(({ data }) => {
        while (posts.length > 0) {
            posts.pop();
        }
        for (const ind in data) {
            let post: Post = {
                id: `${data[ind].id}`,
                top: data[ind].top,
                tags: [],
                title: data[ind].title,
                public: data[ind].public,
                content: data[ind].content,
                createTime: new Date(data[ind].createTime)
            }
            for (const i in data[ind].tags) {
                post.tags.push({ id: data[ind].tags[i].id, name: data[ind].tags[i].name })
            }
            posts.push(post)
        }
        ok.value = true;
    })

}
getHomeDate();

watch(cur, (n, o) => {
    getHomeDate();
})
</script>


<style lang="scss" scoped>
#home {
    margin-top: max(18%, 240px);
    .spin {
        text-align: center;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        margin-bottom: 20px;
        padding: 30px 50px;
        margin: 20px 0;
    }
    .ant-pagination {
        text-align: center;
    }
}
</style>
