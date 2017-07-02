import React, { Component } from 'react';
import { connect } from 'react-redux';
class TeamPage extends Component {
  render() {
    return (
      <h3> Team Page :</h3>
    );
  }
}

function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(TeamPage);
