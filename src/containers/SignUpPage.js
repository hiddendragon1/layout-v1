import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm';
import MainSideBar from './MainSideBar'
import axios from 'axios';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
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
   * Process the form.
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;


    // create an AJAX request
    axios.post('/auth/signup', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => {
      if(response.status === 200) {
  
        this.setState({
          errors: {}
        });
        
        localStorage.setItem('successMessage', response.data.message);

        // make a redirect
        this.context.router.history.push('/login')
      }
    })
    .catch(error => {
      const response= error.response.data;

      // change the component state
      const errors = response.errors ? response.errors : {};
      errors.summary = response.message;

      this.setState({
        errors
      });

    });
  
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <MainSideBar>
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
      </MainSideBar>
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;