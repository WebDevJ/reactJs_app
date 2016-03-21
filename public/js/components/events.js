'use strict'
const React          = require('react');

// routes to helpers go here
const SingleEvent    = require('./singleevent');

const Events = React.createClass({

  handleAdd(index) {
    // console.log(index);
    this.props.addMyEvent(index);

  },

  handleDelete(index) {
    this.props.deleteMyEvent(index);
  },

  showCommEvents(key) {
    return (
      <SingleEvent key={key} index={key} details={this.props.events[key]} handleAdd={this.handleAdd} handleDelete={this.handleDelete} />
    )
  },

  render() {
    return (
      <div>
        <ul className="event-list">
          <li>{Object.keys(this.props.events)
          .map(this.showCommEvents)}</li>
          </ul>
      </div>
    )
  }
})

module.exports = Events;
