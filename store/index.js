import Vuex from 'vuex'
import limits from '../config/limits'
import api from '../utils/api.js'
import action from '../utils/action.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      limits: limits,
      privateMode: false,
      requestFailed: false,
      throwFiles: false,
      throwFilesCounter: 0,
      requestInProgress: false,
      encryptedResult: {},
      message: {}
    },
    getters: {
      files: (state, getters) => {
        return state.message.files || {}
      }
    },
    actions: {
      createMessage ({ commit }, params) {
        return api.post(this.$env.BASE_API_URL + `/api/messages`, params)
          .then((response) => commit(action.CREATED_MESSAGE, response.data))
          .catch((error) => commit(action.API_FAILURE, error))
      },
      createParanoidMessage ({ commit }, params) {
        return new Promise((resolve, reject) => {
          try {
            commit(action.CREATED_PARANOID_MESSAGE, params.encryptedMessage)
            resolve()
          } catch (e) {
            reject(e)
          }
        })
      },
      readMessage ({ commit }, id) {
        return new Promise((resolve, reject) => {
          api.get(this.$env.BASE_API_URL + `/api/messages/` + id)
            .then((response) => {
              commit(action.GET_MESSAGE, response)
              resolve(response)
            })
            .catch((error) => {
              reject(error)
            })
        })
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
      REQUEST_IN_PROGRESS ({ commit }, inProgress) {
        commit(action.REQUEST_IN_PROGRESS, inProgress)
      }
    },
    mutations: {
      REQUEST_IN_PROGRESS (state, inProgress) {
        state.requestInProgress = inProgress
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
      ERROR_NOT_FOUND (state) {
        state.requestFailed = true
        state.requestInProgress = false
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
        console.log(data)
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
