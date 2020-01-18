import PageTitle from '../../../components/PageTitle';
import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';
import Submit from '../../../components/form/Submit';
import { required } from '../../../components/form/Validators';
import Router, {useRouter} from 'next/router';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {withAuth} from '../../../components/Auth';
import {MY_CAR, EDIT_CAR} from '../../../query/car';

/* TODO: 
 * The Form could and should be put in a separate component to allow reusability between add and edit pages
 */

function CarEdit({car}) {
  let error = false;

  const [edit_car, mutation] = useMutation(EDIT_CAR);

  const router = useRouter()

  function onSubmit(e) {
    e.preventDefault();
    edit_car({
      variables: {id: router.query.id, model, brand, year: parseInt(year), horsepower: parseInt(horsepower)}
    });
  }

  if (mutation.data && !mutation.loading) {
    // We hit submit and got a response
    if (mutation.data.editCar) {
      Router.push('/car/list');
    } else {
      error = true;
    }
  }

  let carData = {
      model: '',
      brand: '',
      year: '',
      horsepower: ''
  };

  //Only handle car after it has been hydrated
  if (car) {
    if (!car.data) {
      Router.push('/car/list');
    }
  
    carData = car.data.myCar;
  }

  const [model, setModel] = useState(carData.model);
  const [brand, setBrand] = useState(carData.brand);
  const [year, setYear] = useState(carData.year);
  const [horsepower, setHorsepower] = useState(carData.horsepower);

  return (
    <div>
      <PageTitle>Editer une voiture</PageTitle>
      <Form onSubmit={onSubmit}>
          <Input name="model" value={model} onChange={() => setModel(event.target.value)} validations={[required]} >Modèle</Input>
          <Input name="brand" value={brand} onChange={() => setBrand(event.target.value)} validations={[required]} >Marque</Input>
          <Input type="number" value={year} name="year" onChange={() => setYear(event.target.value)} validations={[required]} >Année</Input>
          <Input type="number" value={horsepower} name="horsepower" onChange={() => setHorsepower(event.target.value)} validations={[required]} >Puissance</Input>
          {error && <p>Erreur inconnue</p>}
          <Submit disabled={mutation.data}>Enregistrer</Submit>
      </Form>
      <style>{`
          p {
            color: red;
          }
      `}</style>
    </div>
  );
}

CarEdit.getInitialProps = async (ctx) => 
{
  const car = await ctx.apolloClient.query({query: MY_CAR, variables: {id: ctx.query.id}});
  return {car};
}

export default withAuth(CarEdit);