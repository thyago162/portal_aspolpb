<template>
    <div>
        
       <div >
           <b-alert variant="danger" :show="visibility" dismissible  >
                <div v-for="(error,index) in errors" :key="index">
                    
                </div>
       </b-alert>

       </div>
       
    </div>
</template>

<script>
    export default {

        props: ['errors','visibility'], 
    }
</script>