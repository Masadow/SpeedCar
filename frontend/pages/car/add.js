import PageTitle from '../../components/PageTitle';
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import Submit from '../../components/form/Submit';
import { required } from '../../components/form/Validators';
import Router from 'next/router';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {withAuth} from '../../components/Auth';

const ADD_CAR = gql`
mutation Car($model: String!, $brand: String!, $year: Int!, $horsepower: Int!) {
  add_car(model: $model, brand: $brand, year: $year, horsepower: $horsepower) {
    id
  }
}
`;

function CarAdd(pageProps) {
  let error = false;

  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState(0);
  const [horsepower, setHorsepower] = useState(0);

  const [add_car, {data}] = useMutation(ADD_CAR);

  function onSubmit(e) {
    e.preventDefault();
    add_car({
      variables: {model, brand, year: parseInt(year), horsepower: parseInt(horsepower)}
    });
  }

  if (data) {
    // We hit submit and got a response
    if (data.add_car) {
      Router.push('/car/list');
    } else {
      error = true;
    }
  }

  return (
    <div>
      <PageTitle>Ajouter une voiture</PageTitle>
      <Form onSubmit={onSubmit}>
          <Input name="model" onChange={() => setModel(event.target.value)} validations={[required]} >Modèle</Input>
          <Input name="brand" onChange={() => setBrand(event.target.value)} validations={[required]} >Marque</Input>
          <Input type="number" name="year" onChange={() => setYear(event.target.value)} validations={[required]} >Année</Input>
          <Input type="number" name="horsepower" onChange={() => setHorsepower(event.target.value)} validations={[required]} >Puissance</Input>
          {error && <p>Erreur inconnue</p>}
          <Submit>Ajouter</Submit>
      </Form>
      <style>{`
          p {
            color: red;
          }
      `}</style>
    </div>
  );
}

export default withAuth(CarAdd);