<template>
    <b-col class="ml-1 mr-1 image-highlights" 
        v-bind:style="{ backgroundImage: 'url('+ image +')'}" >
        
        <div class="highlights-title">
            <b-link :to="{name: 'visualizar-noticias', params: {title: title}}" class="personal-link">
                <h5 :style="{ color: '#ffffff'}">{{highlights.nm_title}}</h5>
            </b-link>
        </div>
        
    </b-col>
</template>

<script>
    export default {
        props: ['highlights'],

        computed: {
            image() {
                return this.highlights.nm_image_path;
            },
            title: function() {
                return this.highlights ? 
                this.highlights.nm_title :
                 ''
            },
            

        },
    }
</script>

<style  scoped>

    .highlights-title {
        background-color: rgba(24, 23, 23, 0.719);
        position: absolute;
        width: 100%;
        bottom: 0%;
    }

    .highlights-title h5, h6{
        color: #ffffff;
        text-align: center;
        margin-top: 10px;
    }

    .image-highlights {
        height: 412px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
        background-position: center;
        display: flex;
        flex-direction: row;
        justify-content:center;
        align-items: baseline;
        margin-top: 10px;
    }

    .personal-link {
        text-decoration: none;
    }

    h5:hover {
        font-weight: bolder;

    }
    @media screen and (max-width: 1024px) {
        h5 {
            font-size: 18px;
        }

        h6 {
            font-size: 16px;
        }
    }

    @media screen and (max-width: 768px) {
        .image-highlights {
            height: 300px;
        }
    }

    @media screen and (max-width: 416px) {
        .image-highlights {
            height: 200px;
        }

        h5 {
            font-size: 12px;
        }

        h6 {
            display: none;
        }
        
    }

    @media screen and (max-width: 375px) {
        .highlights {
            width: 95%;
            margin-top: 10px;
        }

        .image-highlights {
            height: 180px;
        }

        h5 {
            font-size: 11px;
        }

        h6 {
           display: none;
        }

        .image-highlights {
            margin-top: 0px;
        }
    }

</style>