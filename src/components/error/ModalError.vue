<template>
    <b-modal hide-footer hide-header ref="modal-error" id="modal-error" body-bg-variant="danger" body-text-variant="light">
        <h4>Erro!</h4>
        <div v-if="errors.code === 403">
            <ul>
                <div v-for="(error, index) in messages" :key="index">
                    <div v-for="(err, index) in error" :key="index">
                        <li>{{err}}</li>
                    </div>
                </div>
            </ul>
        </div>
        <div v-else>
            {{messages}}
        </div>
        <p class="mt-3"><b>Clique fora da área vermelha para fechar!</b></p>
    </b-modal>
</template>

<script>
    export default {
        props: ['errors'],

        computed: {
            messages: function() {
                return this.errors.error
            },

            code: function() {
                return this.errors.code
            }
        }
    }
</script>