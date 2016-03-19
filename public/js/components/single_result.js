const React           = require('react');

const SingleResult = React.createClass({
  handleAdd(event) {
    event.preventDefault();
    // console.log(this.props);
    this.props.onAddSubmit(this.props.index);
  },
  render() {
    let address = '';
    let lon = '';
    let lat = '';
    if (this.props.resultdata.venue) {
      address = this.props.resultdata.venue.address_1;
      lon = this.props.resultdata.venue.lon;
      lat = this.props.resultdata.venue.lat;
    }

    return (
      <div className="events">
        <h3>{this.props.resultdata.name}</h3>
        <p>{this.props.resultdata.time}</p>
        <p>{this.props.searchParam.category}</p>
        <p>{address}</p>
        <p>{lon}</p>
        <p>{lat}</p>
        <p>{this.props.searchParam.city}</p>
        <p>{this.props.searchParam.state}</p>
        <p>{this.props.searchParam.country}</p>
        <a href="this.props.resultdata.event_url">Check it out on Meetup!</a>
        <form className="add-event" ref="addForm" onSubmit={this.handleAdd}>
          <input type="hidden" value={this.props.resultdata.name}/>
          <button refs="addbtn">Add Me!</button>
        </form>


      </div>

    )
  }
})

module.exports = SingleResult;
