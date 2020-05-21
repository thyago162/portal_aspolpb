<template>
    <div class="abstract">
        <h6>Notícias: {{countNews}}</h6>
        <h6>Convênios: {{totalAgreement}}</h6>
        <h6>Associados: {{totalAssociated}}</h6>
    </div>
</template>

<script>
    export default {
        created() {
            this.totalNews();
            this.$store.dispatch('agreement');
            this.$store.dispatch('associated')
        },

        data() {
            return {
                countNews: 0
            }
        },

        computed: {

            totalAgreement: function() {
                return this.$store.getters.getAgreement.length;
            },

            totalAssociated: function() {
                return this.$store.getters.getAssociated.length;
            }
        },

        methods: {
            totalNews() {
                this.$http('news/count')
                .then(res => {
                    if (res.status === 200) {
                        this.countNews = res.data.result.news
                    }
                })
            }
        }
        
    }
</script>

<style scoped>
    .abstract {
        background-color: #696969;
        color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 55px;
        margin-left: 35px;
        width: 94%;
    }

    .abstract h6 {
        margin-top: 5px;
        font-weight: bolder;
    }

    @media screen and (max-width: 450px) {
        .abstract {
            margin-left: 0%;
        }

        .abstract h6 {
            font-size: 14px;
        }
        
    }


</style>