'use strict'
const React           = require('react');

// routes to components
const auth          = require('../helpers/auth');
const SearchResults = require('./search_results');
const SingleResult  = require('./single_result.js')

const Search = React.createClass({
  getInitialState() {
    return {
      results: [],
      searchTerms: {}
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
        this.setState({results: data, searchTerms: searchTerms});
      })
  // clear the form
  this.refs.searchForm.reset();
  },
  displayResults(currentResults, currentSearch) {
    return currentResults.map(el=>
        <SingleResult key={el.id} index={el.id} resultdata={el} searchParam={currentSearch} onAddSubmit={this.handleAddSubmit} />
    )
  },

  handleAddSubmit(idx){
    console.log(idx)
  },

  render() {
    return (
      <div>
      <form className="search" ref="searchForm" onSubmit={this.handleSubmit}>
        <input ref="text" type="text" size="50" placeholder="enter a topic to search for"/>
        <select ref="category">
           <option value="">select a category</option>
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
          {this.displayResults(this.state.results, this.state.searchTerms)}
        </section>
      </div>
    )
  }
})

module.exports = Search;
