<template>
    <div>
        <b-modal id="cp-social-network" ref="socialnetwork" title="Redes sociais" 
            size="xl" header-bg-variant="success" header-text-variant="light" hide-footer>
            <b-tabs content-class="mt-3">
                <b-tab title="Redes sociais">
                    <SocialNetworkView />
                </b-tab>
                <b-tab title="Aspol na mídia" disabled>
                    <Media />
                </b-tab>
            </b-tabs>
        </b-modal>
    </div>
</template>

<script>
    import SocialNetworkView from '../socialnetowrks/SocialNetworkView';
    import Media from '../media/Media';
    export default {
        components: {
            SocialNetworkView,
            Media
        },

        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Titulo'},
                    {key: 'nm_link', label: 'Link'},
                    {key: 'dt_date', label: 'Data'},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ]
            }
        }
        
    }
</script>