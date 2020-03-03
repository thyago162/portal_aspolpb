<template>
    <carousel :perPage="3" class="ml-4">
        <slide v-for="(media, index) in medias" :key="index" >

            <div v-if="media.nu_type === 1">
                <b-img :src="media.nm_file_path.replace('public','storage')" width="420px" height="300px"></b-img>
                <h5 class="mt-1" >{{media.nm_title}}</h5>
            </div>
            <div v-if="media.nu_type === 2">
                <iframe :src="media.nm_link" frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    width="420px" height="300px" ></iframe>
                    <h5>{{media.nm_title}}</h5>
            </div>

            <div v-if="media.nu_type === 3">
                <h6>audio</h6>
            </div>
        </slide>
    </carousel>
</template>

<script>
    export default {

        props: ['medias']
        
    }
</script>