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
const auth            = require('../helpers/auth');

const Nav = React.createClass({
  render() {
    return(
      <nav>
        <ul>
          <li><Link to="/communityevents">Community Events</Link></li>
          <li><Link to="/userevents">My Events</Link></li>
          <li><Link to="/logout">Log out</Link></li>
        </ul>
      </nav>

    )
  }
})

module.exports = Nav;
