import ButtonLink from '../../components/ButtonLink';
import PageTitle from '../../components/PageTitle';
import {withAuth} from '../../components/Auth';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Delete} from '@material-ui/icons';
import Link from '../../lib/Link';
import { identifier } from '@babel/types';

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

const DELETE_CAR = gql`
mutation Car($id: ID!) {
    delete_car(id: $id) {
        id
    }
}
`;

const List = (props) => {
    const [delete_car, {data}] = useMutation(DELETE_CAR);

    function deleteCar(e, id) {
        e.preventDefault();
        delete_car({
            variables: {
                id: id
            }
        });
    }

    if (data && data.delete_car) {
        props.refresh();
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Marque</TableCell>
                    <TableCell >Modèle</TableCell>
                    <TableCell >Année</TableCell>
                    <TableCell >Puissance</TableCell>
                    <TableCell ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.cars.map(row => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.brand}</TableCell>
                        <TableCell>{row.model}</TableCell>
                        <TableCell>{row.year}</TableCell>
                        <TableCell>{row.horsepower}</TableCell>
                        <TableCell>
                            <Link href="#" component="button" onClick={(e) => deleteCar(e, row.id)}><Delete /></Link>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const CarList = (pageProps) => {
    const {data, loading, refetch} = useQuery(MY_CARS);
    const my_cars = data && data.my_cars;

    return (
        <div>
            <PageTitle>Mes voitures</PageTitle>
            {loading && <p>Chargement de vos voitures</p>}
            {!loading && !my_cars && <p>Vous n'avez aucune voiture</p>}
            {!loading && my_cars && <List cars={my_cars} refresh={refetch} />}
            <ButtonLink url="/car/add">Ajouter une voiture</ButtonLink>
        </div>
    );
};
  
export default withAuth(CarList);