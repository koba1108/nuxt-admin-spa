import axios from 'axios'
import { baseUrl } from '~/secret/vehicleApiConfig'

export default ({ app }, inject) => {
  const api = axios.create({ baseURL: baseUrl })
  inject('api', api)
}
