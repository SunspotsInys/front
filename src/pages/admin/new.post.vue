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
                        <a-tool-tip :title="i.name">
                            <a-tag
                                color="orange"
                                :key="i.name"
                                :closable="true"
                                @close="delTag(j)"
                            >{{ i.id }} - {{ i.name }} - {{ j }}</a-tag>
                        </a-tool-tip>
                    </template>
                    <a-drop-down :trigger="['hover', 'click']">
                        <a-input
                            ref="inputRef"
                            type="text"
                            size="small"
                            :style="{ width: '78px' }"
                            v-model:value="tag.name"
                            @keyup.enter="addTag"
                        />
                        <template #overlay>
                            <a-menu>
                                <template v-for="(i, j) in existTags" :key="j">
                                    <menu-item v-if="reg(i.name)" @click="clickTag(j)">{{ i.name }}</menu-item>
                                </template>
                            </a-menu>
                        </template>
                    </a-drop-down>
                </div>
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
import AToolTip from "ant-design-vue/lib/tooltip"
import "ant-design-vue/lib/tooltip/style/index.css"
import ADropDown from "ant-design-vue/lib/dropdown";
import "ant-design-vue/lib/dropdown/style/index.css";
import AMenu, { MenuItem } from "ant-design-vue/lib/menu";
import "ant-design-vue/lib/dropdown/style/index.css";
import Vditor from "vditor"
import { newPost } from "../../api/post";
import { useRouter } from "vue-router";
import { getAdminTag } from "../../api/tag";

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

let existTags = reactive<Tag[]>([]);
getAdminTag().then(({ data }) => {
    data.forEach((elem: Tag) => {
        existTags.push({ id: elem.id, name: elem.name })
    })
})

const reg = (str: string) => {
    const reg = new RegExp(tag.name, "i")
    return reg.test(str)
}

const div = document.createElement("div");
const preview = () => {
    Vditor.preview(div, post.content)
}

watch(() => post.content, (n, o) => {
    preview();
})

const addTag = () => {
    if (tag.id === "") tag.id = "0";
    if (tag.name !== "") {
        post.tags.push({
            id: tag.id,
            name: tag.name
        });
        tag.name = "";
    }
}

const delTag = (i: number) => {
    console.log(post.tags.splice(i, 1));
    console.log(post.tags)
}

const clickTag = (i: number) => {
    post.tags.push({
        id: existTags[i].id,
        name: existTags[i].name
    })
    tag.name = "";
}

onMounted(() => {
    const ps = document.getElementsByClassName("postcontent")
    if (ps.length > 0) {
        ps[0].appendChild(div)
    }
    preview()
});

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
