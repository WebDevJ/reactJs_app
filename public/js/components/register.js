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

const Register = React.createClass({

  contextTypes : {
    router: React.PropTypes.object.isRequired
  },

  handleSubmit : function(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.signup(email, pass, (thing) => {
      // dunnooo some kind of es7 deconstruction?
      const { location } = this.props

      this.context.router.replace('/login')
    })
  },

  render : function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" /></label>
        <label><input ref="pass" placeholder="password" /></label><br />
        <button type="submit">signup</button>
      </form>
    )
  }
})

module.exports = Register;
