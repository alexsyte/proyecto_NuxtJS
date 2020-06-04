<!--Ésta página nos envía a los posts de la categoría del foro a la que hayamos navegado-->
<template>
  <div class="bg-img">
    <audio class="musica" :src="require('@/static/intro-acnh.mp3')" controls></audio>
    <div class="container">
      
    <section class="section">
    <h1 class="title is-1">Foro</h1>
    <br>
    
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/foro" class="link_home">
              Volver al foro
            </nuxt-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">{{ $route.params.tipo }}</a>
          </li>
        </ul>
    </nav>

    <div class="container">
      <section class="section">
        
        <div>
          <PostCard
            :id="post.id"
            :titulo="post.titulo"
            :userid="post.userid"
            :date="post.date"
            :tipo="post.tipo"
            v-for="(post, index) in posts" :key="index"
            class="post-card"
          />
        </div>
        
        <button class="button is-default" style="margin-left:20px;"><a v-bind:href="'../nuevoPost' + '/' + this.$route.params.tipo">
          Comenzar post
        </a></button>
        
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
// Importamos nuestro componente creado
import PostCard from "~/components/PostCard"

import { db } from '~/plugins/firebase'
import { firebase } from '~/plugins/firebase'

export default {
    components: {
        PostCard
    },
    data(){
        return{
            posts:[],
            ref: null,
        }
    },
    created() {
        var tipo;
        var fecha;
        var fechaCortada;

        // Nos traemos los posts 
        const data = db.collection('posts')
        .where('tipo','==',this.$route.params.tipo)
        .orderBy('date', 'desc')
        .get()
        data
        
        .then((snapshot) => {
            snapshot.forEach((doc) => {
            const post = {
                id: doc.id,
                ...doc.data()
            }
            
            // Ya que el tipo date trae demasiados datos, lo filtro para que solo muestre el día, mes, año y hora
            fecha = (post.date).toDate();
            fechaCortada = (fecha.toString()).substring(4,25);
            post.date=fechaCortada;
            this.posts.push(post)
            })
        })
        .catch((error) => {
            console.log(error)
        })
        
    },
    methods:{
        logOut(){
          // Método de log out 
          firebase.auth().signOut();
          this.$router.push('/')
        }
    }
}
</script>
<style>
.post-card {
    margin: 20px auto;
    height: auto;
    text-align: left;
}
.button{
    margin: 10px;
}
.bg-img {
  background-image: url(~@/static/956578.jpg);
  background-size:cover;
  background-repeat:  no-repeat;
  background-attachment: fixed;
  background-size:  cover;
  background-color: #999;
}
</style>