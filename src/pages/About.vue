<template>
    <b-container fluid class="mb-4">
        <b-row>
            <b-col class="head ml-3 mr-2">
                <div class="title">
                    <h5>QUEM SOMOS</h5>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-4">
            <b-col>
                <b-tabs class="ml-4">
                    <b-tab title="Presidência">
                        <div class="about">
                            <AboutCard :board="item" v-for="(item, index) in about" :key="index" />
                        </div>
                    </b-tab>
                    <b-tab title="Diretoria">
                        <div class="about">
                            
                        </div>
                        
                    </b-tab>
                    <b-tab title="Conselho fiscal"></b-tab>
                    <b-tab title="Diretores regionais"></b-tab>
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
                        this.board.push(element)
                    } else if (element.fk_advice == 2) {
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
    h5 {
        margin-top: 10px;
    }

    .head {
        margin-top: 20px;
        border-bottom: 3px solid red;
    }

    .title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
        width: 180px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: -15px;
        margin-top: 10px;
    }

    .about {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

</style>