<template>
  <div class="resume" :style="{backgroundColor: `${color}`}">
    <h5>{{text}}</h5>
    <h6>{{data}}</h6>
  </div>
</template>

<script>
export default {
    props: ['data','text', 'color']
};
</script>

<style scoped>
    .resume {
        width: 200px;
        height: 60px;
        color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-radius: 5px;
        box-shadow: 0px 1px 1px 1px #000;
    }

    .resume h5 {
        border-radius: 1px solid #fff;
    }

    .resume h6 {
        text-decoration: underline;
    }
</style>