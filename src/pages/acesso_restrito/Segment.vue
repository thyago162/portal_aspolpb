<template>
    <b-container fluid>
        <b-row class="mt-2 contact-row">
           <b-col class="contact-head ml-5">
               <div class="contact-title">
                  <h5 class="mt-2">SEGUESTÕES</h5>
               </div>
           </b-col>
        </b-row>
        <b-row class="mb-4 mt-4">
            <b-col>
                <form class="form ml-5">
                    <b-form-group label="Nome completo">
                        <b-form-input readonly  v-model="user.name"/>
                    </b-form-group>

                    <b-form-group label="E-mail">
                        <b-form-input readonly v-model="user.email" />
                    </b-form-group>

                    <b-form-group label="Assunto">
                        <b-form-input ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Conteúdo">
                        <b-form-textarea rows="10"></b-form-textarea>
                    </b-form-group>

                    <b-button variant="success" :style="{width: '100%'}">Enviar</b-button>
                </form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {

        computed: {
            user: function() {
                return this.$session.get('user');
            }
        }
        
    }
</script>

<style scoped>

    .contact-row {
        width: 99%;
    }
    .contact-head {
        margin-top: 20px;
        border-bottom: 3px solid red;
    }

    .contact-title {
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

    .form {
        width: 90%;
    }

</style>