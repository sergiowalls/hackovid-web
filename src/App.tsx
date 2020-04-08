import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { StoreContext } from 'storeon/react'
import '@ckeditor/ckeditor5-build-inline/build/translations/ca'

import { FocusStyleManager } from '@blueprintjs/core'

import { LoginPage } from './pages/LoginPage/LoginPage'
import { CreateClassPage } from './pages/CreateClassPage/CreateClassPage'
import { AppNavigation } from './lib/molecules/AppNavigation/AppNavigation'
import { HomePage } from './pages/HomePage/HomePage'

import { store } from './store'

import './App.scss'
import { MyClassesPage } from './pages/MyClassesPage/MyClassesPage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'

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
          <Route exact path="/classes/new">
            <CreateClassPage />
          </Route>
          <Route exact path="/classes">
            <MyClassesPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </StoreContext.Provider>
  )
}

export default App
