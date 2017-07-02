import React, { Component } from 'react';
import { connect } from 'react-redux';
class ContactPage extends Component {
  render() {
    return (
      <h3> Contact Page :</h3>
    );
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ContactPage);
