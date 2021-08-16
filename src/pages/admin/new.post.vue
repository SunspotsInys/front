<template>
    <div id="newpost">
        <a-form>
            <form-item label="标题">
                <a-input v-model:value="post.title" />
            </form-item>
            <form-item label>
                <a-checkbox v-model:checked="post.public">公开</a-checkbox>
                <a-checkbox v-model:checked="post.top">置顶</a-checkbox>
            </form-item>
            <form-item label="标签">
                <div class="tags">
                    <template v-for="(i, j) in post.tags" :key="j">
                        <a-tag color="orange" :closable="true" @close="closeTag(j)">{{ i.name }}</a-tag>
                    </template>
                </div>
                <a-input v-model:value="tag.name" @keydown.enter="addTag" />
            </form-item>
            <form-item label="内容">
                <Textarea
                    v-model:value="post.content"
                    placeholder="输入博文内容"
                    :auto-size="{ minRows: 5, maxRows: 20 }"
                />
                <div class="postcontent"></div>
            </form-item>
            <form-item label>
                <a-button @click="submit">提交</a-button>
            </form-item>
        </a-form>
    </div>
</template>


<script lang="ts" setup>
import { onMounted, reactive, watch } from "vue";

import { FormItem, Textarea } from "ant-design-vue";
import "ant-design-vue/dist/antd.css"

import AInput from "ant-design-vue/lib/input"
import "ant-design-vue/lib/input/style/index.css"
import message from "ant-design-vue/lib/message"
import "ant-design-vue/lib/message/style/index.css"
import AForm from "ant-design-vue/lib/form"
import "ant-design-vue/lib/form/style/index.css"
import AButton from "ant-design-vue/lib/button"
import "ant-design-vue/lib/button/style/index.css"
import ACheckbox from "ant-design-vue/lib/checkbox"
import "ant-design-vue/lib/checkbox/style/index.css"
import ATag from "ant-design-vue/lib/tag"
import "ant-design-vue/lib/tag/style/index.css"
import Vditor from "vditor"
import { newPost } from "../../api/post";
import { useRouter } from "vue-router";

interface Tag {
    id: string
    name: string
}

interface FormState {
    title: string
    public: boolean
    top: boolean
    tags: Tag[]
    content: string
}


let post = reactive<FormState>({
    title: "",
    public: false,
    top: false,
    tags: [],
    content: ""
})

let tag = reactive<Tag>({
    id: "",
    name: ""
})

const div = document.createElement("div");
const preview = () => {
    const ps = document.getElementsByClassName("postcontent");
    if (ps.length > 0) {
        ps[0].appendChild(div);
    }
    Vditor.preview(div, post.content)
}

watch(() => post.content, (n, o) => {
    preview();
})

const addTag = () => {
    tag.id = "asdf"
    if (tag.id !== "" && tag.name !== "") {
        post.tags.push({
            id: tag.id,
            name: tag.name
        });
    }
}

const closeTag = (ind: number) => {
    console.log(post.tags.splice(ind, 1))
    console.log(post.tags)
}

onMounted(preview);

const router = useRouter();
const submit = () => {
    if (post.title === "" || post.content === "") {
        message.error("请输入博文内容！！！");
        return
    }
    newPost(post).then((res) => {
        router.push("/admin")
    });
}
</script>


<style lang="scss" scoped>
.ant-form {
    width: 80%;
    background-color: white;
    margin: 24px auto;
    padding: 16px;
    border-radius: 4px;
}
</style>
