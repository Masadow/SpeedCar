import PageTitle from '../../components/PageTitle';
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import Submit from '../../components/form/Submit';
import { required } from '../../components/form/Validators';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {withAuth} from '../../components/Auth';
import {ADD_CAR, MY_CARS} from '../../query/car';
import Router from 'next/router';

function CarAdd(pageProps) {
  let error = false;

  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState(0);
  const [horsepower, setHorsepower] = useState(0);

  const [addCar, {data, loading}] = useMutation(ADD_CAR, {
    update(cache, {data: { addCar }}) {
      const {myCars} = cache.readQuery({query: MY_CARS});
      cache.writeQuery({
        query: MY_CARS,
        data: { myCars: myCars.concat([addCar]) },
      });
    }
  });

  function onSubmit(e) {
    e.preventDefault();
    addCar({
      variables: {model, brand, year: parseInt(year), horsepower: parseInt(horsepower)}
    });
  }

  if (data && !loading) {
    // We hit submit and got a response
    if (data.addCar) {
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
          <Submit disabled={data}>Ajouter</Submit>
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