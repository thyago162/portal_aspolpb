<template>
    <b-container fluid>

       <b-row>
           <b-col class="contact-head ml-5">
               <div class="contact-title">
                  <h5 class="mt-2">CONTATO</h5>
               </div>
           </b-col>
       </b-row>

       <b-row class="mt-3">
           <b-col cols="6">
               <h4 class="ml-5 mt-4" :style="{fontWeight: 'bold'}">FAÇA CONTATO CONOSCO</h4>
               <form class="ml-5 mt-5">
                    <b-form-input placeholder="Nome" type="text" class="mt-2"/>
                    <b-form-input placeholder="Email" type="email" class="mt-2"/>
                    <b-form-input placeholder="Assunto" type="text" class="mt-2"/>
                    <b-form-textarea placeholder="Mensagem" class="mt-2" 
                        rows="6" max-rows="10"></b-form-textarea>
                    <b-button variant="success" class="mt-2" :style="{width: '100%'}" >Enviar</b-button>

               </form>
           </b-col>
           <b-col>
               <h4 class="mt-4" :style="{fontWeight: 'bold'}">CONTATE-NOS</h4>
               <h6 class="mt-5">
                   Associação dos Policiais Civis de Carreira do Estado da Paraíba
               </h6>
               <h6>
                  Rua Joaquim Barbosa Filho, Nº 12 - Sala 201 - Jardim São Paulo
               </h6>
               <h6>João Pessoa - CEP: 58.053-110</h6>
               <p class="mt-3">Telefone: (83) 3506-3429</p>
               <p>E-mail: secretaria@aspolpb.com.br</p>
           </b-col>
       </b-row>

       <b-row>
           <b-col>
               <h6 class="mt-3 ml-5">Goole Maps</h6>
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.7849294422113!2d-34.854495085518714!3d-7.150848694836667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2810d91be6f16563!2sAspol%20-%20PB%20-%20Sede%20Jo%C3%A3o%20Pessoa!5e0!3m2!1spt-BR!2sbr!4v1583281694938!5m2!1spt-BR!2sbr"  
                    frameborder="0" style="border:0;" class="google-maps" ></iframe>
           </b-col>

       </b-row>
    </b-container>
</template>

<script>
    export default {
        components: {
        }
        
    }
</script>

<style scoped>

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
        border-radius: 6px;
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

    .google-maps {
        width: 95%;
        height: 400px;
        margin-top: 20px;
        margin-left: 40px;
        margin-bottom: 20px;
    }

    h6, p {
        font-weight: bold;
    }

</style>>
