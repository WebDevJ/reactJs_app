const React           = require('react');

const SingleResult = React.createClass({
  handleClick(event) {
    event.preventDefault();
    this.props.onclick(this.props.index);
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
      <div>
        <h3>{this.props.resultdata.name}</h3>
        <p>{this.props.resultdata.time}</p>
        <p>{this.props.searchParam.category}</p>
        <p>{address}</p>
        <p>{lon}</p>
        <p>{lat}</p>
        <p>{this.props.searchParam.city}</p>
        <p>{this.props.searchParam.state}</p>
        <p>{this.props.searchParam.country}</p>
        <p>{this.props.resultdata.event_url}</p>
        <p></p>
      </div>

    )
  }
})

module.exports = SingleResult;
