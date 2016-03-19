const React  = require('react');
const moment = require('moment');

const SingleResult = React.createClass({
  handleAdd(event) {
    event.preventDefault();
    // console.log(this.props);
    this.props.onAddSubmit(this.props.index);
  },
  render() {
    // get the event location address detail - object in an object, some events don't have venues with addresses
    let address = '';
    let lon = '';
    let lat = '';
    if (this.props.resultdata.venue) {
      address = this.props.resultdata.venue.address_1;
      lon = this.props.resultdata.venue.lon;
      lat = this.props.resultdata.venue.lat;
    }

    // format the serial date into date format
    const time = this.props.resultdata.time;
    // time to be presented in the display
    const formatted = moment(time).format('dddd, MMMM Do YYYY, h:mm:ss A');
    // time to be inserted into the db
    const dbTime = moment(1458154800000).format();

    return (
      <div className="events">
        <h3>{this.props.resultdata.name}</h3>
        <p>{formatted}</p>
        <p>{this.props.searchParam.category}</p>
        <p>{address}</p>
        <p>{this.props.searchParam.city}</p>
        <a href={this.props.resultdata.event_url}>Check it out on Meetup!</a>
        <form className="add-event" ref="addForm" onSubmit={this.handleAdd}>
          <input type="hidden" ref="event_name" value={this.props.resultdata.name}/>
          <input type="hidden" ref="cat_meetup_id" value={this.props.searchParam.category}/>
          <input type="hidden" ref="event_time" value={dbTime}/>
          <input type="hidden" ref="address" value={address}/>
          <input type="hidden" ref="lon" value={lon}/>
          <input type="hidden" ref="lat" value={lat}/>
          <input type="hidden" ref="city" value={this.props.searchParam.city}/>
          <input type="hidden" ref="state" value={this.props.searchParam.state}/>
          <input type="hidden" ref="country" value={this.props.searchParam.country}/>
          <button refs="addbtn">Add Me!</button>
        </form>


      </div>

    )
  }
})

module.exports = SingleResult;
