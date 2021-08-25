<template>
    <div id="tag" class="mainpage">
        <sologan :text="tagName" />
        <panel :ps="posts" />
    </div>
</template>


<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRoute } from "vue-router"
import { getPostByTag } from "../api/tag"
import Sologan from "../components/sologan.vue"
import "ant-design-vue/lib/collapse/style/index.css"
import Panel from "../components/panel.vue"


interface Post {
    id: string
    title: string
    createTime: string
    public: boolean
}


let tagName = ref("");
let posts = reactive<Post[]>([]);


const route = useRoute()
getPostByTag(route.params.tid as string)
    .then(({ data }) => {
        tagName.value = data.name;
        for (const it of data.data) {
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
#tag {
    .ant-collapse-item {
        padding: 8px;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%),
            0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
}
</style>
