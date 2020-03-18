<template>
    <b-container>
        <b-row class="mt-4">
            <b-col>
                <div>
                    <h5>Sugestões</h5>
                </div>
            </b-col>
        </b-row>
        <b-row class="mb-4 mt-4">
            <b-col>
                <form >
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