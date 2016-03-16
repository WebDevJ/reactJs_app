'use strict'
const React = require('react');

const auth = require('../helpers/auth');

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

module.exports = Logout;
