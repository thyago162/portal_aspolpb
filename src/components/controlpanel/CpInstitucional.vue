<template>
    <div>
        <b-modal id="cp-institucional" ref="institucional" size="xl" 
            title="INSTITUCIONAL" header-bg-variant="success" header-text-variant="light">
            <b-tabs content-class="mt-3">
                <b-tab title="Quem somos">
                    <AboutView />
                </b-tab>
                <b-tab title="Campanhas"></b-tab>
                <b-tab title="Identidade visual"></b-tab>
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
