<template>
    <div id="edit">
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
                    <template v-for="(i, j) in tags" :key="j">
                        <span class="tag" @click="delTag(i[0])">{{ i[0] }}</span>
                    </template>
                    <a-drop-down :trigger="['hover', 'click']">
                        <a-input
                            type="text"
                            size="small"
                            :style="{ width: '78px' }"
                            v-model:value="tag.name"
                            @keyup.enter="addTag(tag)"
                        />
                        <template #overlay>
                            <a-menu>
                                <template v-for="(i, j) in existTags" :key="j">
                                    <menu-item v-show="reg(i.name)" @click="addTag(i)">{{ i.name }}</menu-item>
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
                <a-button @click="update">提交</a-button>
            </form-item>
        </a-form>
    </div>
</template>


<script lang="ts" setup>
import { onMounted, reactive, watch } from "vue";

import AInput, { Textarea } from "ant-design-vue/lib/input"
import "ant-design-vue/lib/input/style/index.css"
import message from "ant-design-vue/lib/message"
import "ant-design-vue/lib/message/style/index.css"
import AForm, { FormItem } from "ant-design-vue/lib/form"
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
import { getPost, updatePost } from "../../api/post";
import { useRoute, useRouter } from "vue-router";
import { getAdminTag } from "../../api/tag";

interface Tag {
    id: string
    name: string
}

let tags = reactive<Map<string, string>>(new Map<string, string>());

interface FormState {
    id: string
    title: string
    public: boolean
    top: boolean
    tags: Tag[]
    content: string
}

let post = reactive<FormState>({
    id: "",
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
watch(() => post.content, (n, o) => {
    Vditor.preview(div, post.content)
})

const addTag = (tag: Tag) => {
    if (tags.has(tag.name)) {
        message.warn(`已经存在 ${tag.name} 的标签`)
        return
    }
    if (tag.id === "") tag.id = "0";
    if (tag.name !== "") {
        tags.set(tag.name, tag.id)
        tag.name = "";
    }
}

const delTag = (key: string) => {
    console.log(tags);
    tags.delete(key)
    console.log(tags);
}

const route = useRoute()
const pid = route.params.pid as string;
getPost(pid).then(({ data }) => {
    post.id = data.id
    post.title = data.title
    post.public = data.public
    post.content = data.content
    post.top = false
    if (data.top !== 0) {
        post.top = true;
    }
    for (const it of data.tags) {
        tags.set(it.name, it.id)
    }
})

const router = useRouter();
const update = () => {
    if (post.title === "" || post.content === "") {
        message.error("请输入博文内容！！！");
        return
    }
    for (const [name, id] of tags)
        post.tags.push({ id: id, name: name })
    updatePost(post).then((_res) => {
        router.push("/admin")
    });
}

onMounted(() => {
    const ps = document.getElementsByClassName("postcontent")
    if (ps.length > 0) {
        ps[0].appendChild(div)
    }
    Vditor.preview(div, post.content)
});
</script>


<style lang="scss" scoped>
.ant-form {
    width: 80%;
    background-color: white;
    margin: 24px auto;
    padding: 16px;
    border-radius: 4px;

    .tag {
        color: #d46b08;
        background: #fff7e6;
        border-color: #ffd591;
        padding: 0 7px 0 7px;
        margin-right: 4px;
        border: 1px solid #ffd591;
        border-radius: 2px;
        &::after {
            content: " ✘";
        }
    }
}
</style>
