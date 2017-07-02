import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { homeReducer } from './reducers/reducers';
import LoginPage from './components/pages/LoginPage';
import Dashboard from './components/pages/Dashboard';
import ProfilePage from './components/pages/ProfilePage';
import TeamPage from './components/pages/TeamPage';
import ContactPage from './components/pages/ContactPage';



import App from './components/App';
import '../css/main.css';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);
function checkAuth(nextState, replaceState) {
  let { loggedIn } = store.getState();
  if (nextState.location.pathname !== '/dashboard') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  } else {
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  }
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={LoginPage} />
        <Route onEnter={checkAuth}>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/aboutus/profile" component={ProfilePage} />
          <Route path="/aboutus/team" component={TeamPage} />
          <Route path="/aboutus/contact" component={ContactPage} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
