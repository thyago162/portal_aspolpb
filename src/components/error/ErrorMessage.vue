<template>
    <div>
       <b-alert variant="danger" :show="visibility" dismissible  >
           <div v-for="(error,index) in errors" :key="index">
               <p v-for="(err,index) in error" :key="index">
                   {{err[0]}}
               </p>
           </div>
       </b-alert>
    </div>
</template>

<script>
    export default {

        props: ['errors','visibility'], 
    }
</script>