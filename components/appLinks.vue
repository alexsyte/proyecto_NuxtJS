
<!--Este componente se implementa en el TheHeader.vue, aquí se nombran los distintos links que va a disponer nuestro header-->
<template>
    <ul class="nav-list">
        <li class="nav-item"><nuxt-link to="/lista">Lista</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/noticia">Noticias</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/guia">Guías</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/login">Foro</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/sugerencia">Sugerencias</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/admin/login">Log In</nuxt-link></li>
    </ul>
</template>

<style scoped>
    .nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .nav-item {
        margin: 0 10px;
    }
    .nav-item a {
        text-decoration: none;
        color: #fefefe;
    }
    .nav-item a:hover,
    .nav-item a:active{
        color: #b4b4b4;
    }

    @media (max-width: 767px) {
        .nav-list {
            display: block;
        }
        .nav-item{
            margin-top: 16px;
            margin-bottom: 16px;
        }
    }
    @media (min-width: 768px) {
        .nav-list {
            display: flex;
        }
    }
</style>