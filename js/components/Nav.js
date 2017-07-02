import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from '../actions/actions';
import LoadingButton from './LoadingButton';

class Nav extends Component {
  render() {
    const navButtons = this.props.loggedIn ? (
    <div className="nav">
	    <div className="nav__wrapper">
        <div>
          <Link to="/aboutus/profile" className="btn btn--dash btn--nav">profile</Link>
          <Link to="/aboutus/team" className="btn btn--dash btn--nav">Team</Link>
          <Link to="/aboutus/contact" className="btn btn--dash btn--nav">Contact</Link>

                    {this.props.currentlySending ? (
                      <LoadingButton className="btn--nav" />
                    ) : (
                      <a href="#" className="btn btn--login btn--nav" onClick={::this._logout}>Logout</a>
                    )}
        </div>
		</div>
		</div>
      ) : (
        <div>
        </div>
      );

    return(
	<div>
          { navButtons }
		  </div>

    );
  }

  _logout() {
    this.props.dispatch(logout());
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  currentlySending: React.PropTypes.bool.isRequired
}

export default Nav;
