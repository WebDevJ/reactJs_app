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
      <div className="hp-background">
        <div className="content">
          <div className="hp-content">
            <p>You have been logged out</p>
            <p><Link to="/login">Login</Link></p>
          </div>
        </div>
        </div>
      </div>
    )
  }
})

module.exports = Logout;
