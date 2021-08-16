<template>{{ msg }}</template>

<script lang="ts">
export default {
    props: {
        msg: {
            type: String,
            default: "警告！Message的错误使用",
        },
    },
};
</script>