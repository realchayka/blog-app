import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import List from './components/List'
import ListItemFull from './components/ListItemFull'
import SignIn from './components/SignIn'
import Profile from './components/Profile'
import SignUp from './components/SignUp'
import { autoLogin } from './redux/user/userActions'
import NewArticle from './components/NewArticle'
import PrivateRoute from './components/PrivateRoute'
import ArticleEdit from './components/ArticleEdit'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.user.isAuth)

  useEffect(() => {
    dispatch(autoLogin())
  }, [auth])
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/articles" render={() => <List />} />
          <Route exact path="/articles/:slug" render={() => <ListItemFull />} />
          <PrivateRoute exact path="/articles/:slug/edit" component={ArticleEdit} isAuthenticated={auth} />
          <Route exact path="/sign-in" render={() => <SignIn />} />
          <Route exact path="/sign-up" render={() => <SignUp />} />
          <Route exact path="/profile" render={() => <Profile />} />
          <PrivateRoute exact path="/new-article" component={NewArticle} isAuthenticated={auth} />
          <Route exact path="/" render={() => <List />} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
