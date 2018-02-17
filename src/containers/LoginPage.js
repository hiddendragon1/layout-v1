import React from 'react';
import PropTypes from 'prop-types';
import MainSideBar from './MainSideBar'
import LoginForm from '../components/LoginForm';
import Auth from '../modules/Auth';
import axios from 'axios';

class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;
    
    axios.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => {
      if(response.status === 200) {
        // change the component-container state
        this.setState({
          errors: {}
        });
        // const response= response.data;
        // save the token
        Auth.authenticateUser(response.data);
        // Auth.setUser(response.user);
        // change the current URL to /

        this.context.router.history.push('/');
      }   
    })
    .catch( error => {

      // change the component state
      const errors = error.response.data.errors ? error.response.data.errors : {};
      errors.summary = error.response.data.message;

      this.setState({
        errors
      });

    });
  }

  /**
   * Change the user object.
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <MainSideBar>
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          successMessage={this.state.successMessage}
          user={this.state.user}
        />
      </MainSideBar>
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;