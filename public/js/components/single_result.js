const React  = require('react');
const moment = require('moment');

const SingleResult = React.createClass({
  handleAdd(event) {
    event.preventDefault();
    // create an object to store the new event to be added
    let newEvent = {
      event_name: this.refs.event_name.value,
      cat_meetup_id: this.refs.cat_meetup_id.value,
      event_time: this.refs.event_time.value,
      address: this.refs.address.value,
      lon: this.refs.lon.value,
      lat: this.refs.lat.value,
      city: this.refs.city.value,
      state: this.refs.state.value,
      country: this.refs.country.value,
      event_url: this.refs.event_url.value
    };
    this.props.onAddSubmit(newEvent);
  },
  render() {
    // get the event location address detail - object in an object, some events don't have venues with addresses
    let address = '';
    let lon = 0;
    let lat = 0;
    let city = '';
    if (this.props.resultdata.venue) {
      address = this.props.resultdata.venue.address_1;
      lon = this.props.resultdata.venue.lon;
      lat = this.props.resultdata.venue.lat;
      city = this.props.searchParam.city;
    }

    // format the serial date into date format
    const time = this.props.resultdata.time;
    // time to be presented in the display
    const formatted = moment(time).format('dddd, MMMM Do YYYY, h:mm:ss A');
    // time to be inserted into the db
    const dbTime = moment(time).format();

    return (
      <div className="events">
        <h3>{this.props.resultdata.name}</h3>
        <p>{formatted}</p>
        <p>{address}</p>
        <p>{city}</p>
        <a href={this.props.resultdata.event_url}>Check it out on Meetup!</a>
        {/* form with hidden values to insert new record into the db */}
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
          <input type="hidden" ref="event_url" value={this.props.resultdata.event_url}/>
          <button ref="addbtn">Add Me!</button>
        </form>
      </div>

    ) // end of return
  } // end of render
})

module.exports = SingleResult;
