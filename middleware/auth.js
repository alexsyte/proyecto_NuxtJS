import { firebase } from '~/plugins/firebase'

// Comprueba en cada ruta si el usuario ha cambiado de estado (osea, si sigue logueado o no)
// Y en caso que no esté logueado, irá a la pantalla de login que ya teníamos anteriormente

export default function({ redirect }) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      return redirect('/')
    } else {
      console.log(user)
    }
  })
}

// Este middleware se utilizará en las páginas de admin y en el foro
