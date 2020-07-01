<template>
    <b-modal id="warning-form" ref="warning-form" title="Novo item" 
       ok-only header-bg-variant="primary" header-text-variant="light" 
        ok-title="Salvar" @ok="handleOk" no-close-on-backdrop size="lg" >

        <template v-slot:modal-footer="{ok}">      
            <b-button @click="ok()" variant="success" size="md">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner class="ml-1" label="Spinning" small v-show="loading"></b-spinner>
            </b-button>
        </template>

        <b-alert
          variant="warning"
          dismissible
          :show="true"
        >Os campos com asteriscos são obrigatórios</b-alert>

        <form @submit.stop.prevent="formSubmited">

            <b-container fluid>
                <b-row>
                    <b-col lg="12">
                         <b-form-group label="Ativar *">
                            <b-form-radio-group v-model="form.st_status" :state="state.status">
                                <b-form-radio :value="1" >Sim</b-form-radio>
                                <b-form-radio :value="0" >Não</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>

                        <b-form-group label="Imagem">
                            <b-form-file v-model="file" :state="Boolean(file)" 
                            @change="setImage" accept="image/" name="image" />
                        </b-form-group>

                        <div v-if="file || form.nm_image_path">
                            <span >
                            {{file ? file.name : form.nm_image_path | fileName}}
                            <b-button size="sm" variant="default" @click="deleteImage()">
                                <b-icon icon="trash" variant="danger"></b-icon>
                            </b-button>
                            </span>

                        </div>

                        <div v-if="file || form.nm_image_path">
                     
                            <vue-cropper
                                class="mt-2"
                                ref="cropper"
                                :src="form.nm_image_path"
                                alt="Source Image"
                                :aspect-ratio="16 / 9"
                                preview=".preview"
                            ></vue-cropper>

                            <div>
                                <b-button size="sm" class="m-2" variant="info" @click.prevent="cropImage">Cortar</b-button>
                                <b-button size="sm" @click.prevent="reset" variant="warning">Resetar</b-button>
                            </div>
            
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col >
                        <div v-if="cropImg"  class="cropped-image">
                            <h6>Prévia</h6>
                            <img
                                :src="cropImg"
                                alt="Cropped Image"
                            />
                        </div> 
                    </b-col>
                </b-row>
            </b-container>
        </form>

        <SessionOff ref="session" />
        <ModalError ref="error" :errors="errors" />

    </b-modal>
</template>

<script>

    import VueCropper from 'vue-cropperjs';
    import SessionOff from '../session/Session';
    import ModalError from '../error/ModalError';
    import {validate} from '../../config'

    export default {

        props: ['item'],

        components: {
            VueCropper,
            SessionOff,
            ModalError,
        },

        data() {
            return {
                options: [
                    {text: 'Sim', value: 1},
                    {text: 'Não', value: 0}
                ],
                file: null,
                errors: {},
                state: {},
                loading: false,
                cropImg: '',
                imgSrc: ''
            }
        },

        computed: {
            token: function() {
                return this.$session.get('jwt');
            },

            form: function() {
                return this.item;
            }
        },

        methods: {
            handleOk(bvModalEvt){
                this.loading = true;
                bvModalEvt.preventDefault();
                this.requiredFields();
                this.save();
            },

            save(){
                let form = new FormData();
                form.append('id_warning', this.form.id_warning);
                form.append('nm_image_path',this.form.nm_image_path);
                form.append('st_status', this.form.st_status == undefined ? '' : this.form.st_status);
                form.append('file', this.file);

                this.$http.post('warning',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {

                    if (res.status === 200 ) {
                        this.loading = false;

                        if (res.data.token_failure) {
                           this.$refs.session.$refs.session.show()
                        }

                        if (res.data.result.error) {
                            this.$refs.error.$refs['modal-error'].show();
                            this.errors = res.data.result;

                        }else {
                            this.$store.dispatch('warning');
                            this.$refs['warning-form'].hide();
                        }
                    }
                })
                .catch(err => {
                    this.errors.push(err);
                })
            },

            setImage(e) {
                const file = e.target.files[0];

                if (file.type.indexOf('image/') === -1) {
                    alert('Por favor escolha uma imagem');
                    return;
                }

                if (typeof FileReader === 'function') {
                    const reader = new FileReader();

                reader.onload = (event) => {
                    this.imgSrc = event.target.result;
                    // rebuild cropperjs with the updated source
                    this.$refs.cropper.replace(event.target.result);
                };

                reader.readAsDataURL(file);
                } else {
                    alert('Sorry, FileReader API not supported');
                }
            },

            cropImage() {
                let vm = this
                // get image data for post processing, e.g. upload or setting image src
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
                this.$refs.cropper.getCroppedCanvas().toBlob(function (blob) {
                    vm.file = new File([blob], 'arquivo')
                },'image/jpeg')
            },

            reset() {
                this.$refs.cropper.reset();
            },

            saveImage(img) {

                let form = new FormData();

                form.append('file', img);
                form.append('folder','public/warning');

                this.$http.post('storage/save', form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'multipart/form-data'
                    }
                })
                .then(res => {

                    if (res.status === 200) {
                        let image = res.data.result.url;
                        image = image.replace('public','storage')
                        this.form.nm_image_path = image;
                        
                        if (!this.form.id_warning) {
                            this.save();

                        } else {
                            this.update();
                        }
                    }
                    
                })
                .catch(err => {
                    this.erro = err;
                })

            },

           deleteImage() {

                let url = this.form.nm_image_path;

                let form = new FormData();
                form.append('nm_image_path', url);
                form.append('folder','public/warninig');
                form.append('id_news', this.form.id_warning);

               this.$http.post('warning/image-remove',form,
                {
                   headers: {
                       Authorization: 'Bearer '+this.token
                   }
               })
               .then(res => {
                   
                   if (res.status === 200) {
                       alert('Imagem removida');
                       this.form.nm_image_path = '';
                       this.imgSrc = ''
                   }
               })

            },

            requiredFields() {
                this.state.status = validate(this.form.st_status)
            }
        }
        
    }
</script>

<style scoped>

    .preview-area p {
        font-size: 1.25rem;
        margin: 0;
        margin-bottom: 1rem;
    }

    .preview-area p:last-of-type {
        margin-top: 1rem;
    }

    .preview {
        width: 100%;
        height: calc(372px * (9 / 16));
        overflow: hidden;
    }

    .crop-placeholder {
        width: 100%;
        height: 200px;
        background: #ccc;
    }

    .cropped-image img {
        max-width: 100%;
    }
</style>