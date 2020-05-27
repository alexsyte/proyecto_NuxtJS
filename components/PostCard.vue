<template>
  <div class="card" style="width:1500px;">
    <div class="card-content">
        <div>
          <p class="texto-titulo">
            <a v-bind:href="'../pregunta' + '/' + id">{{ titulo }}</a>
          </p>
        </div>
      <div>
          <p class="texto-texto">
            {{ texto }}
          </p>
      </div>
      <div>
          <p class="texto-user">
            Escrito por: {{ userid }}
          </p>
      </div>
      <div>
          <p class="texto-date">
            Publicado el: {{ date }}
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import { firebase } from '~/plugins/firebase'

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
    userid: { 
        type: String,
        default: ''
    },
    date: { 

    },
    tipo:{
        type: String,
        default: ''
    },
    id:{
        type: String,
        default: ''
    }
  },
}
</script>

<style scoped>
.texto-titulo {
  font-size: 20px;
  color: #0f0f16;
  font-style:italic;
  text-align: left;
}
.texto-user{
  font-style:italic;
  color: #4d4d81;
}
.texto-date{
  font-style:italic;
  color: #8e8e91;
}
</style>