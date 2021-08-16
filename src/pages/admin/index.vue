<template>
    <div id="admin">
        <div id="sys-info"></div>
        <a-table :dataSource="postListData" :columns="postListColumns" :pagination="pagination">
            <template #name="{ text }">
                <a :href="`/post/${1}`">{{ text }}</a>
            </template>
        </a-table>
        <a-button type="primary" :size="'large'" @click="toNewPost">新建博文</a-button>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import ATable from "ant-design-vue/lib/table"
import "ant-design-vue/lib/table/style/index.css";
import AButton from "ant-design-vue/lib/button"
import "ant-design-vue/lib/button/style/index.css";
import message from "ant-design-vue/lib/message"
import "ant-design-vue/lib/message/style/index.css"
import { adminGetPostList, getPostTot } from "../../api/post";
import { useRouter } from "vue-router";
import { DualAxes } from "@antv/g2plot";
import { getToken } from "../../store";

interface PostSimplicity {
    key: string
    id: string
    title: string
    createTime: Date
}

let postListData = reactive<PostSimplicity[]>([]);

let postListColumns = [
    { title: '标题', dataIndex: 'title', key: 'title', slots: { customRender: 'title' } },
    { title: '发表时间', dataIndex: 'createTime', key: 'createTime' }
];


let curPage = ref(1);
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
const getTotPost = () => {
    getPostTot().then(({ data }) => {
        pagination.total = data;
    })
}
getTotPost();

let pagination = reactive({
    total: 0,
    defaultPageSize: 10,
    change: (cur: number, size: number) => {
        message.info(`${cur}`);
        curPage.value = cur;
        getPostList(cur);
    },
})
getPostList(curPage.value);

const router = useRouter()
const toNewPost = () => {
    router.push("/newPost")
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

const ws = new WebSocket(import.meta.env.VITE_WS_URL+"/api/admin/sysinfo?token="+getToken());
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
        if (data2.length >= 1440) {
            data1.shift();
            data1.shift();
            data2.shift();
        }
        now = new Date();
        console.log(data1.length);
        const evtData = JSON.parse(evt.data);
        if (evtData instanceof Array) {
            evtData.forEach((elem) => {
                data1.push({ time: elem.time, percent: elem.cpu, name: 'CPU使用率' })
                data1.push({ time: elem.time, percent: elem.mem, name: '内存使用率' })
                data2.push({ time: elem.time, num: elem.num, type: 'Goroutine数量' })
            })
        } else {
            data1.push({ time: evtData.time, percent: evtData.cpu, name: 'CPU使用率' })
            data1.push({ time: evtData.time, percent: evtData.mem, name: '内存使用率' })
            data2.push({ time: evtData.time, num: evtData.num, type: 'Goroutine数量' })
        }
        dualAxes.render();
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
    .ant-table-wrapper {
        margin-top: 16px;
    }
}
</style>
