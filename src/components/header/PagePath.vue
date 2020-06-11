<template>
    <b-container>
        <b-row>
           <b-col class="contact-head ml-5">
               <div class="contact-title">
                  <h5 class="mt-2">{{path}}</h5>
               </div>
           </b-col>
       </b-row>
    </b-container>
</template>

<script>
    export default {
        props: ['path']
        
    }
</script>