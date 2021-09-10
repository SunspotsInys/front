<template>
    <div id="admin" class="mainpage">
        <div id="sys-info"></div>

        <div class="posts">
            <table>
                <tr>
                    <th>标题</th>
                    <th>发表时间</th>
                </tr>
                <tr v-for="(i, j) in postListData" :key="j">
                    <td>
                        <a :href="`/post/${i.id}`">{{ i.title }}</a>
                        <span>
                            <i
                                class="fa fa-pencil-square-o"
                                aria-hidden="true"
                                @click="toEdit(i.id)"
                            ></i>
                            <i class="fa fa-times" aria-hidden="true" @click="deletePost(i.id, i.title)"></i>
                        </span>
                    </td>
                    <td>{{ i.createTime }}</td>
                </tr>
            </table>
            <a-pagination size="small" :total="tot" v-model:current="cur" />
            <a-button type="primary" :size="'large'" @click="toNewPost">新建博文</a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import AButton from "ant-design-vue/lib/button"
import "ant-design-vue/lib/button/style/index.css";
import APagination from "ant-design-vue/lib/pagination"
import "ant-design-vue/lib/pagination/style/index.css";
import { adminGetPostList, getPostTot, delPost } from "../../api/post";
import { useRouter } from "vue-router";
import { DualAxes } from "@antv/g2plot";
import { getToken } from "../../store";
import message from "ant-design-vue/lib/message"
import "ant-design-vue/lib/message/style/index.css"


interface PostSimplicity {
    key: string
    id: string
    title: string
    createTime: Date
}

let postListData = reactive<PostSimplicity[]>([]);

let cur = ref(1);
const getPostList = (page: number) => {
    adminGetPostList(page).then(({ data }) => {
        while (postListData.length > 0)
            postListData.pop();
        data.forEach((elem: PostSimplicity) => {
            postListData.push({
                key: elem.id,
                id: elem.id,
                title: elem.title,
                createTime: elem.createTime,
            })
        });
    })
}
let tot = ref(0);
const getTotPost = () => {
    getPostTot().then(({ data }) => {
        tot.value = data;
    })
}
getTotPost();

getPostList(cur.value);
watch(() => cur.value, (n, o) => {
    getPostList(n)
})

const router = useRouter()
const toNewPost = () => {
    router.push("/newPost")
}
const toEdit = (pid: string) => {
    router.push(`/edit/${pid}`)
}

const deletePost = (id: string, title: string) => {
    delPost(id).then(() => {
        message.success("成功删除博文`" + title + "`")
        getPostList(cur.value);
    })
}

interface Percent {
    time: string
    percent: number
    name: string
}

interface Num {
    time: string
    num: number
    type: string
}

let dualAxes: DualAxes;
let now = new Date();
let data1: Percent[] = [
    { time: `${now.getMinutes()}:${now.getSeconds()}`, percent: 0, name: "CPU使用率" },
    { time: `${now.getMinutes()}:${now.getSeconds()}`, percent: 0, name: "内存使用率" },
];
let data2: Num[] = [
    { time: `${now.getMinutes()}:${now.getSeconds()}`, num: 0, type: 'Goroutine数量' }
];

const ws = new WebSocket(import.meta.env.VITE_WS_URL + "/api/admin/sysinfo?token=" + getToken());
{
    ws.onopen = (evt) => {
        ws.send("1");
        setInterval(() => {
            ws.send("2")
        }, 6000)
    }
    ws.onclose = (evt) => {
        console.log("ws close...")
    }
    ws.onmessage = (evt) => {
        if (data2.length >= 100) {
            data1.shift();
            data1.shift();
            data2.shift();
        }
        now = new Date();
        const evtData = JSON.parse(evt.data);
        if (evtData instanceof Array) {
            evtData.forEach((elem) => {
                data1.push({ time: elem.time, percent: elem.cpu, name: 'CPU使用率' })
                data1.push({ time: elem.time, percent: elem.mem, name: '内存使用率' })
                data2.push({ time: elem.time, num: elem.num, type: 'Goroutine数量' })
            })
            dualAxes.render();
        } else if (data2[data2.length - 1].time !== evtData.time) {
            data1.push({ time: evtData.time, percent: evtData.cpu, name: 'CPU使用率' })
            data1.push({ time: evtData.time, percent: evtData.mem, name: '内存使用率' })
            data2.push({ time: evtData.time, num: evtData.num, type: 'Goroutine数量' })
            console.log(data1)
            dualAxes.render()
        }
    }
}

onMounted(() => {
    dualAxes = new DualAxes('sys-info', {
        data: [data1, data2],
        xField: 'time',
        yField: ['percent', 'num'],
        geometryOptions: [
            { geometry: 'line', seriesField: "name", color: '#5B8FF9', },
            { geometry: 'line', seriesField: "type", color: '#5AD8A6', }
        ],
    });
    dualAxes.render();
})
</script>


<style lang="scss" scoped>
#admin {
    width: 80%;
    padding: 8px;
    margin: auto;
    margin-top: 60px;
    #sys-info {
        background-color: white;
        padding: 8px;
    }
    .posts {
        background-color: white;
        table {
            width: 100%;
            tr {
                th,
                td {
                    padding: 16px;
                }
                td {
                    &:nth-child(1) {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        span {
                            display: flex;
                            gap: 8px;
                        }
                    }
                }
                &:nth-child(odd) {
                    background-color: rgba(0, 0, 0, 0.02);
                }
            }
        }
    }
}
</style>
