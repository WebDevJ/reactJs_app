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
        this.context.router.replace('/dashboard')
      }
    })
  },

  render() {
    return (
      <div className="hp-background">
        <div className="content">
          <div className="hp-content">
          <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label><input size="50" ref="email" placeholder="email" defaultValue="" type="email"/></label>
          <label><input size="50" ref="pass" placeholder="password" type="password"/></label><br />
          <button type="submit">login</button>
          {this.state.error && (
            <p>Incorrect username and password.</p>
          )}
          </form>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Login;
