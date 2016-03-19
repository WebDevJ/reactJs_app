const React           = require('react');

const SingleResult = React.createClass({
  handleClick(event) {
    event.preventDefault();
    this.props.onclick(this.props.index);
  },
  render() {
    return (

      <p onClick={this.handleClick}>{this.props.resultdata.name}</p>
    )
  }
})

module.exports = SingleResult;
