<!--Ésta página nos mostrará el post del foro al cual hayamos hecho click para acceder, con sus respuestas (si las tuviera), a su vez, nos permitirá responder a ese post-->
<template>
<div class="bg-img">
  <audio class="musica" :src="require('@/static/intro-acnh.mp3')" controls></audio>
  <div class="container">
    <section class="section">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/foro" class="link_home">
              Volver al foro
            </nuxt-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page"> Post </a>
          </li>
        </ul>
      </nav>
          <div>
            <PostCard
            :id="post.id"
            :titulo="post.titulo"
            :texto="post.texto"
            :userid="post.userid"
            :date="post.date"
            v-for="(post, index) in posts" :key="index"
            class="post-card"
            />
          </div>
          
          <div class="respuesta" v-if="answer">
            <AnswerCard
            :texto="answer.texto"
            :userid="answer.userid"
            :date="answer.date"
            v-for="(answer, index) in answers" :key="index"
            class="answer-card"
            />
          </div>

        <br><br>

        <div class="columns box" style="width: 1000px; margin-left: 30px;">
          <div class="column">

            <div class="field">
              <label class="label">¿Qué deseas comentar?</label>
              <div class="control">
                <input
                  v-model="answer.texto"
                  class="input"
                  type="text"
                  id="texto"
                  placeholder="texto a escribir"
                />
              </div>
            </div>
            <div class="field">
              <div class="control has-text-centered">
                <button class="button" @click="answerPost()">
                      Responder
                </button>
              </div>
            </div>
            
          </div>
        </div>

    </section>
  </div>
  </div>
  
</template>

<script>


import PostCard from '~/components/PostCard'
import AnswerCard from '~/components/AnswerCard'
import { db } from '~/plugins/firebase'
import { firebase } from '~/plugins/firebase'

export default {
  components: {
    PostCard,
    AnswerCard
  },
  head () {
  return {
      meta: [
        { hid: 'description', name: 'description',
          content: 'En este sitio encontrarás información sobre preguntas del foro.' }
      ],
    }
  },
  async created() {
    var fecha;
    var fechaCortada;

    var fechaResp;
    var fechaCortadaResp;


    // Busco todos los posts que tengan ese id
    await db
      .collection('posts')
      // Todos los documentos que estén dentro de este where
      .where('id', '==', this.$route.params.id)
      .get()
      // Devuelve una promesa que mediante querySnapshot asignaremos a nuestro array
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const post = {
                id: doc.id,
                ...doc.data()
          }

          // Ya que el tipo date trae demasiados datos, lo filtro para que solo muestre el día, mes, año y hora
          fecha = (post.date).toDate();
          fechaCortada = (fecha.toString()).substring(4,25);
          post.date=fechaCortada;

          this.posts.push(post)

          // Ver el id del documento
          this.idDocumento=doc.id
        })
      });
   
    await db
      .collection('answers')
      // Todos los documentos que estén dentro de este where
      .where('idPost', '==', this.idDocumento)
      .orderBy('date','desc')
      .get()
      // Devuelve una promesa que mediante querySnapshot asignaremos a nuestro array
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const answer = {
                id: doc.id,
                ...doc.data()
          }

          // Ya que el tipo date trae demasiados datos, lo filtro para que solo muestre el día, mes, año y hora
          fechaResp = (answer.date).toDate();
          fechaCortadaResp = (fechaResp.toString()).substring(4,25);
          answer.date=fechaCortadaResp;

          this.answers.push(answer)
        })
      })
  },
  data() {
    return {
      posts: [],
      idDocumento:'',
      answers: [],
      answer: {
        texto: null,
        userid: null,
        idPost: null,
        date: null
      }
    }
  },
  methods:{
    answerPost(){
      // Método para añadir esa respuesta a la BD y que aparezca en la página en el momento
      this.answer.userid=firebase.auth().currentUser.email;
      this.answer.idPost=this.idDocumento;
      var fecha=new Date();
      this.answer.date=fecha;
      console.log(this.answer)
      db.collection('answers').add(this.answer)
      this.getDocuments()
    },

    getDocuments(){
      var fechaResp;
      var fechaCortadaResp;

            this.answers=[]
            // Traer las respuestas
            const data = db.collection('answers')
            .where('idPost', '==', this.idDocumento)
            .orderBy('date','desc')
            .get()
            // Devuelve una promesa que mediante querySnapshot asignaremos a nuestro array
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const answer = {
                id: doc.id,
                ...doc.data()
                }
                
                // Ya que el tipo date trae demasiados datos, lo filtro para que solo muestre el día, mes, año y hora
                fechaResp = (answer.date).toDate();
                fechaCortadaResp = (fechaResp.toString()).substring(4,25);
                answer.date=fechaCortadaResp;

                this.answers.push(answer)
              })
            })
    }
  }

}
</script>
<style>
.post-card {
    margin: 20px auto;
    height:auto;    
    text-align: justify;
}
.answer-card {
    margin: 20px;
    margin-left: 30px;
    height:auto;   
    text-align: justify;
}
.respuesta{
  width: 1000px;
}
.label{
  text-align: left;
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