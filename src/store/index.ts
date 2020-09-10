import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import user from './reducers/user'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(combineReducers({
  user
}), composeWithDevTools(applyMiddleware(thunk)))

export default store