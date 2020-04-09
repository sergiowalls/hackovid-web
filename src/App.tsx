import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { StoreContext } from 'storeon/react'
import '@ckeditor/ckeditor5-build-inline/build/translations/ca'

import { FocusStyleManager } from '@blueprintjs/core'

import { LoginPage } from './pages/LoginPage/LoginPage'
import { CreateClassPage } from './pages/CreateClassPage/CreateClassPage'
import { AppNavigation } from './lib/molecules/AppNavigation/AppNavigation'
import { HomePage } from './pages/HomePage/HomePage'
import { MyClassesPage } from './pages/MyClassesPage/MyClassesPage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'

import { AlertDisplay } from './lib/molecules/AlertDisplay/AlertDisplay'

import { store } from './store'

import './App.scss'

FocusStyleManager.onlyShowFocusOnTabs()

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <AppNavigation />

        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/classes/new">
            <CreateClassPage />
          </Route>
          <Route exact path="/classes">
            <MyClassesPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/404">
            <NotFoundPage />
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>

        <AlertDisplay />
      </Router>
    </StoreContext.Provider>
  )
}

export default App
