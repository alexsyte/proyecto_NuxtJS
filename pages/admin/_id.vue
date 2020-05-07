<template>
  <!--Una condición v-if para que solo cargue cuando ya se haya traído los datos-->
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
                    <option value="Pez">Pez</option>
                    <option value="Bicho">Bicho</option>
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
</template>

<script>
import { db } from '~/plugins/firebase'
export default {
  middleware: 'auth',
  data() {
    return {
      animal: null
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
      }
  }
}
</script>

<style scoped>

</style>