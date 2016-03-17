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
const auth          = require('../helpers/auth');
const SearchResults = require('./search_results');

const Search = React.createClass({
  render() {
    return (
      <div>
        <p>Test Search</p>
        <SearchResults />
      </div>
    )
  }
})

module.exports = Search;
