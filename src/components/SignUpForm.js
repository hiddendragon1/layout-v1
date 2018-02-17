import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card  from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          label="Name"
          name="name"
          error={errors.name?true:false}
          helperText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className="field-line">
        <TextField
          label="Email"
          name="email"
          error={errors.email?true:false}
          helperText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          label="Password"
          type="password"
          name="password"
          onChange={onChange}
          error={errors.password?true:false}
          helperText={errors.password}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <Button type="submit" label="Create New Account" raised color='primary'>Create New Account</Button>
      </div>

      <Typography>Already have an account? <Link to={'/login'}>Log in</Link></Typography>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;