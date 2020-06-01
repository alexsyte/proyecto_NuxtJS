<!--Ésta página es el login al foro, no confundir con el login en la carpeta de admin-->
<template>
  <div class="bg-img">
    <br>
    <div class="box column is-4 is-offset-4 box-login">
      <h1 class="title is-1" style="text-align: center;">Inicia sesión en el foro</h1>
      <div class="columns">
        <div class="column has-text-centered">
          <img src="@/static/imagenIS.png" />
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-left">
          <input class="input" type="email" placeholder="email" v-model="email"/>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-left">
          <input class="input" type="password" placeholder="contraseña" v-model="password"/>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered">
          <nuxt-link to="/" class="button is-danger">
            Cancelar
          </nuxt-link>
          <button @click="onLogin" class="button is-primary">
            Login
          </button>
          <button @click="signIn" class="button is-primary">
            Sign In
          </button>
          <button @click="passwordForgot" class="button is-danger">
            ¿Olvidó la contraseña?
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { firebase } from '~/plugins/firebase'
import { db } from '~/plugins/firebase'

export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },  
  methods: {
    onLogin() {
      // Nos logueamos con el usuario que tenemos en nuestros usuarios de firebase
      const response = firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      response.then(data => {
        this.$router.push('../foro')
        console.log("Logueado con éxito.");
      })
      .catch(()=>{
        alert("email y/o contraseña incorrectos");
       });
    },
    signIn(){
      // Se crea una nueva cuenta para escribir en el foro, si la cuenta ya existiera muestra un mensaje de error
      const response = firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      // He creado una cuenta de prueba con email profesores@info.com y contraseña usuario
      response.then(data => {
        // Si todo va bien, nos redigirá al foro
        this.$router.push('../foro')
        console.log("Logueado con éxito.");
      })
      .catch(()=>{
        alert("La cuenta ya existe");
       });
    },
    passwordForgot(){
      // Ponemos un alert, con el cual recogeremos lo que escriba el usuario
      var respuesta = prompt("¡Porfavor escriba su e-mail!", "");

      // Si es nulo, se lo decimos al usuario
      if (respuesta == null || respuesta == "") {
        txt = "No ha escrito nada.";
      } else {
        // Si no es nulo o vacío, miramos si está en firebase ese email y le envíamos un correo para cambiar la contraseña
        firebase.auth().sendPasswordResetEmail(respuesta)
        .then(function() {
          alert('Se ha enviado un correo con una nueva contraseña.');
        })
        // Si no está en firebase ese correo registrado, lo notificamos
        .catch(function(error) {
          alert('El correo no se encuentra registrado en el foro.');
        });
      } 
      
    }

  }
}
</script>

<style scoped>
.bg-img {
    height: 975px;
    background-image: url(~@/static/956578.jpg);
    background-size:cover;
    background-repeat:  no-repeat;
    background-attachment: fixed;
    background-size:  cover;
    background-color: #999;
}
</style>