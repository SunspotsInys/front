<template>
    <div class="thcomment">
        <div id="to-comment">
            <div id="comment-info">
                <a-input
                    v-model:value="comment.name"
                    id="comment-name"
                    size="large"
                    placeholder="昵称"
                />
                <a-input
                    v-model:value="comment.email"
                    id="comment-email"
                    size="large"
                    placeholder="邮箱"
                />
                <a-input
                    v-model:value="comment.site"
                    id="comment-site"
                    size="large"
                    placeholder="网址"
                />
            </div>
            <div id="comment-main">
                <a-textarea
                    v-model:value="comment.content"
                    placeholder="留下你的观点来..."
                    :auto-size="{ minRows: 5 }"
                    id="comment-content"
                    allow-clear
                />
                <div id="comment-command">
                    <i class="fa fa-smile-o fa-2x" aria-hidden="true"></i>
                    <i class="fa fa-simplybuilt fa-2x" aria-hidden="true"></i>
                    <i class="fa fa-paper-plane fa-2x" aria-hidden="true" @click="createComment"></i>
                </div>
            </div>
        </div>
        <a-comment v-for="(i, j) in cs" :key="j">
            <template #actions>
                <span key="comment-nested-reply-to" @click="reply(i.id, i.name)">
                    <i class="fa fa-reply" aria-hidden="true"></i> 回复
                </span>
            </template>
            <template #author>
                <a :href="i.site">{{ i.name }}</a>
            </template>
            <template #avatar>
                <a-avatar
                    :src="`https://gravatar.inwao.com/avatar/${Md5.hashStr(i.email)}`"
                    :alt="i.name"
                />
            </template>
            <template #content>
                <div v-html="i.content"></div>
            </template>
            <a-comment v-for="(k, l) in cs[j].children" :key="l">
                <template #actions>
                    <span @click="reply(i.id, k.name)">
                        <i class="fa fa-reply" aria-hidden="true"></i> 回复
                    </span>
                </template>
                <template #avatar>
                    <a-avatar
                        :src="`https://gravatar.inwao.com/avatar/${Md5.hashStr(k.email)}`"
                        :alt="k.name"
                    />
                </template>
                <template #author>
                    <a>{{ k.name }}</a>
                </template>
                <template #content>
                    <div v-html="k.content"></div>
                </template>
            </a-comment>
        </a-comment>
    </div>
</template>

<script lang="ts" setup>
import message from "ant-design-vue/lib/message"
import "ant-design-vue/lib/message/style/index.css"
import AComment from "ant-design-vue/lib/comment"
import "ant-design-vue/lib/comment/style/index.css"
import "ant-design-vue/lib/tooltip/style/index.css"
import AAvatar from "ant-design-vue/lib/avatar"
import "ant-design-vue/lib/avatar/style/index.css"
import AInput, { Textarea as ATextarea } from "ant-design-vue/lib/input"
import "ant-design-vue/lib/input/style/index.css"
import { reactive } from "@vue/reactivity"
import { getComment, newComment } from "../api/comment"
import Vditor from "vditor"
import { Md5 } from 'ts-md5/dist/md5'

const props = defineProps({
    pid: {
        type: String,
        default: ""
    }
})

interface CComment {
    id: string
    fid: string
    content: string
    createTime: Date
    name: string
    email: string
    site: string
}

interface CommentInfos {
    id: string
    content: string
    createTime: Date
    name: string
    email: string
    site: string
    children: CComment[]
}

interface Comment {
    pid: string
    fid: string
    content: string
    name: string
    email: string
    site: string
}

let cs = reactive<CommentInfos[]>([])
let comment = reactive<Comment>({
    pid: props.pid,
    fid: "",
    content: "",
    name: "",
    email: "",
    site: ""
})
if (localStorage.getItem("comment-name")) {
    comment.name = localStorage.getItem("comment-name") as string;
}
if (localStorage.getItem("comment-email")) {
    comment.email = localStorage.getItem("comment-email") as string;
}
if (localStorage.getItem("comment-site")) {
    comment.site = localStorage.getItem("comment-site") as string;
}

const getHTML = async (md: string) => {
    const value = await Vditor.md2html(md)
    console.log(value)
    return value
}

getComment(props.pid).then(async ({ data }) => {
    if (data instanceof Array) {
        for (const it of data) {
            let c = reactive<CommentInfos>({
                id: it.id,
                content: await Vditor.md2html(it.content),
                createTime: new Date(),
                name: it.name,
                email: it.email,
                site: it.site,
                children: []
            })
            if (it.children instanceof Array) {
                for (const itc of it.children) {
                    c.children.push({
                        id: itc.id,
                        fid: itc.fid,
                        content: await Vditor.md2html(itc.content),
                        createTime: new Date(),
                        name: itc.name,
                        email: itc.email,
                        site: itc.site
                    })
                }
            }
            cs.push(c)
        }
    }
})

const reply = (fid: string, fname: string = "") => {
    comment.fid = fid;
    if (fname !== "")
        comment.content = `@${fname} ` + comment.content
    if (comment.name === "") {
        let nameDiv = document.getElementById("comment-name")
        if (nameDiv) {
            nameDiv.focus()
            return
        }
    }
    if (comment.email === "") {
        let emailDiv = document.getElementById("comment-email")
        if (emailDiv) {
            emailDiv.focus()
            return
        }
    }
    if (comment.site === "") {
        let siteDiv = document.getElementById("comment-site")
        if (siteDiv) {
            siteDiv.focus()
            return
        }
    }
    let contentDiv = document.getElementById("comment-content")
    if (contentDiv) {
        contentDiv.focus()
    }
}

const createComment = () => {
    if (comment.name === "") {
        message.error("少侠，敢问如何称呼？")
        return
    }
    if (comment.content === "") {
        message.error("好歹写点儿？")
        return
    }
    localStorage.setItem("comment-name", comment.name)
    localStorage.setItem("comment-email", comment.email)
    localStorage.setItem("comment-site", comment.site)
    if (comment.fid === "") comment.fid = "0"
    newComment(comment).then(async ({ data }) => {
        console.log(data);
        if (comment.fid === "0") {
            cs.unshift({
                id: data,
                content: await Vditor.md2html(comment.content),
                createTime: new Date(),
                name: comment.name,
                email: comment.email,
                site: comment.site,
                children: []
            })
        } else {
            for (const it of cs) {
                if (comment.fid === it.id) {
                    it.children.unshift({
                        id: data,
                        fid: it.id,
                        content: await Vditor.md2html(comment.content),
                        createTime: new Date(),
                        name: comment.name,
                        email: comment.email,
                        site: comment.site
                    })
                    break
                }
            }
        }
        comment.content = ""
        comment.fid = "0"
    })
}
</script>

<style lang="scss">
.thcomment {
    color: black;
    background-color: white;
    border-radius: 0.5rem;
    padding: 8px;
    box-shadow: 0 12px 15px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%);
    margin-top: 80px;

    .ant-comment-actions {
        margin-top: 0;
    }

    #to-comment {
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        padding: 8px;
        #comment-info {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
        }

        input {
            border: none;
        }

        span {
            border: none;
        }
        #comment-command {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
        }
        &::after {
            content: "";
        }
    }
}
</style>
