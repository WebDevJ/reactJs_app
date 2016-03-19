const React           = require('react');

const SingleResult = React.createClass({
  handleClick(event) {
    event.preventDefault();
    this.props.onclick(this.props.index);
  },
  render() {
    return (
      <div>
        <h3>{this.props.resultdata.name}</h3>
        <p>{this.props.resultdata.time}</p>
        <p>{this.props.searchParam.category}</p>
      </div>

    )
  }
})

module.exports = SingleResult;
