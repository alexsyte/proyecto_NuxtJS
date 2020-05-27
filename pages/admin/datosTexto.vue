<!--Tabla donde nos traeremos los textos de nuestra base de datos de firebase-->
<template>
  <div>
    <section class="section" >
      <div class="columns">
        <div class="column">
          <h2 class="title is-2">Textos (noticias y guías) en la BD</h2>
        </div>
      </div>
      <div class="table-container">
        <button class="button" @click="logOut()">
          Log Out
        </button>
        <button class="button" @click="$router.back()">
          Volver
        </button>
         <button class="button" @click="aniadir()">
          Añadir un nuevo texto a la BD
        </button>
        <br><br>
        <table class="table is-fullwidth is-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Tipo</th>
              <th>Acciones a realizar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in textos" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.titulo }}</td>
              <td>{{ item.tipo }}</td>
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
            textos:[]
        }
    },
    created() {
        this.getDocuments()
    },
    methods:{
        deleteDocument(id) {
            // Pillamos la referencia del documento a partir de la id que le pasamos que es la id de la fila seleccionada
            const ref = db.collection('texto').orderBy('tipo','asc').doc(id)
            // Y lo borramos con el método delete
            ref.delete()
            // Y refrescamos para que ese documento borrado no salga
            this.getDocuments()
        },
        getDocuments(){
            //Lo inicializamos siempre a vacío para que cada vez que borremos un texto (guía/noticia) y volvamos a ejecutar este método no se vuelva a añadir a la variable creada
            this.textos=[]
            // Traer los textos de la BD
            const data = db.collection('texto').orderBy('tipo','asc').get()
            data
                .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const texto = {
                        id: doc.id,
                        ...doc.data()
                    }
                    this.textos.push(texto)
                })
                })
                .catch((error) => {
                console.log(error)
                })
        },
        logOut(){
          // Método de log out que nos devuelve a la ventana principal
          firebase.auth().signOut()
          this.$router.push('/')
        },
        aniadir(){
          this.$router.push('/admin/aniadirTexto')
        }
    }
}
</script>