<template>
    <div class="panel">
        <template v-for="(i, j) in ps" :key="j">
            <hr />
            <p class="h5">{{ i.year }}</p>
            <a v-for="(k, l) in i.posts" :key="l" :href="`/post/${k.id}`">
                <span>{{ k.title }}</span>
                <time>{{ new Date(k.createTime).getUTCMonth() + 1 }}-{{ new Date(k.createTime).getDate() }}</time>
            </a>
        </template>
    </div>
</template>


<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import { watchEffect } from "vue";

interface Post {
    id: string
    title: string
    createTime: string
    public: boolean
}

type PostArr = Post[];

const props = defineProps({
    ps: {
        type: Object as () => PostArr,
        default: () => [] as PostArr
    }
});

interface Posts {
    year: number
    posts: PostArr
}

let ps = reactive<Posts[]>([]);

watchEffect(() => {
    let year = -1;
    for (const it of props.ps) {
        let y = new Date(it.createTime).getUTCFullYear();
        if (y !== year) {
            year = y;
            let arr: PostArr = [];
            ps.push({ year: y, posts: arr });
        }
        ps[ps.length - 1].posts.push({
            id: it.id,
            title: it.title,
            createTime: it.createTime,
            public: it.public
        })
    }
})
</script>


<style lang="scss" scoped>
.panel {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 12px 15px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%);
    hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    .h5 {
        font-size: 1.25rem;
        // margin-top: 48px;
        margin-bottom: 0.5rem;
        font-weight: 500;
        line-height: 1.2;
    }

    a {
        display: flex;
        justify-content: space-between;
        font-size: 1rem;
        font-weight: 400;
        &:hover {
            color: #30a9de;
            background-color: #f8f9fa;
            transition: color 0.2s ease-in-out,
                background-color 0.2s ease-in-out;
        }
        & > * {
            padding: 8px;
        }
    }
}
</style>
