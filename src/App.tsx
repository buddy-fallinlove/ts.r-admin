import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { authRoutes, noAuthRoutes } from './router'
import { RouterItem } from './types'
import Base from './page/base/base'

const App: FC = () => {
  return (
    <Router>
      <Switch>
        {noAuthRoutes.map((route: RouterItem, index: number) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props: RouteComponentProps) => {
                document.title = route.title
                return <route.component {...props} />
              }}
            />
          )
        })}
        <Base>
          {authRoutes.map((route: RouterItem, index: number) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps) => {
                  document.title = route.title
                  let user = localStorage.getItem('adminUser')
                  if (!user) {
                    return (
                      <Redirect to='/login' />
                    )
                  }
                  return <route.component {...props} />
                }}
              />
            )
          })}
        </Base>
      </Switch>
    </Router>
  )
}

export default App
