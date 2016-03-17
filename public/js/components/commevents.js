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
const auth     = require('../helpers/auth');
const Nav      = require('./nav');
const Events   = require('./events');
const Search   = require('./search');
const Footer   = require('./footer');


const CommEvents = React.createClass({
  getInitialState : function() {
    return {
      me: ''
    }
  },
  seeMe : function(e) {
    e.preventDefault()

    $.ajax({
      url: 'users/me',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done((data) => {
      this.setState({me: data[0].email})
    })
  },

  render() {
    const token = auth.getToken()

    return (
      <div>
      <div><Nav /></div>
        <div>
          <h1>Dashboard</h1>
          <p>You made it!</p>
          <p>{token}</p>
          <p>{this.state.me}</p>
        <button onClick={this.seeMe}> see your info</button>
        </div>



        <div><Events /></div>

        <div><Search /></div>

        <div><Footer /></div>

      </div>
    )
  }
})

module.exports = CommEvents;
