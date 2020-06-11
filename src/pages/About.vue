<template>
    <b-container fluid class="mb-3">
        <b-row class="header-title">
            <b-col lg="11" class="title">
                <h5>QUEM SOMOS</h5>
            </b-col>
        </b-row>
        <b-row class="mt-4 align-body" >
            <b-col lg="11" >
                <b-tabs class="ml-4" v-if="about">
                    <b-tab title="Presidência" @click="getAbout(office.presidency)">
                        <div class="about">
                            <AboutCard  :board="item" v-for="(item,index) in about" :key="index" />
                        </div>
                    </b-tab>
                    <b-tab title="Diretoria" @click="getAbout(office.board)">
                        <div class="about">
                            <AboutCard :board="item" v-for="(item,index) in about" :key="index" />
                        </div>
                    </b-tab>
                    <b-tab title="Conselho fiscal" @click="getAbout(office.taxCouncil)">
                        <AboutCard :board="item" v-for="(item,index) in about" :key="index" />
                    </b-tab>
                    <b-tab title="Diretores regionais" @click="getAbout(office.regionalBoard)">
                        <AboutCard :board="item" v-for="(item,index) in about" :key="index" />
                    </b-tab> 
                </b-tabs>
                <p v-else>Carregando...</p>
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

        created() {
            this.getAbout(1)
        },

        data() {
            return {
                about: [],
                office: {
                    presidency: 1,
                    board: 2,
                    taxCouncil: 3,
                    regionalBoard: 4
                }
            }
        },

        methods: {
            
            getAbout(id) {
                
                this.$http('about/advice/'+id)
                .then(res => {
                    if (res.status === 200) {
                       this.about = res.data.result
                    }
                })
                .catch(err => {
                    window.console.log(err)
                })

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