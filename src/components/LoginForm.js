import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card  from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

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
          helperText={errors.password}
          error={errors.password?true:false}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <Button raised type="submit" label="Log in" color='primary'>Log in</Button>
      </div>

      <Typography>Don't have an account? <Link to={'/signup'}>Create one</Link>.</Typography>
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;