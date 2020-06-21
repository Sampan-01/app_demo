import { GET_AUTH_LIST, LOG_OUT } from '@/store/ActionTypes'

const initialState = {
  authList: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AUTH_LIST: {
      return {
        ...state,
        authList: action.payload
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        authList: action.payload,
        redirect: '/'
      }
    }
    default: {
      return state
    }
  }
}
