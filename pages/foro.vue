<!--Ésta página es la que contiene las 3 distintas categorías del foro y la cual solo se puede acceder tras hacer un login o un sign in-->
<template>
  <div class="bg-img">
    <audio class="musica" :src="require('@/static/intro-acnh.mp3')" controls></audio>

    <div class="container">
      
    <section class="section">
    <h1 class="title is-1">Foro</h1>
    <br>
    
    <div class="container">
      <section class="section">
        <!--A continuación están las 3 secciones del foro para poder hacer click-->
        <div class="card">
          <div class="card-content">
            <div>
                <p class="titulo">
                  <nuxt-link to="categoryForum/bienvenida">Bienvenida</nuxt-link>
                </p>
            </div>
            <div>
                <p class="texto">
                  En esta sección podrás ver mensajes de bienvenida de los distintos usuarios del foro, ¡sé libre de darte a conocer!
                </p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-content">
            <div>
                <p class="titulo">
                  <nuxt-link to="categoryForum/dudas">Dudas relacionadas con Animal Crossing</nuxt-link>
                </p>
            </div>
            <div>
                <p class="texto">
                  En esta sección podrás preguntar cualquier tipo de duda respecto al juego, ¡no seas tímido y anímate a preguntarnos lo que quieras!
                </p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-content">
            <div>
                <p class="titulo">
                  <nuxt-link to="categoryForum/otros">Otros</nuxt-link>
                </p>
            </div>
            <div>
                <p class="texto">
                  En esta sección podrás comentar otros aspectos fuera del juego, como tus gustos musicales, otros juegos que estés jugando, etc..
                </p>
            </div>
          </div>
        </div>

        <br>
        <!--Botón de log out-->
        <button class="button" @click="logOut()">
          Log Out
        </button>
      </section>
    </div>

    </section>
    </div>

  </div>
</template>

<script>
import { firebase } from '~/plugins/firebase'

export default {
    methods:{
      // Método de salir de la sesión
        logOut(){
          firebase.auth().signOut();
          this.$router.push('/')
        }
    }
}
</script>

<style>
.titulo {
  font-size: 20px;
  color: #0f0f16;
  font-style:italic;
  text-align: left;
}
.card{
  margin-bottom: 20px;
  width:1500px;
}
.texto{
  text-align:left;
}
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