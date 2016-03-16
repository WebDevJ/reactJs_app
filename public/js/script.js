'use strict'
const React          = require('react');
const ReactDOM       = require('react-dom');
const $              = require('jquery');

const ReactRouter    = require('react-router');
const Router         = ReactRouter.Router;
const Route          = ReactRouter.Route;
const Link           = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

const auth           = require('./auth.js');
const Dashboard      = require('./components/dashboard.js');
const Login          = require('./components/login.js');
const Logout         = require('./components/logout.js');
const About          = require('./components/about.js');

const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link> (authenticated)</li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
})

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="about" component={About} />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('container'))
