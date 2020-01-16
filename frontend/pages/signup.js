import PageTitle from '../components/PageTitle';
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Submit from '../components/form/Submit';
import { required } from '../components/form/Validators';
import Router from 'next/router';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SIGNUP = gql`
mutation Boolean($name: String!, $age: Int!, $location: String!, $password: String!) {
  signup(name: $name, age: $age, location: $location, password: $password)
}
`;

function Signup(pageProps) {
  let error = false;
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');

  const [signup, {data}] = useMutation(SIGNUP);

  function onSubmit(e) {
    e.preventDefault();
    signup({
      variables: {name, age: parseInt(age), location, password}
    });
  }

  if (data) {
    // We hit submit and got a response
    if (data.signup) {
      Router.push('/login');
    } else {
      error = true;
    }
  }

  return (
    <div>
      <PageTitle>Inscription</PageTitle>
      <Form onSubmit={onSubmit}>
          <Input name="name" onChange={() => setName(event.target.value)} validations={[required]} >Nom complet</Input>
          <Input type="number" name="age" onChange={() => setAge(event.target.value)} validations={[required]} >Âge</Input>
          <Input name="location" onChange={() => setLocation(event.target.value)} validations={[required]} >Lieu</Input>
          <Input type="password" name="password" onChange={() => setPassword(event.target.value)} validations={[required]} >Mot de passe</Input>
          {error && <p>Erreur inconnue</p>}
          <Submit>S'inscrire</Submit>
      </Form>
      <style>{`
          p {
            color: red;
          }
      `}</style>
    </div>
  );
}

export default Signup;