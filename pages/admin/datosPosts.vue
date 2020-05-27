<!--Tabla donde nos traeremos los posts de nuestra base de datos de firebase-->
<template>
  <div>
    <section class="section" >
      <div class="columns">
        <div class="column">
          <h2 class="title is-2">Posts en la BD</h2>
        </div>
      </div>
      <div class="table-container">
        <button class="button" @click="logOut()">
          Log Out
        </button>
        <button class="button" @click="$router.back()">
          Volver
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
            <tr v-for="(item, index) in posts" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.titulo }}</td>
              <td>{{ item.tipo }}</td>
              <!--En este caso no hemos añadido una opción de editar, ya que no la veo necesaria-->
              <td>            
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
            posts:[],
            answers: []
        }
    },
    created() {
        this.getDocuments()
    },
    methods:{
        deleteDocument(id) {
            var opcion = confirm("Borrar un post borrará todas sus respuestas, ¿Estás seguro?")
            
            if(opcion == true){
              // Pillamos la referencia del documento a partir de la id que le pasamos que es la id de la fila seleccionada
              const ref = db.collection('posts').doc(id)
              // Buscamos todas las respuestas con la idPost del post a borrar, ya que al eliminar un post queremos eliminar también sus respuestas asignadas.
              db
              .collection('answers')
              .where('idPost', '==', id)
              .get()
              // Devuelve una promesa que mediante querySnapshot asignaremos a nuestro array
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // Pillamos la referencia, que será la id del documento traído
                  const ref2 = db.collection('answers').doc(doc.id)
                  // Y lo borramos
                  ref2.delete()
                })
              })

              // Y lo borramos con el método delete
              ref.delete()
              // Y refrescamos para que ese documento borrado no salga
              this.getDocuments()
            }else{
              
            }
            
        },
        getDocuments(){
            //Lo inicializamos siempre a vacío para que cada vez que borremos un post y volvamos a ejecutar este método no se vuelva a añadir a la variable creada
            this.posts=[]
            // Traer los posts de la BD
            const data = db.collection('posts')
            .orderBy('tipo','asc')
            .get()
            data
                .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const post = {
                        id: doc.id,
                        ...doc.data()
                    }
                    this.posts.push(post)
                })
                })
                .catch((error) => {
                console.log(error)
                })
        },
        logOut(){
          // Método de log out que nos envia a la página principal
          firebase.auth().signOut()
          this.$router.push('/')
        },
    }
}
</script>