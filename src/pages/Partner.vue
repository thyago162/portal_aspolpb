<template>
    <b-container fluid >
        <b-row class="partner-title">
            <b-col class="ml-2">
                <div class="partner-title-block">
                    <h5>Parceiros</h5>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="12">
                <carousel-partner :partners="partners"  />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import CarouselPartner from '../components/partner/CarouselPartner';
    export default {

        components: {
            CarouselPartner
        },

        mounted() {
            this.$store.dispatch('partners')
        },

        computed: {
            partners() {
                return this.$store.getters.getPartners;
            }
        }
        
    }
</script>

<style  scoped>

    .partner-title {
        margin-top: 20px;
    }

    h5 {
        margin-bottom: 0%;
    }

    .partner-title-block {
        border-bottom: 2px solid black;
        width: 110px;
    }

     @media screen and (max-width: 1200px){
        h5 {
            font-size: 20px;
            font-weight: bold;
        }
        
    }

    @media screen and (max-width: 724px){
        h5 {
            font-size: 18px;
        }

    }

    @media screen and (max-width: 500px){
        h5 {
            font-size: 15px;
        }

        .partner-title-block {
            border-bottom: 2px solid black;
            width: 80px;
    }

    }
</style>