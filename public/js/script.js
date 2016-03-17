'use strict'
const React          = require('react');
const ReactDOM       = require('react-dom');

// react routing and links
const ReactRouter    = require('react-router');
const Router         = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;
const Route          = ReactRouter.Route;
const Link           = ReactRouter.Link;

const $              = require('jquery');

// routes to helpers go here
const auth           = require('./helpers/auth');
// routes to components go here
const Login          = require('./components/login');
const Logout         = require('./components/logout');
const HomePage       = require('./components/homepage');
const CommEvents     = require('./components/commevents');
const UserEvents     = require('./components/userevents');
const Register       = require('./components/register');
const Footer         = require('./components/footer');

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
              <Link to="/communityevents">Sign in</Link>
            )}
          </li>
        {!this.state.loggedIn && <li><Link to="/signup">Sign Up</Link></li>}

        </ul>
        {this.props.children || <HomePage />}

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

const NotFound = React.createClass({
  render(){
    return (
      <h1>404 Not Found</h1>
    )
  }
})

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="signup" component={Register} />
      <Route path="communityevents" component={CommEvents} onEnter={requireAuth} />
      <Route path="userevents" component={UserEvents} onEnter={requireAuth} />
    </Route>
    {/* 404 */}
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'))
