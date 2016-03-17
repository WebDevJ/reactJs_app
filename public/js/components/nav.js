'use strict'
const React           = require('react');
const ReactDOM        = require('react-dom');

// react routing and links
const ReactRouter     = require('react-router');
const Router          = ReactRouter.Router;
const browserHistory  = ReactRouter.browserHistory;
const Route           = ReactRouter.Route;
const Link            = ReactRouter.Link;

const $               = require('jquery');

// routes to helpers go here
const auth       = require('../helpers/auth');

const Nav = React.createClass({
  render() {
    return(
      <div>This is the nav
      <ul>
      <li><Link to="/communityevents">Community Events</Link></li>
      <li><Link to="/userevents">My Events</Link></li>
      </ul>
      </div>

    )
  }
})

module.exports = Nav;
