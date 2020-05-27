<!--Ésta página nos filtra por el tipo de animal que hayamos hecho click, pudiendo elegir entre bichos y peces-->
<template>
<div class="bg-img">
  <audio class="musica" :src="require('@/static/intro-acnh.mp3')" controls></audio>
  <div class="container">
    <section class="section">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/lista" class="link_home">
              Home
            </nuxt-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">{{ $route.params.tipo }}</a>
          </li>
        </ul>
      </nav>
      <h1 class="title is-1">{{ $route.params.tipo }}</h1>
      <div class="container">
        <section class="section">
          <div class="columns is-multiline">
            <AnimalesCard
              :name="animal.nombre"
              :nombre="animal.nombre"
              :imagen="animal.imagen"
              :lugar="animal.lugar"
              :precio="animal.precio"
              v-on:onCaptButton="cambiar(animal)"
              :capturado="animal.capturado"
              :tipo="animal.tipo"
              class="animal-card"
              v-for="(animal, index) in animales" :key="index" 
            />
          </div>
        </section>
      </div>
    </section>
  </div>
  </div>
</template>

<script>
import AnimalesCard from '~/components/AnimalesCard'
import { db } from '~/plugins/firebase'

export default {
  components: {
    AnimalesCard
  },
  // Este método es para que el title de nuestra página cambie dependiendo del nombre de la categoría
  head () {
  return {
      title: 'Tipo: ' + this.$route.params.tipo ,
      meta: [
        { hid: 'description', name: 'description',
          content: 'En este sitio encontrarás información sobre los distintos bichos y peces encontrados en Animal Crossing New Horizons.' }
      ]
    }
  },
  async created() {
    await db
      .collection('lista')
      // Todos los documentos que estén dentro de este where
      .where('tipo', '==', this.$route.params.tipo)
      .get()
      // Devuelve una promesa que mediante querySnapshot asignaremos a nuestro array de animales
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.animales.push(doc.data())
        })
      })
  },

  data() {
    return {
      animales: []
    }
  },

  methods:{
        // Este método nos permite cambiar en pantalla y modificar en nuestra base de datos si tenemos capturado un bicho o no
        cambiar(animal){
            if(animal.capturado=="No"){
              console.log(db.collection('lista').doc(animal.id))
                this.ref = db.collection('lista').doc(animal.id)
                const response = this.ref.get()
                response.then(doc => {
                    if(doc.exists) {
                        animal.capturado="Sí"
                        this.ref.update(animal).then(() => {
                            console.log("ACTUALIZADO")
                        })
                    }
                })
                
            }else{
                this.ref = db.collection('lista').doc(animal.id)
                const response = this.ref.get()
                response.then(doc => {
                    if(doc.exists) {
                        animal.capturado="No"
                        this.ref.update(animal).then(() => {
                            console.log("ACTUALIZADO")
                        })
                    }
                })
            }
        },
  },
  
}
</script>
<style>
.animal-card {
  margin: 10px;
  min-width: 300px;
}
.link_home{
  margin-left: 25px;
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
