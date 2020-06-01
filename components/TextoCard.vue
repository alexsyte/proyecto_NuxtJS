<template>
  <div class="card" style="width:1500px;">
    <div class="card-content">
        <div>
          <p class="texto-titulo">
            <a v-bind:href="'/titulo' + '/' + id">{{ titulo }}</a>
          </p>
        </div>
      <div>
          <p class="texto-texto">
            {{ texto }}
          </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      default: ''
    },
    texto: {
      type: String,
      default: ''
    },
    tipo:{
      type: String,
      default: ''
    },
    votos:{
      type: Number,
      default: 0
    },
    id:{
        type: String,
        default: ''
    }
  },
  created() { 
    
  }
}
</script>

<style scoped>
.texto-titulo {
  font-size: 20px;
  color: #292b53;
  font-style:italic;
  text-align: left;
}

</style>