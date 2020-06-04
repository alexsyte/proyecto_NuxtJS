import { db } from './plugins/firebase'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Animal Crossing'/*process.env.npm_package_name || ''*/,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/bulma',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  ** Nos sirve para poner utilizar audio en nuestra aplicación web
  */
  build: {
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  // A la hora de generar los archivos HTML para subirlo a un servidor hosting, debemos generar correctamente las distintas rutas a las que puede acceder el usuario
  generate: {
    async routes () {
      let routesList = []
      try {
        const data = await db.collection('lista').get()
        const docs = await data.docs
        docs.map(doc => {
          const category = '/category'
          routesList.push(category)
          const route1 = '/category' + '/' + doc.data().tipo
          routesList.push(route1)
        })
        const data2 = await db.collection('texto').get()
        const docs2 = await data2.docs
        docs2.map(doc => {
          const titulo = '/titulo'
          routesList.push(titulo)
          const route2 = '/titulo' + '/' + doc.data().id
          routesList.push(route2)
        })
        const data3 = await db.collection('post').get()
        const docs3 = await data3.docs
        docs3.map(doc => {
          const route6 = '/categoryForum'
          routesList.push(route6)
          const route3 = '/categoryForum' + '/' + doc.data().tipo
          routesList.push(route3)
          const route7 = '/nuevaPregunta'
          routesList.push(route7)
          const route4 = '/nuevaPregunta' + '/' + doc.data().tipo
          routesList.push(route4)
          const route8 = '/pregunta'
          routesList.push(route8)
          const route5 = '/pregunta' + '/' + doc.data().id
          routesList.push(route5)
        })
        return routesList
      } catch (error) {
        console.log(error)
        return []
      }
    }
  }
  
}
