<template>
    <div id="about" class="mainpage">
        <sologan text="关于页面" />
        <div class="info">
            <img
                src="https://gitee.com/SunspotsInys/demo/raw/master/imGo/1685B4D357ACCF94.jpg"
                alt="img"
            />
            <span>一个Go语言新手程序员，对未知充满向往</span>
            <span>去年今日此门中</span>
            <span>人面桃花相映红</span>
            <span>人面不知何处去</span>
            <span>桃花依旧笑春风</span>
            <span>TheDoor 便是来自这首《题都城南庄》。</span>
            <span>曾至此门&nbsp;&nbsp;&nbsp;曾经而已</span>
            <a href="https://github.com/SunspotsInys">
                <i class="fa fa-github fa-4x" aria-hidden="true"></i>
            </a>
        </div>
    </div>
</template>


<script lang="ts" setup>
import Sologan from "../components/sologan.vue";
</script>


<style lang="scss" scoped>
#about {
    text-align: center;
    font-size: 1rem;
    .info {
        margin-top: 150px;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: white;
        padding: 24px;
        border-radius: 5px;
        box-shadow: 0 12px 15px 0 rgb(0 0 0 / 24%),
            0 17px 50px 0 rgb(0 0 0 / 19%);

        img {
            width: 200px;
            border-radius: 50%;
            margin-top: -124px;
            margin-bottom: 64px;
        }
    }
}
</style>
