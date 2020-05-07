<template>
  <div>
    <!--Posicionamos al final de la barra-->
    <div class="navbar-end">
      <!--Posicionamos un item, que en nuestro caso es un botón-->
      <div class="navbar-item">
        <div class="buttons">
          <a href="/login" class="button is-light"> Log in</a>
        </div>
      </div>
    </div>

    <div class="container">
      <div>
      <logo/>
      <h1 class="title">
        ¡Estás de vuelta!
      </h1>
      <h2 class="subtitle">
        Aplicación de gestión de objetos realizado por Alexandra Collinge de 2ºDAM
      </h2>
      <div class="links">
        <a href="/lista" class="button--green">
          Contenido
        </a>
        <br><br>
        <a href="https://github.com/nuxt/docs" target="_blank" class="button--grey">
          Documentación
        </a>
        <a href="https://github.com/alexsyte" target="_blank" class="button--grey">
          GitHub del autor
        </a>
        
      </div>
      </div>

    </div>

  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { db } from '~/plugins/firebase'

export default {
  components: {
    Logo
  },
  created() {
    console.log(db)
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
