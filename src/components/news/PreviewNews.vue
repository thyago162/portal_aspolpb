<template>
    <b-card :style="{border: 'none'}">
        <div>
            <h5 :style="{textAlign: 'center'}">Pré-visualização</h5>
        </div>
        <b-media >

            <b-row>
                <b-col>
                    <h3 class="ml-4" :style="{fontWeight: 'bold'}" >{{title}}</h3>
                </b-col>
            </b-row>

            <b-row>
                <b-col v-if="subtitle != 'null'">
                    <h6 class="ml-4" >{{subtitle}}</h6>
                </b-col>
            </b-row>

            <b-row class="ml-2" >
                <b-col lg="8">
                    <p class="date" >{{date | namedDate}}</p>
                </b-col>
            </b-row>

            <b-row class="mt-2" :style="{display: 'flex', flexDirection: 'row', justifyContent: 'center'}">
                <b-col lg="8" >
                    <div class="cel-image-container mt-3 cell-image" >
                        <b-img :src="url" class="cel-image"  fluid></b-img>
                    </div>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <div class="content">
                        <p v-html="content" class="mt-4 ml-4"></p>
                    </div>
                </b-col>
            </b-row>
                        
        </b-media>
    </b-card>
</template>

<script>

    export default {
        props: [
            'title',
            'subtitle',
            'date',
            'content',
            'image',
            'path'
        ],  

        computed: {
            url: function() {
                return this.path ? this.path : this.image
            }
        }
    }
</script>

<style scoped>

    .news-image {
        width: 400px;
    }

    .align-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h5 {
        color: #fff;
        font-weight: bolder;
    }

    .date {
        font-weight: bolder;
        color: darkgray;
        margin-top: 15px;
    }

    .cel-image-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    
    @media screen and (max-width: 1200px){
        .news-image {
            width: 350px;
        }

        h3 {
            font-size: 18px;
            font-weight: bolder;
        }

        h6 {
            font-size: 14px;
            font-weight: bolder;
        }
        p {
            font-size: 14px;
        }

        .news-title {
            width: 170px;
            height: 38px;
        }

        h5 {
            font-size: 18px;
        }
        
    }

    @media screen and (max-width: 1000px) {
        .news-image {
            width: 300px;
        }
         h3 {
            font-size: 16px;
            font-weight: bolder;
        }

        h6 {
            font-size: 13px;
            font-weight: bolder;
        }
        p {
            font-size: 12px;
        }

         .news-title {
            width: 150px;
            height: 34px;
        }

        h5 {
            font-size: 16px;
        }
        
    }
    @media screen and (max-width: 800px){
        .news-image {
            width: 250px;
        }
         h3 {
            font-size: 14px;
            font-weight: bolder;
        }

        h6 {
            font-size: 12px;
            font-weight: bolder;
        }
        p {
            font-size: 10px;
        }

        .news-title {
            width: 130px;
            height: 30px;
        }

        h5 {
            font-size: 15px;
        }
        
    }
    @media screen and (max-width: 700px){
        .news-image {
            width: 200px;
        }

         h3 {
            font-size: 12px;
            font-weight: bolder;
        }

        h6 {
            font-size: 11px;
            font-weight: bolder;
        }
        p {
            font-size: 9px;
        }

         .news-title {
            width: 120px;
            height: 28px;
        }

        h5 {
            font-size: 14px;
        }
        
    }

     @media screen and (max-width: 550px){
        .news-image {
            display: none;
        }

         h3 {
            font-size: 13px;
            font-weight: bold;
        }

        h6 {
            font-size: 10px;
            color: #333333;
        }
        p {
            font-size: 9px;
        }
        .news-title {
            width: 100px;
            height: 25px;
        }

        h5 {
            font-size: 12px;
        }

        .cel-image-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        .cel-image {
            display: inline-block;
            max-width: 250px;
        }
        
    }

</style>