<template>
    <b-modal id="play-sound" ref="playsound" hide-footer hide-header >
        <vue-audio :file="item" />
    </b-modal>
</template>

<script>
    import VueAudio from 'vue-audio';
    export default {
      
        components: {
            'vue-audio': VueAudio
        },      
        
        props: ['item']
    }
</script>