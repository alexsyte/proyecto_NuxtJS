<template>
  <!--Componente sobre las respuestas de los posts que va a ser implementado en la carpeta de pages-->
  <div class="card" style="width:1500px;">
    <div class="card-content">
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
export default {
  props: {
    texto: {
        type: String,
        default: ''
    },
    userid: { 
        type: String,
        default: ''
    },
    date: { 

    }
  },
  created() { 
    
  }
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