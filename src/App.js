import {Switch, Route, Redirect, withRouter} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'
import Jobs from './Components/Jobs'
import JobItemDetails from './Components/JobItemDetails'

import './App.css'

// Replace your code here
const App = props => {
  const {history} = props
  const {location} = history
  const {pathname} = location
  console.log(pathname, 'history')
  // can also use key={window.location.pathname}
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute
        key={pathname}
        exact
        path="/jobs/:id"
        component={JobItemDetails}
      />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default withRouter(App)
