import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

import { nymbus, localFunctionUrl } from '~/secret/firebaseConfig'

export default async ({ app, env, store }, inject) => {
  if(!firebase.apps.length) {
    firebase.initializeApp(nymbus)
  }
  const functions = firebase.app().functions('asia-east2')
  if(location.hostname === 'localhost') {
    functions.useFunctionsEmulator(localFunctionUrl)
  }

  inject('firebase', firebase)
  inject('auth', firebase.auth)
  inject('db', firebase.firestore())
  inject('authUser', {
    list: functions.httpsCallable('getAuthList'),
    get: functions.httpsCallable('getAuth'),
    add: functions.httpsCallable('addAuth'),
    update: functions.httpsCallable('editAuth'),
    delete: functions.httpsCallable('deleteAuth'),
  })
  inject('battery', {
    logs: functions.httpsCallable('getBatteryLogs'),
    getDistanceTraveled: functions.httpsCallable('getDistanceTraveled'),
  })
  inject('vehicleList', {
    get: functions.httpsCallable('getVehicleList'),
  })
}
