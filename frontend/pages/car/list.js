import ButtonLink from '../../components/ButtonLink';
import PageTitle from '../../components/PageTitle';
import {withAuth} from '../../components/Auth';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const List = (props) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                <TableCell>Marque</TableCell>
                <TableCell >Modèle</TableCell>
                <TableCell >Année</TableCell>
                <TableCell >Puissance</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.cars.map(row => (
                <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.brand}</TableCell>
                    <TableCell>{row.model}</TableCell>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.horsepower}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

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