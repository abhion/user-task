import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends React.Component {

    handleFormSubmit = (values) => {
        console.log(values);
        axios.post('http://localhost:3035/user', values, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
        .then(res => {
            console.log(res);
            if(res.data.errMessage){
                alert(res.data.errMessage);
            }else{
                alert('Registered successfully');
                this.props.history.push('/login');
            }
        })
        .catch(err => console.log(err))
    }
   
    render() {
        return (
            <div className="register-container">
            <h5>Already a member? <Link to="/login">Login</Link></h5>
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    
                    validate={values => {
                        const errors = {};
                        if (!values.firstName)
                            errors.firstName = 'Required';
                        if (!values.lastName)
                            errors.lastName = 'Required';
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
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
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={values.firstName}
                                 />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={values.lastName}
                                 />
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

export default Register;