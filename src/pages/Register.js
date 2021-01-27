import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  
  const { onChange, onSubmit, values } = useForm(registerUser, {
    firstname:'',
    lastname:'',
    username: '',
    org: false,
    email: '',
    password: '',
    confirmPassword: ''
  });

 
  function handleCheck() {
    values.org= !values.org
    console.log(values)
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="first name"
          placeholder="firstname.."
          name="firstname"
          type="text"
          value={values.firstname}
          error={errors.firstname ? true : false}
          onChange={onChange}
        />
        <Form.Input
        label="last name"
        placeholder="lastname.."
        name="lastname"
        type="text"
        value={values.lastname}
        error={errors.lastname ? true : false}
        onChange={onChange}
      />
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />

        <div class="ui checkbox" style={{marginBottom:"2em", marginTop:"2em"}}>
        <input type="checkbox" name="org" value={true} onChange={handleCheck}/>
        <label>Are you an organization</label>
        </div>

        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
         <Button inverted color='green'>
        Register
      </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $firstname: String!
    $lastname: String!
    $username: String!
    $email: String!
    $org: Boolean!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        firstname: $firstname
        lastname: $lastname
        username: $username
        email: $email
        org: $org
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      firstname
      lastname 
      org
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;