<!--Ésta página es la primera tras el log in del administrador, por la cual podemos navegar entre las distintas ventanas del manejo de nuestra BD-->
<template>
  <div>
    <section class="section" >
      <div class="columns">
        <div class="column">
          <h2 class="title is-2">Manejo BD</h2>
        </div>
      </div>
      <div class="table-container">
        <button class="button" @click="logOut()">
          Log Out
        </button>
        <button class="button" @click="link1()">
          BD Animales
        </button>
        <button class="button" @click="link2()">
          BD Textos
        </button>
        <button class="button" @click="link3()">
          BD Posts
        </button>
        <br><br>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import { firebase } from '~/plugins/firebase'

export default {
    // Solo se puede acceder después del login
    middleware: 'auth',
    // Métodos para ir a otras páginas o hacer log out
    methods:{
        link1(){
          this.$router.push('/admin/datosAnimal')
        },
        link2(){
          this.$router.push('/admin/datosTexto')
        },
        link3(){
          this.$router.push('/admin/datosPosts')
        },
        logOut(){
          firebase.auth().signOut();
        }
    },
    created(){

    }
}
</script>