<template>
  <div>
  <!--Una condición v-if para que solo cargue cuando ya se haya traído los datos, si me he traído un animal solo saldrá la página de modificación del animal
  En cambio, si me he traído un texto, solo se mostrará esa parte-->
  <div class="section" v-if="animal">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="columns">
          <div class="column">
            <h2 class="title is-2">Modificar animal</h2>
          </div>
        </div>
        <div class="columns box">
          <div class="column">
            <div class="field">
              <label class="label">Nombre</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="animal.nombre"
                  placeholder="nombre del animal"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Imagen</label>
              <div class="control">
                <input
                  v-model="animal.imagen"
                  class="input"
                  type="text"
                  placeholder="https://...."
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Precio</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="animal.precio"
                  placeholder="precio del animal"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Lugar</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="animal.lugar"
                  placeholder="lugar del animal"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Tipo de animal</label>
              <div class="select">
                <select v-model="animal.tipo">
                    <option value="pez">pez</option>
                    <option value="bicho">bicho</option>
                  </select>
              </div>
            </div>

            <div class="field">
              <div class="control has-text-centered">
                <button
                  class="button is-danger"
                  type="button"
                  @click="$router.back()"
                >
                  Cancel
                </button>
                <button
                  class="button is-link"
                  type="button"
                  @click.prevent="onUpdate"
                >
                  Update
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section" v-if="texto">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="columns">
          <div class="column">
            <h2 class="title is-2">Modificar texto</h2>
          </div>
        </div>
        <div class="columns box">
          <div class="column">
            <div class="field">
              <label class="label">Título</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="texto.titulo"
                  placeholder="título del texto"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Texto</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="texto.texto"
                  placeholder="texto"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Tipo de texto</label>
              <div class="select">
                <select v-model="texto.tipo">
                    <option value="noticia" selected>noticia</option>
                    <option value="guía">guía</option>
                    <option value="foro">foro</option>
                  </select>
              </div>
            </div>

            <div class="field">
              <div class="control has-text-centered">
                <button
                  class="button is-danger"
                  type="button"
                  @click="$router.back()"
                >
                  Cancel
                </button>
                <button
                  class="button is-link"
                  type="button"
                  @click.prevent="onUpdateText"
                >
                  Update
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
export default {
  middleware: 'auth',
  data() {
    return {
      animal: null,
      texto: null
    }
  },
  created() {
    // Le pasamos la referencia al documento que le pasamos por parámetros
    // Le pasamos la id y le decimos que la recupere para tener sus datos
    // Si existe, asociamos el objeto al doc.data que nos ha traído el promise
    const response = db.collection('lista').doc(this.$route.params.id).get()
    response.then(doc => {
      if(doc.exists) {
        this.animal = doc.data()
      }
    })

    const response2 = db.collection('texto').doc(this.$route.params.id).get()
    response2.then(doc => {
      if(doc.exists) {
        this.texto = doc.data()
      }
    })
  },
  methods:{
      onUpdate(){
        // Pillamos la referencia del doc que nos hemos traído y la colección
        const ref = db.collection('lista').doc(this.$route.params.id)
        // Devuelve una promesa la actualización del objeto
        const response = ref.update(this.animal)
        response.then(() =>{
            this.$router.back()
        }).catch(error =>{
            console.log(error)
        })
      },
      onUpdateText(){
        // Pillamos la referencia del doc que nos hemos traído y la colección
        const ref2 = db.collection('texto').doc(this.$route.params.id)
        // Devuelve una promesa la actualización del objeto
        const response2 = ref2.update(this.texto)
        response2.then(() =>{
            this.$router.back()
        }).catch(error =>{
            console.log(error)
        })
      }
  }
}
</script>

<style scoped>

</style>