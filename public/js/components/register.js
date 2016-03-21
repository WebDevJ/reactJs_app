'use strict'
const React          = require('react');
const ReactDOM       = require('react-dom');

const ReactRouter    = require('react-router');
const Router         = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;
const Route          = ReactRouter.Route;
const Link           = ReactRouter.Link;

const $              = require('jquery');

const auth           = require('../helpers/auth');

const Register = React.createClass({

  contextTypes : {
    router: React.PropTypes.object.isRequired
  },

  handleSubmit : function(event) {
    event.preventDefault()

    const first = this.refs.first.value
    const last = this.refs.last.value
    const city = this.refs.city.value
    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.signup(first, last, city, email, pass, (thing) => {

      const { location } = this.props

      this.context.router.replace('/dashboard')
    })
  },

  render : function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input size="50" ref="first" type="text" placeholder="firstname" required /></label>
        <label><input size="50" ref="last" type="text" placeholder="lastname" required /></label>
        <label><input size="50" ref="city" type="text" placeholder="city" required /></label>
        <label><input size="50" ref="email" type="email" placeholder="email" required /></label>
        <label><input size="50" ref="pass" type="password" placeholder="password" required /></label><br />
        <button type="submit">signup</button>
      </form>
    )
  }
})

module.exports = Register;
