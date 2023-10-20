import { combineReducers } from 'redux'

import userReducer from './user/userReducer'
import { articlesReducer } from './articles/articlesReducer'

const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
})

export default rootReducer
