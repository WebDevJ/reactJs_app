'use strict'
const React = require('react');

const auth = require('../helpers/auth');

const Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props
      // this redirects to the login page
      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
    })
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="" type="email"/></label>
        <label><input ref="pass" placeholder="password" type="password"/></label><br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
})

module.exports = Login;
