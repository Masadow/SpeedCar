import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Submit from '../components/form/Submit';
import { required } from '../components/form/Validators';
import { useState } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

const AUTHENTICATE = gql`
query String($name: String!, $password: String!) {
  authToken(name: $name, password: $password)
}
`;

function Login() {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  let error = false;
  

  const [authenticate, {loading, data}] = useLazyQuery(AUTHENTICATE);

  function onSubmit(e) {
    e.preventDefault();
    authenticate({
      variables: {name, password}
    });
  }

  if (data) {
    // We hit submit and got a response
    console.log(data.authToken);
    if (data.authToken) {
      console.log("Success");
    } else {
      error = true;
    }
  }

  return (
      <Layout>
        <PageTitle>Connexion</PageTitle>
        <Form onSubmit={onSubmit}>
            <Input name="name" onChange={() => setName(event.target.value)} validations={[required]} >Nom complet</Input>
            <Input type="password" name="password" onChange={() => setPassword(event.target.value)} validations={[required]} >Mot de passe</Input>
            {error && <p>Compte inconnu</p>}
            <Submit>Se connecter</Submit>
        </Form>
        <style>{`
          p {
            color: red;
          }
        `}</style>
      </Layout>
    )          
}

export default Login;