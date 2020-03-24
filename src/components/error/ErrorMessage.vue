<template>
    <div>
       <div v-if="errors.length <= 1"> 
           <b-alert variant="danger" :show="visibility" dismissible  >
               <span v-for="(error, index) in errors" :key="index">
                   {{error}}
               </span>
           </b-alert>
       </div>
       <div v-else>
           <b-alert variant="danger" :show="visibility" dismissible  >
                <div v-for="(error,index) in errors" :key="index">
                    <p v-for="(err,index) in error" :key="index">
                        {{err[0]}}
                    </p>
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