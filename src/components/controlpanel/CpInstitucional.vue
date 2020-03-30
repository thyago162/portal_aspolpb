<template>
    <div>
        <b-modal id="cp-institucional" ref="institucional" size="xl" 
            title="INSTITUCIONAL" header-bg-variant="success" header-text-variant="light" hide-footer>
            <b-tabs content-class="mt-3">
                <b-tab title="Quem somos">
                    <AboutView />
                </b-tab>
                <b-tab title="Campanhas" disabled></b-tab>
                <b-tab title="Identidade visual" disabled></b-tab>
            </b-tabs>
        </b-modal>
    </div>
</template>

<script>
    import AboutView from '../institucional/about/AboutView'
    export default {
        components: {
            AboutView
        }
        
    }
</script>
