<!--Tabla donde nos traeremos los restaurantes de nuestra base de datos de firebase-->
<template>
  <div>
    <section class="section" >
      <div class="columns">
        <div class="column">
          <h2 class="title is-2">Animales en la BBDD</h2>
        </div>
      </div>
      <div class="table-container">
        <button class="button" @click="logOut()">
          Log Out
        </button>
         <button class="button" @click="aniadir()">
          Añadir un nuevo animal a la BBDD
        </button>
        <br><br>
        <table class="table is-fullwidth is-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones a realizar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in animales" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.nombre }}</td>
              <td>
                <nuxt-link class="button" :to="item.id" >
                  Edit
                </nuxt-link>
            
                <button class="button is-danger" @click="deleteDocument(item.id)">
                  Delete    
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import { firebase } from '~/plugins/firebase'

export default {
    middleware: 'auth',
    data(){
        return{
            animales:[]
        }
    },
    created() {
        this.getDocuments()
    },
    methods:{
        deleteDocument(id) {
            // Pillamos la referencia del documento a partir de la id que le pasamos que es la id de la fila seleccionada
            const ref = db.collection('lista').doc(id)
            // Y lo borramos con el método delete
            ref.delete()
            // Y refrescamos para que ese documento borrado no salga
            this.getDocuments()
        },
        getDocuments(){
            //Lo inicializamos siempre a vacío para que cada vez que borremos un bicho y volvamos a ejecutar este método no se vuelva a añadir a la variable creada
            this.animales=[]
            // Traer los restaurantes
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
        logOut(){
          firebase.auth().signOut()
          this.$router.push('/')
        },
        aniadir(){
          this.$router.push('/admin/aniadir')
        }
    }
}
</script>