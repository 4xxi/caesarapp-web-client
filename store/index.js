import Vuex from 'vuex'
import api from '../utils/api.js'
import action from '../utils/action.js'
import sjcl from 'sjcl'

const createStore = () => {
  return new Vuex.Store({
    state: {
      privateMode: false,
      requestFailed: false,
      throwFiles: false,
      throwFilesCounter: 0,
      requestInProgress: false,
      encryptedResult: {},
      message: {}
    },
    actions: {
      createMessage ({ commit }, params) {
        commit(action.REQUEST_IN_PROGRESS)
        return api.post(process.env.baseApiUrl + `/api/messages`, params)
          .then((response) => commit(action.CREATED_MESSAGE, response.data))
          .catch((error) => commit(action.API_FAILURE, error))
      },
      createParanoidMessage ({ commit }, params) {
        let promise = new Promise((resolve, reject) => {
          try {
            commit(action.CREATED_PARANOID_MESSAGE, params.encryptedMessage)
            resolve()
          } catch (e) {
            reject(e)
          }
        })
        return promise
      },
      encryptMessage ({ commit }, data) {
        return new Promise((resolve, reject) => {
          let encryptedMessage = {
            'encryptedMessage': btoa(sjcl.encrypt(data['password'], JSON.stringify({
              'secretMessage': data['secretMessage'],
              'files': data['files'],
            })).toString()),
            'minutesLimit': data['minutesLimit']['value'],
            'queriesLimit': data['queriesLimit']['value'],
          }
          resolve(encryptedMessage)
        })
      },
      readMessage ({ commit }, id) {
        return api.get(process.env.baseApiUrl + `/api/messages/` + id)
          .then((response) => commit(action.GET_MESSAGE, response))
          .catch((error) => commit(action.API_FAILURE, error))
      },
      applyPassword ({ commit }, password) {
        commit(action.APPLY_PASSWORD, password)
      },
      toggleMode ({ commit }, state) {
        commit(action.TOGGLE_MODE, state)
      },
      decrypted ({ commit }, data) {
        commit(action.DECRYPTED, data)
      },
    },
    mutations: {
      REQUEST_IN_PROGRESS (state) {
        state.requestInProgress = true
      },
      REQUEST_COMPLETE (state) {
        state.requestInProgress = false
      },
      CREATED_PARANOID_MESSAGE (state, data) {
        state.encryptedResult.data = data
      },
      CREATED_MESSAGE (state, data) {
        state.requestFailed = false
        state.requestInProgress = false
        state.encryptedResult.id = data.id
      },
      APPLY_PASSWORD (state, password) {
        state.encryptedResult.password = password
      },
      API_FAILURE (state) {
        state.requestFailed = true
        state.requestInProgress = false
      },
      TOGGLE_MODE (state) {
        state.privateMode = !state.privateMode
      },
      THROW_FILES (state, throwing) {
        if (throwing) {
          state.throwFilesCounter++
        } else {
          state.throwFilesCounter--
        }

        if (!throwing && state.throwFilesCounter === 0) {
          state.throwFiles = throwing
        }
      },
      GET_MESSAGE (state, data) {
        state.requestFailed = false
        state.requestInProgress = false
        state.message = data
      },
      DECRYPTED (state, data) {
        state.message = data
      },
    },
  })
}

export default createStore
