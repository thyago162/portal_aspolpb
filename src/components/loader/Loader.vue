<template>
       <div>
        <div class="loader">
            <div >
                <b-spinner variant="primary" label="Spinning" class="spiner"></b-spinner>
                <h5>Carregando</h5>
            </div>
            
        </div>
    </div>

</template>

<script>
    export default {}
</script>
<style scoped>
    .loader {
        position: absolute;
        width: 100%;
        height: 700px;
        z-index: 100000000;
        margin-top: -750px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(19, 18, 18, 0.404);
    }

    .spiner {
        width: 5rem;
        height: 5rem;
    }

</style>