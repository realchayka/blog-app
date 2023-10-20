/* eslint-disable no-useless-catch */
import axios from 'axios'

export default class BlogService {
  constructor() {
    this.url = 'https://blog.kata.academy/api'
  }

  async getArticles(offset) {
    let token = localStorage.getItem('token')
    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${this.url}/articles?limit=5&offset=${offset}`, config)

        return response.data
      } else {
        const response = await axios.get(`${this.url}/articles?limit=5&offset=${offset}`)

        return response.data
      }
    } catch (error) {
      throw error
    }
  }

  async getOneArticle(slug) {
    let token = localStorage.getItem('token')
    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${this.url}/articles/${slug}`, config)

        return response.data
      } else {
        const response = await axios.get(`${this.url}/articles/${slug}`)
        return response.data
      }
    } catch (error) {
      throw error
    }
  }

  async registerUser(username, email, password) {
    try {
      const user = {
        username,
        email,
        password,
      }
      const response = await axios.post(`${this.url}/users`, {
        user,
      })

      const token = response.data.user.token
      localStorage.setItem('token', token)

      return response.data
    } catch (error) {
      throw error
    }
  }

  async loginUser(email, password) {
    try {
      const user = {
        email,
        password,
      }
      const response = await axios.post(`${this.url}/users/login`, {
        user,
      })

      const token = response.data.user.token

      localStorage.setItem('token', token)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async autoLogin() {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${this.url}/user`, config)
        return response.data
      }
    } catch (error) {
      console.log('error')
    }
  }

  async updateUser(email, username, password, imageUrl) {
    const user = {
      email: `${email}`,
      username: `${username}`,
      password: `${password}`,
      image: `${imageUrl}`,
    }

    try {
      const token = localStorage.getItem('token')
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.put(`${this.url}/user`, { user }, config)
        console.log(response)
        return response
      }
    } catch (error) {
      console.log('Ошибка обновления пользователя')
    }
  }

  async createArticle(title, description, body, tagList) {
    const article = {
      title,
      description,
      body,
      tagList,
    }

    try {
      const token = localStorage.getItem('token')
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.post(`${this.url}/articles`, { article }, config)

        return response
      }
    } catch (error) {
      console.log('Ошибка создания поста')
    }
  }
  async updateArticle(title, description, body, slug, tagList) {
    const article = {
      title,
      description,
      body,
      tagList,
    }

    try {
      const token = localStorage.getItem('token')
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.put(`${this.url}/articles/${slug}`, { article }, config)

        return response
      }
    } catch (error) {
      console.log('Ошибка исправления поста')
    }
  }
  async deletePost(slug) {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.delete(`${this.url}/articles/${slug}`, config)
        console.log(response)
        return response
      }
    } catch (error) {
      console.log('Ошибка удаления поста')
    }
  }

  async likePost(slug) {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.post(`${this.url}/articles/${slug}/favorite`, null, config)
        console.log(response)
        return response
      }
    } catch (error) {
      console.log('Ошибка лайка поста')
    }
  }

  async unLikedPost(slug) {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.delete(`${this.url}/articles/${slug}/favorite`, config)
        console.log(response)
        return response
      }
    } catch (error) {
      console.log('Ошибка анлайка поста')
    }
  }
}
