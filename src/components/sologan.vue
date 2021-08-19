<template>
    <div>{{ text }}</div>
    <h1></h1>
</template>


<script lang="ts" setup>
import { onMounted, ref } from "@vue/runtime-core";

const props = defineProps({
    text: { type: String, default: "" },
})
let text = ref("");
onMounted(() => {
    const texts = props.text.split("")
    texts.forEach((elem: string, idx: number) => {
        setTimeout(() => {
            text.value += elem;
        }, 250 * idx);
    })

    setTimeout(() => {
        text.value += " ";
    }, 250 * (texts.length - 1));
})

</script>


<style lang="scss" scoped>
div {
    text-align: center;
    margin-top: 80px;
    font-weight: bold;
    font-size: 2em;
    color: white;
    &::after {
        content: "_";
        animation: fade 1s infinite;
    }
}
@keyframes fade {
    from {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
