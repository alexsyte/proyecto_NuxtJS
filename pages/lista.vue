<template>
  <div>
    
    <div class="container">
    <section class="section">
    <h1 class="title is-1">Animales</h1>
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/lista">
              Home
            </nuxt-link>
          </li>
        </ul>
        <br>
      </nav>
      <!--Vamos a añadir un buscador a nuestra página para filtrar por un animal específico-->
      <div>
      Es sensible a mayúsculas y minúsculas: 
      <input type="text" v-model="search" placeholder="Busca algún animal"/>  
      </div>
    <div class="container">
      <section class="section">
        <div class="columns is-multiline">
          <!--Introducimos el componente que va a ser nuestro objeto bichos-->
          <!--A la hora de hacer el for, escribimos filteredAnimals para hacer uso de la propiedad conmutada y que así siempre nos busque respecto al search indicado arriba-->
          <AnimalesCard
            :nombre="animal.nombre"
            :imagen="animal.imagen"
            :lugar="animal.lugar"
            :precio="animal.precio"
            v-on:onCaptButton="cambiar(animal)"
            :capturado="animal.capturado"
            :tipo="animal.tipo"
            class="animales-card"
            v-for="(animal, index) in filteredAnimals" :key="index" 
          />
        </div>
      </section>
    </div>
    </section>
    </div>
  </div>
</template>

<script>
// Importamos nuestro componente creado
import AnimalesCard from "~/components/AnimalesCard"
import { db } from '~/plugins/firebase'

export default {
    components: {
        AnimalesCard
    },
    data(){
        return{
            animales:[],
            ref: null,
            search: ''
        }
    },
    created() {
        // Verificar que nuestra db de firebase funciona correctamente
        console.log(db)
        const data = db.collection('lista').get()
        data
        .then((snapshot) => {
            snapshot.forEach((doc) => {
            const animal = {
                id: doc.id,
                ...doc.data()
            }
            this.animales.push(animal)
            })
        })
        .catch((error) => {
            console.log(error)
        })
    },
    methods:{
        // Este método nos permite cambiar en pantalla y modificar en nuestra base de datos si tenemos capturado un bicho o no
        cambiar(animal){
            if(animal.capturado=="No"){
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
        }
    },
    computed:{
      // Vamos a sustituir el array mostrado (todos los animales) por el array resultado de la búsqueda a través de una propiedad conmutada
      filteredAnimals: function(){
        return this.animales.filter((animal)=>{
            return animal.nombre.match(this.search);
        })
      }
    }
}
</script>
<style>
.animales-card {
  margin: 10px 20px;
  min-width: 300px;
}
</style>