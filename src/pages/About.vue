<template>
    <b-container fluid class="mb-3">
        <b-row class="header-title">
            <b-col lg="11" class="title">
                <h5>QUEM SOMOS</h5>
            </b-col>
        </b-row>
        <b-row class="mt-4 align-body" >
            <b-col lg="11" >
                <b-tabs class="ml-4">
                    <b-tab title="Presidência">
                        <div class="about">
                            <AboutCard :board="item" v-for="(item, index) in presidency" :key="index" />
                        </div>
                    </b-tab>
                    <b-tab title="Diretoria">
                        <div class="about">
                            <AboutCard :board="item" v-for="(item, index) in board" :key="index"/>
                        </div>
                    </b-tab>
                    <b-tab title="Conselho fiscal">
                        <AboutCard :board="item" v-for="(item, index) in taxCouncil" :key="index"/>
                    </b-tab>
                    <b-tab title="Diretores regionais">
                        <AboutCard :board="item" v-for="(item, index) in regionalBoard" :key="index"/>
                    </b-tab> 
                </b-tabs>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import AboutCard from '../components/institucional/about/AboutCard'
    export default {

        components: {
            AboutCard
        },

        mounted(){
            this.$store.dispatch('about');
            this.splitAbout();
        },

        data() {
            return {
                presidency: [],
                board: [],
                taxCouncil: [],
                regionalBoard: []
            }
        },

       computed: {
           about: function() {
               return this.$store.getters.getAbout;
            },
       },

        methods: {
            splitAbout() {

                this.about.forEach(element => {

                    if (element.fk_advice == 1) {
                        this.presidency.push(element)
                    } else if (element.fk_advice == 2) {
                        this.board.push(element)
                    }else if (element.fk_advice === 3) {
                        this.taxCouncil.push(element)
                    }else {
                        this.regionalBoard.push(element)
                    }
                });

            }
          
        }
        
    }
</script>

<style scoped>

    .about {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    h5 {
        margin-top: 10px;
    }

</style>