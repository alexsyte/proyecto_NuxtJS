<!--Ésta página nos permite iniciar un nuevo post en el foro, guárdandolo en su categoría correspondiente-->
<template>
  <div class="bg-img">
    <div class="section">
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <div class="columns">
            <div class="column">
              <h2 class="title is-2">Nuevo post</h2>
            </div>
          </div>
          <div class="columns box">
            <div class="column">
              <div class="field">
                <label class="label">Título del post</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="post.titulo"
                    placeholder="titulo"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">¿Qué deseas comentar?</label>
                <div class="control">
                  <input
                    v-model="post.texto"
                    class="input"
                    type="text"
                    placeholder="texto a escribir"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control has-text-centered">
                  <button
                    class="button is-danger"
                    type="button"
                    @click="$router.back()"
                  >
                    Cancelar
                  </button>
                  <button
                    class="button is-link"
                    type="button"
                    @click.prevent="onSubmitButton"
                  >
                    Publicar
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import { firebase } from '~/plugins/firebase'
import { key } from "firebase-key";

export default {
  data() {
    return {
      post: {
        titulo: '',
        texto: '',
        userid: '',
        id: ''
      },
      key: ''
    }
  },
  methods: {
    onSubmitButton() {
        
        // Guardamos el usuario que ha escrito el post
        this.post.userid=firebase.auth().currentUser.email;
        var fecha=new Date();
        // Le ponemos la fecha en la cual lo ha escrito
        this.post.date=fecha;
        this.key=key();
        this.post.id=this.key;

        // Dependiendo desde dónde ha dado click a crear post, será de una categoría u otra
        if(this.$route.params.categoria=='bienvenida'){
          this.post.tipo='bienvenida'
          // Les asigno yo mi propio id ya que si genera uno automáticamente, no tengo manera de agregar ese id a mi atributo id del propio objeto (que me sirve luego para filtrarlo a la hora de mostrar la pregunta y sus respuestas)
          // Esto lo hago gracias a firebase-key
          db.collection('posts').doc(this.key).set(this.post)
          
        }else if(this.$route.params.categoria=='dudas'){
          this.post.tipo='dudas'
          db.collection('posts').doc(this.key).set(this.post)
          
        }else if(this.$route.params.categoria=='otros'){
          this.post.tipo='otros'
          db.collection('posts').doc(this.key).set(this.post)

        }
      
      // Tuve un problema a la hora de añadirlo y luego volver atrás, que el código no terminaba de guardarlo en la BD y se ejecutaba antes el volver a la página anterior,
      // por lo que tuve que hacer un método para que se esperara 1 segundo antes de volver atrás.
      this.activate()
      
    },
    activate() {
      // Método en el cual se espera 1 segundo y luego vuelve a la página anterior
      setTimeout(() => this.$router.back(), 1000);
    }
    
  }
}
</script>

<style lang="scss" scoped>
.bg-img {
  height: 895px;
  background-image: url(~@/static/956578.jpg);
  background-size:cover;
  background-repeat:  no-repeat;
  background-attachment: fixed;
  background-size:  cover;
  background-color: #999;
}
</style>