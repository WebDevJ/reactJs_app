'use strict'
const React          = require('react');

const auth           = require('../helpers/auth');
const Login          = require('./login');

const ReactRouter    = require('react-router');
const Router         = ReactRouter.Router;
const Redirect       = ReactRouter.Redirect;
const browserHistory = ReactRouter.browserHistory;
const Route          = ReactRouter.Route;
const Link           = ReactRouter.Link;


const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return (
      <div>
        <p>You have been logged out</p>
        <p><Link to="/communityevents">Sign in</Link></p>
      </div>
    )
  }
})

module.exports = Logout;
