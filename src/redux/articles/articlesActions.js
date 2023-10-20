import BlogService from '../../services/blog-service'
//  View all posts
export const fetchArticlesRequest = () => ({
  type: 'FETCH_ARTICLES_REQUEST',
})

export const fetchArticlesSuccess = (articles) => ({
  type: 'FETCH_ARTICLES_SUCCESS',
  payload: articles,
})

export const fetchArticlesFailure = (error) => ({
  type: 'FETCH_ARTICLES_FAILURE',
  payload: error,
})
// View one post
export const fetchOneArticleRequest = () => ({
  type: 'FETCH_ONE_ARTICLE_REQUEST',
})

export const fetchOneArticleSuccess = (article) => ({
  type: 'FETCH_ONE_ARTICLE_SUCCESS',
  payload: article,
})

export const fetchOneArticleFailure = (error) => ({
  type: 'FETCH_ONE_ARTICLE_FAILURE',
  payload: error,
})
//  Create post
export const createPostRequest = () => ({
  type: 'FETCH_CREATE_POST_REQUEST',
})
export const createPostSuccessful = (post) => ({
  type: 'FETCH_CREATE_POST_SUCCESSFUL',
  payload: post,
})
export const createPostError = (error) => ({
  type: 'FETCH_CREATE_POST_FAILURE',
  payload: error,
})
//  Edit post
export const editPostRequest = () => ({
  type: 'EDIT_POST_REQUEST',
})
export const editPostSuccessful = (post) => ({
  type: 'EDIT_POST_SUCCESSFUL',
  payload: post,
})
export const editPostFailure = (error) => ({
  type: 'EDIT_POST_SUCCESSFUL',
  payload: error,
})
// Delete Post
export const deletePostRequest = () => ({
  type: 'DELETE_POST_REQUEST',
})

export const deletePostSuccessful = (slug) => ({
  type: 'DELETE_POST_SUCCESSFUL',
  payload: slug,
})

export const deletePostFailure = (error) => ({
  type: 'DELETE_POST_FAILURE',
  payload: error,
})
// Like Post
export const likePostRequest = () => ({
  type: 'LIKE_POST_REQUEST',
})
export const likePostSuccessful = (slug) => ({
  type: 'LIKE_POST_SUCCESSFUL',
  payload: slug,
})
export const likePostFailure = (error) => ({
  type: 'LIKE_POST_FAILURE',
  payload: error,
})
// Unlike Post
export const unLikePostRequest = () => ({
  type: 'UNLIKE_POST_REQUEST',
})
export const unLikePostSuccessful = (slug) => ({
  type: 'UNLIKE_POST_SUCCESSFUL',
  payload: slug,
})
export const unLikePostFailure = (error) => ({
  type: 'UNLIKE_POST_FAILURE',
  payload: error,
})

const service = new BlogService()
// View all posts
export const fetchArticles = (page = 1) => {
  return async (dispatch) => {
    dispatch(fetchArticlesRequest())
    try {
      const offset = (page - 1) * 5
      const response = await service.getArticles(offset)
      dispatch(fetchArticlesSuccess(response))
    } catch (error) {
      dispatch(fetchArticlesFailure(error.message))
    }
  }
}
// View one post
export const fetchOneArticle = (slug) => {
  return async (dispatch) => {
    dispatch(fetchOneArticleRequest())
    try {
      const response = await service.getOneArticle(slug)
      dispatch(fetchOneArticleSuccess(response))
    } catch (error) {
      dispatch(fetchOneArticleFailure(error.message))
    }
  }
}
// Create post
export const createPost = (title, description, body, tags) => {
  return async (dispatch) => {
    dispatch(createPostRequest())
    try {
      const response = await service.createArticle(title, description, body, tags)
      console.log(response)
      dispatch(createPostSuccessful(response.data))
    } catch (error) {
      dispatch(createPostError(error.message))
    }
  }
}
// Edit post
export const editPost = (title, description, body, slug, tagList) => {
  return async (dispatch) => {
    dispatch(editPostRequest())
    try {
      const response = await service.updateArticle(title, description, body, slug, tagList)
      dispatch(editPostSuccessful(response.data))
    } catch (error) {
      dispatch(editPostFailure(error.message))
    }
  }
}
//  Delete post
export const deletePost = (slug) => {
  return async (dispatch) => {
    dispatch(deletePostRequest())
    try {
      const response = await service.deletePost(slug)
      dispatch(deletePostSuccessful(response.data))
    } catch (error) {
      dispatch(deletePostFailure(error.message))
    }
  }
}
//  Like post
export const likePost = (slug) => {
  return async (dispatch) => {
    dispatch(likePostRequest())
    try {
      const response = await service.likePost(slug)
      dispatch(likePostSuccessful(response))
    } catch (error) {
      dispatch(likePostFailure(error.message))
    }
  }
}

// Unlike post
export const unLikePost = (slug) => {
  return async (dispatch) => {
    dispatch(unLikePostRequest())
    try {
      const response = await service.unLikedPost(slug)
      dispatch(unLikePostSuccessful(response))
    } catch (error) {
      dispatch(unLikePostFailure(error.message))
    }
  }
}
