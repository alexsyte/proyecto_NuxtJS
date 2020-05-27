<!--Ésta página sirve para añadir un nuevo texto a la BD-->
<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="columns">
          <div class="column">
            <h2 class="title is-2">Nuevo texto</h2>
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
                  placeholder="nombre"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Texto</label>
              <div class="control">
                <input
                  v-model="texto.texto"
                  class="input"
                  type="text"
                  placeholder="texto a escribir"
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
                  Cancelar
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
import { key } from "firebase-key";

export default {
  middleware: 'auth',
  data() {
    return {
      texto: {
        titulo: null,
        texto: null,
        tipo: "noticia",
        votos: 0
      },
      key: null
    }
  },
  methods: {
    // Una vez recogido todos los datos, añade el texto a la BD y volvemos a la ventana anterior
    onSubmitButton() {
      this.key=key();
      this.texto.id=this.key;
      db.collection('texto').doc(this.key).set(this.texto)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped></style>