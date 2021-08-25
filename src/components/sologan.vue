<template>
    <div>{{ text }}</div>
</template>


<script lang="ts" setup>
import { ref, watchEffect } from "@vue/runtime-core";

const props = defineProps({
    text: { type: String, default: "" },
})

let ptext = ref("");
let text = ref("");

watchEffect(() => {
    ptext.value = props.text;
    if (props.text != "") {
        const texts = ptext.value.split("")
        texts.forEach((elem: string, idx: number) => {
            setTimeout(() => {
                text.value += elem;
            }, 250 * idx);
        })
        setTimeout(() => {
            text.value += " ";
        }, 250 * (texts.length - 1));
    }
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
