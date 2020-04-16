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

        <ErroMessage :errors="errors" :visibility="visibility" />
        <Session :countdown="countdown" />

        <form @submit.stop.prevent="formSubmited">

            <b-container fluid>
                <b-row>
                    <b-col lg="12">
                         <b-form-group label="Ativar">
                            <b-form-radio-group v-model="form.st_status">
                                <b-form-radio :value="1" >Sim</b-form-radio>
                                <b-form-radio :value="0" >Não</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>

                        <b-form-group label="Imagem">
                            <b-form-file v-model="file" :state="Boolean(file)" 
                            @change="setImage" accept="image/" name="image" />
                        </b-form-group>

                        <div v-if="file">
                            <span >
                            {{file.name}}
                            <b-button size="sm" variant="default" @click="removeSelectedImage">
                                <b-icon icon="trash" variant="danger"></b-icon>
                            </b-button>
                            </span>

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
    </b-modal>
</template>

<script>

    import VueCropper from 'vue-cropperjs';
    import ErroMessage from '../error/ErrorMessage';
    import Session from '../session/Session';

    export default {

        props: ['item'],

        components: {
            ErroMessage,
            Session,
            VueCropper
        },

        data() {
            return {
                options: [
                    {text: 'Sim', value: 1},
                    {text: 'Não', value: 0}
                ],
                file: null,
                errors: [],
                visibility: false,
                loading: false,
                countdown: 0,
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
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

            formSubmited() {
                this.loading = true;
                if (this.form.nm_image_path && this.file) {
                    this.deleteImage()
                }

                this.saveImage(this.file)
            },

            save(){
                let form = new FormData();
                form.append('nm_image_path',this.form.nm_image_path);
                form.append('st_status',this.form.st_status);

                this.$http.post('warning',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {

                    if (res.status === 200 ) {
                        this.loading = false;

                        if (res.data.token_failure) {
                            this.countdown = 3;
                        }

                        if (res.data.result.error) {
                            this.errors.push(Object.values(res.status.result.error));
                            this.visibility = true;

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

            update(){
                this.$http.put('warning/'+this.form.id_warning,{
                    'nm_image_path': this.form.nm_image_path,
                    'st_status': this.form.st_status
                },{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        this.loading = false;

                         if (res.data.token_failure) {
                            this.countdown = 3;
                        }

                        if (res.data.result.error) {
                            this.errors.push(Object.values(res.status.result.error));
                            this.visibility = true;

                        }else {
                            this.$store.dispatch('warning');
                            this.$refs['warning-form'].hide();
                        }
                    }
                })
            },

            setImage(e) {
                const file = e.target.files[0];

                if (file.type.indexOf('image/') === -1) {
                    alert('Please select an image file');
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
                //this.saveImage(file)
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
                form.append('url',url.replace('storage','public'));
                form.append('folder','public/warning');

                this.$http.post('storage/delete',form,
                    {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
            },

            removeSelectedImage() {
                this.file = null;
                this.cropImg  = ''
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