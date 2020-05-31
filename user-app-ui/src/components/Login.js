import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAuthenticationStatusTrueAction} from '../actions/authenticationAction';
import {setLoggedInUserAction} from '../actions/userAction';
import setTimeoutForLogout from '../helpers/setTimeoutForLogout';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    handleFormSubmit = (values) => {
        axios.post('http://localhost:3035/login', values, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
        .then(res => {
            console.log(res);
            if(res.data.errMessage){
                alert(res.data.errMessage);
            }else{
                localStorage.setItem('x-auth', res.headers['x-auth']);
                localStorage.setItem('logout-time', Date.now()+ 60000);
                //set timeout for logout 
                setTimeoutForLogout(this.props.logout);
                this.props.dispatch(setAuthenticationStatusTrueAction());
                this.props.dispatch(setLoggedInUserAction(res.data));
                this.props.history.replace('/home');
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="login-container">
                <h5>New? <Link to="/signup" >Sign up</Link></h5>

                <h2>Login</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validateOnBlur={false}
                    validateOnChange={false}

                    validate={values => {
                        const errors = {};
                       
                        if (!values.email) {
                            errors.email = 'Required';
                        } 
                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        this.handleFormSubmit(values)
                    }}
                >
                    {({
                        values,
                        errors,
                        handleSubmit,
                        handleChange
                    }) => (
                            <form onSubmit={handleSubmit}>
                                
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                {errors.email}
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    onChange={handleChange}
                                    value={values.password}
                                />
                                {errors.password}
                                <button type="submit">
                                    Submit
          </button>
                            </form>
                        )}
                </Formik>

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        authenticated: state.authenticated
    }
}

export default connect(mapStateToProps)(Login);