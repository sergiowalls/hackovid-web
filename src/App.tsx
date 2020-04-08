import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { StoreContext } from 'storeon/react'

import { LandingPage } from './pages/LandingPage/LandingPage'
import { LoginPage } from './pages/LoginPage/LoginPage'

import { store } from './store'

import '@ckeditor/ckeditor5-build-inline/build/translations/ca'

import './App.scss'
import { CreateClassPage } from './pages/CreateClassPage/CreateClassPage'

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/classes/new">
            <CreateClassPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route>
            <div>Not found :(</div>
          </Route>
        </Switch>
      </Router>
    </StoreContext.Provider>
  )
}

export default App
