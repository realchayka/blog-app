/* eslint-disable indent */
const initialState = {
  data: [],
  loading: false,
  error: null,
  article: null,
}

const initialPostState = {
  blogs: [],
  error: null,
  loading: false,
}

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ARTICLES_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_ARTICLES_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_ARTICLES_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'FETCH_ONE_ARTICLE_REQUEST':
      return { ...state, loading: true, error: null, article: null }
    case 'FETCH_ONE_ARTICLE_SUCCESS':
      return { ...state, loading: false, article: action.payload }
    case 'FETCH_ONE_ARTICLE_FAILURE':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const postReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case 'FETCH_CREATE_POST_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_CREATE_POST_SUCCESSFUL':
      return { ...state, loading: false, blogs: [...state.blogs, action.payload] }
    case 'FETCH_CREATE_POST_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'EDIT_POST_REQUEST':
      return { ...state, loading: true, error: null }
    case 'EDIT_POST_SUCCESSFUL':
      return { ...state, loading: false, blogs: [...state.blogs, action.payload] }
    case 'EDIT_POST_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'DELETE_POST_REQUEST':
      return { ...state, loading: true, error: null }
    case 'DELETE_POST_SUCCESSFUL':
      return { ...state, loading: false, blogs: [...state.blogs, action.payload] }
    case 'DELETE_POST_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'LIKE_POST_REQUEST':
      return { ...state, loading: true, error: null }
    case 'LIKE_POST_SUCCESS':
      return { ...state, loading: false, blogs: [...state.blogs, action.payload] }
    case 'LIKE_POST_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'UNLIKE_POST_REQUEST':
      return { ...state, loading: true, error: null }
    case 'UNLIKE_POST_SUCCESS':
      return { ...state, loading: false, blogs: [...state.blogs, action.payload] }
    case 'UNLIKE_POST_FAILURE':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
