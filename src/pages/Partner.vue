<template>
    <b-container fluid class="partner">
        <b-row class="partner-title">
            <b-col>
                <h4>Parceiros</h4>
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

    .partner {
        height: 260px;
    }
    .partner-title {
        margin-top: 20px;
        text-decoration: underline;
        font-weight: bolder;
    }
</style>