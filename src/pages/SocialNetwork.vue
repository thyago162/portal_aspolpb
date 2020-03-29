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
                customSlide: [[1360,4], [1000, 3], [800,2], [500,1]]
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
        border-bottom: 3px solid red;
        margin-top: 20px;
    }

    .social-midia-title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
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