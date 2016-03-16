'use strict'
const React          = require('react');
const ReactDOM       = require('react-dom');
const $              = require('jquery');

const auth           = require('../auth.js');
const Logout         = require('./logout.js');

const ReactRouter    = require('react-router');
const Router         = ReactRouter.Router;
const Route          = ReactRouter.Route;
const Link           = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;


const Dashboard = React.createClass({

   seeMe(){
     $.ajax({
        url: 'users/me',
        beforeSend: function( xhr ) {
          xhr.setRequestHeader("Authorization", auth.getToken() );
        }
      }).done((data) => {
        this.setState({me: data.agent.email})
      })
    },

  render() {
    const token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

module.exports = Dashboard;
