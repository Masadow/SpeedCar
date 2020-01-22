import PageTitle from '../components/PageTitle';
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Submit from '../components/form/Submit';
import { required } from '../components/form/Validators';
import { useState } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import Cookies from 'js-cookie';

const AUTHENTICATE = gql`
query String($name: String!, $password: String!) {
  authToken(name: $name, password: $password)
}
`;

function Login(pageProps) {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  let error = false;
  

  const [authenticate, {client, data}] = useLazyQuery(AUTHENTICATE);

  function onSubmit(e) {
    e.preventDefault();
    authenticate({
      variables: {name, password}
    });
  }

  if (data) {
    // We hit submit and got a response
    if (data.authToken) {
      Cookies.set('authToken', data.authToken);
      client.clearStore().then(() => Router.push('/'));
    } else {
      error = true;
    }
  }

  return (
      <div>
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
      </div>
    )          
}

export default Login;