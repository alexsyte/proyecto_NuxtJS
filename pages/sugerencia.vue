<!--
    Ésta página servirá para que el usuario pueda mandar una sugerencia al autor de la aplicación
    Está hecho con emailjs https://dashboard.emailjs.com/ 
    Una vez que el usuario le da al botón de enviar, a mi me llega un correo electrónico con toda la información que ha escrito
-->
<template>
  <div class="bg-img">
    <audio class="musica" :src="require('@/static/intro-acnh.mp3')" controls></audio>
    <div class="container">
    <section class="section">
    <h1 class="title is-1">¡Deja tu sugerencia aquí!</h1>

    <form class="contact-form" @submit.prevent="sendEmail">
        <div class="columns">
            <div class="column has-text-left">
                <input class="input" type="text" placeholder="nombre" name="from_name"/>
            </div>
        </div>

        <div class="columns">
            <div class="column has-text-left">
                <input class="input" type="text" placeholder="asunto" name="subject"/>
            </div>
        </div>

        <div class="columns">
            <div class="column has-text-left">
                <input class="input" type="email" placeholder="su e-mail" name="from_email"/>
            </div>
        </div>

        <div class="columns">
            <div class="column has-text-left">
                <textarea class="input" placeholder="mensaje" name="message">
                </textarea>
            </div>
        </div>

        <div class="col-sm-6 col-sm-offset-3 text-center">
            <button @click="enviar" class="button is-primary">
                Enviar
            </button>
        </div>
    </form>
        
    </section>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  methods: {
    sendEmail: (e) => {
        // Se rellenan con los datos que nos ofrece la página de emailjs
        emailjs.sendForm('gmail', '290118', e.target, 'user_uMMUSlOPGIIeEOG8k5FfQ')
            .then((result) => {
                console.log('SUCCESS!', result.status, result.text);
                alert("¡Enviado con éxito!")

            }, (error) => {
                console.log('FAILED...', error);
            });
    }
  }
}
</script>

<style scoped>
.bg-img {
    background-image: url(~@/static/956578.jpg);
    background-size:cover;
    background-repeat:  no-repeat;
    background-attachment: fixed;
    background-size:  cover;
    background-color: #999;
}
.musica{
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 10px;
}
</style>