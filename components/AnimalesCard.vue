<template>
  <!--Componente sobre los animales que va a ser implementado en la carpeta de pages-->
  <div class="card" style="width:400px;">
    <div class="card-image">
      <figure class="image">
        <img :src="imagen" alt="animal" class="animal-image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="animal-nombre">
            {{ nombre }}
          </p>
        </div>
      </div>
      <div>
          <p class="animal-lugar">
              Puede ser encontrado: {{ lugar }}
          </p>
      </div>
      <div>
          <p class="animal-precio">
              Precio de venta: {{ precio }} bayas
          </p>
      </div>
      <div>
          <p class="animal-capt">
              ¿Lo tienes capturado? 
              <button v-on:click="onCaptButton">
                {{ capturado }}
              </button>
          </p>
      </div>
      <div>
        <p class="animal-tipo">
          Tipo del animal: 
          <a v-bind:href="'/category' + '/' + tipo">{{ tipo }}</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nombre: {
      type: String,
      default: ''
    },
    imagen: {
      type: String,
      default: ''
    },
    lugar: {
      type: String,
      default: ''
    },
    precio: {
      type: String,
      default: ''
    },
    capturado: {
      type: String,
      default: ''
    },
    tipo:{
      type: String,
      default: ''
    }
  },
  methods: {
    onCaptButton(){
      this.$emit('onCaptButton')
    }
  }
}
</script>

<style scoped>
.animal-nombre {
  font-size: 30px;
  color: #ffe48a;
}
.animal-image {
  width: auto;
  width: 500px;
}
</style>