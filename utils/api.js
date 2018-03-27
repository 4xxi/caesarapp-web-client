import axios from 'axios'

export default {
  instance: axios.create(),
  get (url, request) {
    return this.instance.get(url, request)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  post (url, request) {
    return this.instance.post(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  patch (url, request) {
    return this.instance.patch(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  delete (url, request) {
    return this.instance.delete(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}
