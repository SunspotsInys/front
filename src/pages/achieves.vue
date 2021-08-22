<template>
    <div id="achieves" class="mainpage">
        <sologan text="归档页" />
        <div>
            <h1 @click="click">add</h1>
            <h1 v-for="(i, j) in data" :key="j" @click="del(i[0])">{{ i[0] }} -- {{ i[1] }} -- {{ j }}</h1>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import Sologan from "../components/sologan.vue";

interface Tag {
    id: number
    name: string
}

let data = reactive<Map<string, string>>(new Map())

let cnt = 0;
const click = () => {
    data.set(`${cnt}`, "abc")
    if (!data.has(`${cnt}`)) {
        data.set(`${cnt}`, "abc")
    }
    cnt++
}
const del = (key: string) => {
    data.delete(key)
}

</script>


<style lang="scss" scoped>
#achieves {
    div {
        text-align: center;
        background-color: white;
    }
}
</style>
