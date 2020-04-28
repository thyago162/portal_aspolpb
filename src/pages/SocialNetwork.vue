<template>
    <b-container fluid class="social-midia">
        <b-row class="social-midia-row">
            <b-col class="social-midia-head ml-4">
                <div class="social-midia-title ">
                    <h5>REDES SOCIAIS</h5>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <carousel :perPageCustom="customSlide" class="mt-2 mb-3" :autoplay="true" :autoplayTimeout="4000" 
                    paginationColor="#000fff" :autoplayHoverPause="true" >
                    <slide v-for="(item, index) in items" :key="index" :style="{marginRight: '10px'}">
                        <b-img fluid :src="item.nm_image_path.replace('public','storage')" 
                            :alt="item.nm_title" class="social-midia-image" />
                        <a @click="redirectTo(item.nm_link)" >
                            {{item.nm_title}}
                        </a>
                    </slide>
                </carousel>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {

        created() {
            this.$store.dispatch('socialNetwork');
        },

        data() {
            return {
                customSlide: [[1360,4], [1000, 3], [800,2], [500,1], [300,1]]
            }
        },

        computed: {
            items: function() {
                return this.$store.getters.getSocialNetwork
            }
        },

        methods: {
            redirectTo(link) {
                window.open(link)
            }
        } 
    }
</script>

<style scoped>
    .social-midia {
        background-color: lightgray;
    }

    .social-midia-row {
        width: 99%;
    }

    .social-midia-head {
        border-bottom: 3px solid rgb(189,22,34);
        margin-top: 20px;
    }

    .social-midia-title {
        background: rgb(189,22,34);
        width: 200px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: -15px;
        margin-top: 10px;

    }

    h5 {
        margin-top: 10px;
    }

    .social-midia-image {
        margin: 5px;
    }

    a {
        font-weight: bolder;
        font-size: 17px;
    }

    @media screen and (max-width: 1400px) {
        .social-midia-title {
            width: 150px;
            height: 35px;
        }

        h5 {
            font-size: 16px;
            font-weight: bold;
        }

        a {
            font-weight: bolder;
            font-size: 12px;
        }
    }

    @media screen  and (max-width: 999px){
        .social-midia-title {
            width: 120px;
            height: 30px;
        }

        h5 {
            font-size: 14px;
        }

        a {
            font-weight: bolder;
            font-size: 11px;
        }
        
    }

    @media screen and (max-width: 575px) {
        .social-midia-title {
            width: 100px;
            height: 20px;
        }

        h5 {
            font-size: 10px;
        }

        a {
            font-weight: bolder;
            font-size: 10px;
        }
        
    }



</style>