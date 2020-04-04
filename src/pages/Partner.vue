<template>
    <b-container fluid >
        <b-row class="partner-title">
            <b-col class="ml-5">
                <h5>PARCEIROS</h5>
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
        text-decoration: underline;
        font-weight: bolder;
    }

     @media screen and (max-width: 1200px){
        h4 {
            font-size: 20px;
            font-weight: bold;
        }
        
    }


    @media screen and (max-width: 724px){
        h4 {
            font-size: 18px;
        }

    }
</style>