import Vue from 'vue'
import { nymbus } from '~/secret/firebaseConfig'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: nymbus.apiKey,
    libraries: 'places',
    region: 'JP',
    language: 'ja'
  }
})
