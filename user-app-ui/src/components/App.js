import React from 'react';
import logo from '../logo.svg';
import '../index.css';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {startGetLoggedInUserAction} from '../actions/userAction';
import Login from '../components/Login';
import Register from '../components/Register';
import ProtectRoute from './ProtectRoute';
import Home from '../components/Home';
import { setAuthenticationStatusTrueAction, setAuthenticationStatusFalseAction } from '../actions/authenticationAction';
import setTimeoutForLogout from '../helpers/setTimeoutForLogout';

class App extends React.Component {
  componentDidMount(){
    if(localStorage.getItem('x-auth')){
      //if page refreshed set time out from current time again for logging out
      setTimeoutForLogout(this.logout);
      this.props.dispatch(startGetLoggedInUserAction());
      this.props.dispatch(setAuthenticationStatusTrueAction());
      this.props.history.push('/home');
    }
  }

  logout = () => {
    alert('You will now be logged out');
    this.props.dispatch(setAuthenticationStatusFalseAction());
  }

  render() {
   
   console.log(this.props.authenticated);
    return (
      <div className="full-container">
        { this.props.authenticated ? <div className="logout" onClick={this.logout}>Logout</div> : ''}
        <Route path="/login" render={(props) => <Login {...props} logout={this.logout} />} />
        <Route path="/signup" component={Register} />
        <ProtectRoute path="/home" authenticated={this.props.authenticated} component={Home} />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.authenticated,
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
