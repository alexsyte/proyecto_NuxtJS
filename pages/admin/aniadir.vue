<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="columns">
          <div class="column">
            <h2 class="title is-2">Nuevo animal</h2>
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
              <label class="label">Image</label>
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
              <label class="label">Lugar</label>
              <div class="control">
                <input
                  v-model="animal.lugar"
                  class="input"
                  type="text"
                  placeholder="lugar"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Precio</label>
              <div class="control">
                <input
                  v-model="animal.precio"
                  class="input"
                  type="text"
                  placeholder="precio"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Tipo de animal</label>
              <div class="select">
                <select v-model="animal.tipo">
                    <option value="Pez" selected>Pez</option>
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
                  @click.prevent="onSubmitButton"
                >
                  Guardar
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
  data() {
    return {
      animal: {
        nombre: null,
        imagen: null,
        precio: null,
        capturado: "No",
        lugar: null,
        tipo: "Pez"
      }
    }
  },
  methods: {
    onSubmitButton() {
      const response = db.collection('lista').add(this.animal)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped></style>