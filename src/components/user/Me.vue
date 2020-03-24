<template>
    <b-modal title="Meus dados" id="me" ref="me" header-bg-variant="dark" 
        header-text-variant="light">

       <b-row>
           <b-col>
                <b-button size="sm" variant="warning" :style="{float: 'right'}" @click="lock = !lock">
                    <b-icon icon="pencil"></b-icon>
                </b-button>
           </b-col>
       </b-row>

        <form class="mt-1">
            <b-form-group label="Nome">
                <b-form-input v-model="form.name" :readonly="lock"/>
            </b-form-group>

            <b-form-group label="Email">
                <b-form-input v-model="form.email" :readonly="lock"/>
            </b-form-group>

            <b-form-group label="Password">
                <b-form-input v-model="form.password" :readonly="lock" placeholder="*************"/>
            </b-form-group>
        </form>

    </b-modal>
</template>

<script>
    export default {

        computed: {
            form: function() {
                let user = this.$session.get('user');
                if(!user) {
                    return {}
                    
                }else {
                    return user;
                }
            }
        },

        data() {
            return {
                lock: true
            }
        }
        
    }
</script>