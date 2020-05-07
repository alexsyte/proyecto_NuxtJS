<template>
  <div class="box column is-4 is-offset-4 box-login">
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
        <nuxt-link to="/" class="button is-danger">Cancelar</nuxt-link>
        <button @click="onLogin" class="button is-primary">
          Login
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { firebase } from '~/plugins/firebase'
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
        // E iremos a la pantalla de admin
        this.$router.push('admin/datos')
        console.log("Logueado con éxito.");
      })
      .catch(()=>{
        alert("email y/o contraseña incorrectos");
       });
    }
  }
}
</script>