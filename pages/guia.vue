<!--Ésta página contiene las distintas guías del juego a las cuales podemos hacer click-->
<template>
  <div class="bg-img">
    <audio class="musica" :src="require('@/static/intro-acnh.mp3')" controls></audio>
    <div class="container">
    <section class="section">
    <h1 class="title is-1">Guías sobre Animal Crossing</h1>
    <div class="container">
      <section class="section">
        <div>
          <TextoCard
            :id="texto.id"
            :titulo="texto.titulo"
            v-for="(texto, index) in filteredText" :key="index"
            class="textos-card1"
          />
        </div>
      </section>
    </div>
    </section>
    </div>
  </div>
</template>

<script>
// Importamos nuestro componente creado
import TextoCard from "~/components/TextoCard"
import { db } from '~/plugins/firebase'

export default {
    components: {
        TextoCard
    },
    data(){
        return{
            textos:[],
            ref: null,
        }
    },
    created() {
        // Verificar que nuestra db de firebase funciona correctamente
        console.log(db)
        // Nos traemos todos los textos (guías y noticias) de la BD
        const data = db.collection('texto').get()
        data
        .then((snapshot) => {
            snapshot.forEach((doc) => {
            const texto = {
                id: doc.id,
                ...doc.data()
            }
            this.textos.push(texto)
            })
        })
        .catch((error) => {
            console.log(error)
        })
    },
    computed:{
      // Filtramos todos los textos solo por los cuales sean de tipo guía, propiedad conmutada que utilizaros en el v-for más arriba
      filteredText: function(){
        return this.textos.filter((texto)=>{
            return texto.tipo.match("guía");
        })
      }
    }
}
</script>
<style>
.textos-card1 {
    margin: 20px auto;
    height: 100px;
    opacity: 0.8;
}
.bg-img {
  background-image: url(~@/static/956578.jpg);
  background-size:cover;
  background-repeat:  no-repeat;
  background-attachment: fixed;
  background-size:  cover;
  background-color: #999;
}
.musica{
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 10px;
}
</style>