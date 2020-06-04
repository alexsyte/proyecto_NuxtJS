<template>
    <header>
        <!--Elemento clave en mi aplicación web ya que implementa una barra superior con las diferentes secciones de la página web-->
        <div class="brand-name">
            <nuxt-link class="nuxtlink" to="/">Inicio</nuxt-link>
        </div>

        <!--Implemento los distintos links que vamos a disponer-->
        <div class="app-links">
            <app-links></app-links>
        </div>
        
    </header>
    
</template>

<script>
    import AppLinks from '~/components/appLinks'
    export default {
        components: { AppLinks }
    }
</script>

<style scoped>
    header{
        display: grid;
        grid-template: 60px / auto 1fr;
        align-items: center;
        background-color: rgb(32, 32, 32);
    }

    .app-links{
        justify-self: end;
    }

    .brand-name {
        margin: 0 10px;
        font-size: 1.3rem;
    }

    .brand-name .nuxtlink {
        text-decoration: none;
        color: white;
    }

    .brand-name a:hover {
        color: #b4b4b4;
    }
    
    @media (max-width: 767px) {
        header{
            padding: 0 16px;
        }
        header:nth-child{
            justify-self: end !important;
        }
        .app-links {
            display: none;
        }
    }
    @media (min-width: 768px) {
        header{
            padding: 0 64px;
        }
        .app-links {
            display: block;
        }

    }
</style>