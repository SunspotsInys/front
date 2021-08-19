<template>
    <div id="tag" class="mainpage">
        <sologan text="标签页" />
        <div id="wordcloud"></div>
    </div>
</template>



<script lang="ts" setup>
import { WordCloud } from "@antv/g2plot";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { getTag } from "../api/tag";
import Sologan from "../components/sologan.vue";

interface Tag {
    id: string,
    name: string
    num: number
}
const router = useRouter();
const div = document.createElement("div")

getTag().then(({ data }) => {
    const wc = new WordCloud(div, {
        data: data,
        wordField: 'name',
        weightField: 'num',
        color: '#122c6a',
        wordStyle: {
            fontFamily: 'Verdana',
            fontSize: [24, 80],
        },
        interactions: [{ type: 'element-active' }],
        state: {
            active: {
                style: {
                    lineWidth: 3,
                },
            },
        },
    })
    wc.render()
    wc.on("element:click", (...args: any) => {
        console.log();
        console.log(`${args[0]}`);

        router.push({ path: `/tag/${args[0].data.data.datum.num}` })
    })
})


onMounted(() => {
    const tag = document.getElementById("wordcloud")
    if (tag) {
        tag.appendChild(div);
    }
})
</script>


<style lang="scss" scoped>
#tag {
    margin-top: max(20%, 240px);
    #wordcloud {
        background-color: white;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%),
            0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
        border-radius: 8px;
    }
}
</style>
