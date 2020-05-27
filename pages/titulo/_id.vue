<template>
<div class="bg-img">
  <audio class="musica" :src="require('@/static/intro-acnh.mp3')" controls></audio>
  <div class="container">
    <section class="section">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/" class="link_home">
              Home
            </nuxt-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">Contenido</a>
          </li>
        </ul>
      </nav>
          <div>
            <TextoCard
            :id="texto.id"
            :titulo="texto.titulo"
            :texto="texto.texto"
            :votos="texto.votos"
            v-for="(texto, index) in textos" :key="index"
            class="textos-card2"
            />
            <div class="imagenes">
              <img id="like" src="@/static/like.png" width="25px" v-on:click="sumar()"/>
              <img id="dislike" src="@/static/dislike.png" width="27px" v-on:click="restar()"/>
            </div>
          </div>
    </section>
  </div>
  </div>
</template>

<script>
import TextoCard from '~/components/TextoCard'
import { db } from '~/plugins/firebase'


export default {
  components: {
    TextoCard
  },
  // Este método es para que el title de nuestra página cambie dependiendo del nombre
  head () {
  return {
      meta: [
        { hid: 'description', name: 'description',
          content: 'En este sitio encontrarás información sobre distinta información sobre Animal Crossing.' }
      ]
    }
  },
  async created() {
    await db
      .collection('texto')
      // Todos los documentos que estén dentro de este where
      .where('id', '==', this.$route.params.id)
      .get()
      // Devuelve una promesa que mediante querySnapshot asignaremos a nuestro array
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.textos.push(doc.data())
          console.log(this.textos)
        })
      })
  },

  data() {
    return {
      textos: [],
      texto: ''
    }
  },
  methods:{
    async sumar(){
      if(document.getElementById("like").style.backgroundColor=="green"){
        alert("¡Lo siento pero ya le diste like!")
      }else{
        await db
        .collection('texto')
        // Todos los documentos que estén dentro de este where
        .where('id', '==', this.$route.params.id)
        .get()
        // Devuelve una promesa que mediante querySnapshot asignaremos a nuestro array
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const texto = {
                  id: doc.id,
                  ...doc.data()
            }
            
            // Actualizamos nuestra guía / noticia con el voto sumado
            this.ref = db.collection('texto').doc(texto.id)
                  const response = this.ref.get()
                  response.then(doc => {
                      if(doc.exists) {
                          texto.votos++;
                          console.log(texto.votos)
                          this.ref.update(texto).then(() => {
                              console.log("ACTUALIZADO")
                              document.getElementById("like").setAttribute('style', 'background-color: green');
                              document.getElementById("dislike").setAttribute('style', 'background-color: white');
                          })
                      }
                  })
          })
        })
      }
      
      
    },
    async restar(){
      if(document.getElementById("dislike").style.backgroundColor=="red"){
        alert("¡Ya le diste dislike! Aunque podrías cambiar de opinión...")
      }else{
        await db
        .collection('texto')
        // Todos los documentos que estén dentro de este where
        .where('id', '==', this.$route.params.id)
        .get()
        // Devuelve una promesa que mediante querySnapshot asignaremos a nuestro array
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const texto = {
                  id: doc.id,
                  ...doc.data()
            }

            // Actualizamos nuestra guía / noticia con el voto restado
            this.ref = db.collection('texto').doc(texto.id)
                  const response = this.ref.get()
                  response.then(doc => {
                      if(doc.exists) {
                          texto.votos--;
                          console.log(texto.votos)
                          this.ref.update(texto).then(() => {
                              console.log("ACTUALIZADO")
                              document.getElementById("dislike").setAttribute('style', 'background-color: red');
                              document.getElementById("like").setAttribute('style', 'background-color: white');
                          })
                      }
                  })
          })
        })
      }
    }
  }

}
</script>
<style>
.textos-card2 {
    margin: 20px auto;
    height:auto;    
    text-align: justify;
}
.imagenes{
  text-align: right;
}
#like, #dislike{
    border-radius: 5px;
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