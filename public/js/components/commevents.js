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
  getInitialState() {
    return {
      me: ''
    }
  },

  componentDidMount(){
    $.ajax({
      url: 'users/me',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done((data) => {
      this.setState({me: data.first})
    })
  },

  render() {
    const token = auth.getToken()

    return (
      <div className="dashboard">
      <div><p>{this.state.me}</p></div>
      <div><Nav /></div>
        <div className="content">
          <h1>Community Events</h1>
        </div>

          <div className="events"><Events /></div>

        <div className="searchresults"><Search /></div>
        <div><Footer /></div>

      </div>
    )
  }
})

module.exports = CommEvents;
