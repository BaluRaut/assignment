import React, { Component } from 'react';
import { connect } from 'react-redux';
class ProfilePage extends Component {
  render() {
    return (
      <h3> Profile Page :</h3>
    );
  }
}

function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ProfilePage);
