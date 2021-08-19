<template>
    <div class="th-card">
        <div
            :class="dateClassName"
        >{{ props.createTime.getMonth() + 1 }}月{{ props.createTime.getDate() }}</div>
        <div class="block">
            <div class="header">
                <div class="title" @click="toDetail">{{ props.title }}</div>
                <template v-for="(i, j ) in props.tags">
                    <a-tag @click="toTags(i.id)" :color="colors[j % colors.length]">{{ i.name }}</a-tag>
                </template>
            </div>
            <div class="content">{{ props.content }}</div>
        </div>
        <div class="more" @click="toDetail">阅读全文</div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import ATag from "ant-design-vue/lib/tag"
import "ant-design-vue/lib/tag/style/index.css"
import { onMounted } from "@vue/runtime-core";

type Tags = Tag[];

interface Tag {
    id: string
    name: string
}

const props = defineProps({
    id: { type: String, default: "0" },
    top: { type: Number, default: 0 },
    tags: {
        type: Object as () => Tags,
        default: () => [] as Tags
    },
    title: { type: String, default: "" },
    public: { type: Boolean, default: false },
    content: { type: String, default: "" },
    createTime: { type: Date, default: new Date() }
})

let dateClassName = props.top > 0 ? "top" : "date";

const colors = ["pink", "red", "orange", "green", "cyan", "blue", "purple"]

let topColor = "";
if (props.top > 0) topColor = "#0080ff";

const router = useRouter();
const toDetail = () => {
    router.push({ path: `/post/${props.id}` });
}
const toTags = (id: string) => {
    router.push({ path: `/tag/${id}` });
}
onMounted(() => {
    if (props.top > 0) {
        document.getElementsByClassName("date")
    }
})
</script>


<style lang="scss">
.th-card {
    position: relative;
    padding: 40px;
    background: #fff;
    margin-bottom: 25px;
    border-radius: 5px;
    box-shadow: 0 12px 15px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%);
    .date,
    .top {
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%),
            0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
        position: absolute;
        border-start-end-radius: 16px;
        border-end-end-radius: 16px;
    }
    .date {
        top: 8px;
        left: 0px;
        color: #fff;
        padding: 0 16px 0 8px;
        background-color: #1ec0ff;
    }
    .top {
        top: 0px;
        left: 8px;
        padding: 8px 0 16px 0;
        writing-mode: vertical-lr;
        background-color: #0080ff;
    }
    .block {
        .header {
            margin-bottom: 8px;
            .title {
                color: #444;
                font-size: 25px;
                font-weight: 700;
            }
        }
    }
    .more {
        width: fit-content;
        background: #1ec0ff;
        color: #fff;
        font-size: 13px;
        padding: 1px 15px;
        border-radius: 5px;
        border: 0;
        &:hover::after {
            content: "»";
            transition: 10s;
        }
    }
}
</style>
