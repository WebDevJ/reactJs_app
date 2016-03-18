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
const SingleResult  = require('./dummy/single_result.js')

const Search = React.createClass({
  getInitialState() {
    return {
      results: []
    }
  },
  handleSubmit: function(evt){
    evt.preventDefault();
    // make an object of the search query for the API
    let searchTerms = {
      'text': this.refs.text.value,
      'category': this.refs.category.value,
      'city': 'New York',
      'state': 'NY',
      'country': 'US',
      'photo-host': 'public',
      'time': ',2w'
    };

    // need to do a get to the search route with the search object as a query string
    $.get('/events/search', searchTerms)
      .done((data) => {
        this.setState({results: data});
      })


  // clear the form
  this.refs.searchForm.reset();
  },
  displayResults(currentState) {
    return currentState.map(el=>
        <SingleResult key={el.id} index={el.id} resultdata={el} onclick={this.testClick} />
    )


  },

  testClick(idx){
    console.log(idx)
  },

  render() {
    return (
      <div>
      <form className="search" ref="searchForm" onSubmit={this.handleSubmit}>
        <input ref="text" type="text" size="50" placeholder="enter a topic to search for"/>
        <select ref="category">
           <option>select a category</option>
           <option value="34">Tech</option>
           <option value="1">Art and Culture</option>
           <option value="4">Community and Environment</option>
           <option value="10">Food and Drink</option>
           <option value="15">Hobbies and Crafts</option>
           <option value="21">Music</option>
           <option value="23">Outdoors and Adventure</option>
        </select>
        <button refs="searchbtn">Submit</button>
      </form>
        <section id="search-results">
          {/*<SearchResults />*/}
          {this.displayResults(this.state.results)}
        </section>
      </div>
    )
  }
})

module.exports = Search;
