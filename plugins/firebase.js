import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { nymbus } from '~/secret/firebaseConfig'

export default ({ app, env, store }, inject) => {
  if(!firebase.apps.length) {
    firebase.initializeApp(nymbus)
  }
  inject('firebase', firebase)
  inject('auth', firebase.auth)
  inject('db', firebase.firestore())
}
