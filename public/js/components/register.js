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

      this.context.router.replace('/login')
    })
  },

  render : function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="first" placeholder="firstname" required /></label>
        <label><input ref="last" placeholder="lastname" required /></label>
        <label><input ref="city" placeholder="city" required /></label>
        <label><input ref="email" placeholder="email" required type="email" /></label>
        <label><input ref="pass" type="password" placeholder="password" required /></label><br />
        <button type="submit">signup</button>
      </form>
    )
  }
})

module.exports = Register;
