import ButtonLink from '../../components/ButtonLink';
import PageTitle from '../../components/PageTitle';
import {withAuth} from '../../components/Auth';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const MY_CARS = gql`
query {
    my_cars {
        id,
        brand,
        model,
        year,
        horsepower
    }
}
`;

const List = (props) => {
    const my_cars = props.cars;
    const cars = my_cars.map((car) => <tr key={car.id}>
        <td>{car.brand}</td>
        <td>{car.model}</td>
        <td>{car.year}</td>
        <td>{car.horsepower}</td>
    </tr>);
    return (
        <table>
            <tr>
                <th>Marque</th>
                <th>Modèle</th>
                <th>Année</th>
                <th>Puissance</th>
            </tr>
            {cars}
        </table>
    );
}

const CarList = (pageProps) => {
    const cars = useQuery(MY_CARS);
    const my_cars = cars.data && cars.data.my_cars;

    return (
        <div>
            <PageTitle>Mes voitures</PageTitle>
            {cars.loading && <p>Chargement de vos voitures</p>}
            {!cars.loading && !my_cars && <p>Vous n'avez aucune voiture</p>}
            {!cars.loading && my_cars && <List cars={my_cars} />}
            <ButtonLink url="/car/add">Ajouter une voiture</ButtonLink>
        </div>
    );
};
  
export default withAuth(CarList);