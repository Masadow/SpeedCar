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
import {Delete, Edit} from '@material-ui/icons';
import Link from '../../lib/Link';
import {MY_CARS, DELETE_CAR} from '../../query/car';

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

    if (data && data.deleteCar) {
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
                                <Link href={'/car/edit/' + row.id} ><Edit /></Link>
                                <Link href="#" onClick={(e) => deleteCar(e, row.id)}><Delete /></Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const CarList = ({cars}, pageProps) => {
    const { data, refetch } = useQuery(MY_CARS);
    const my_cars = data && data.myCars;

    return (
        <div>
            <PageTitle>Mes voitures</PageTitle>
            {!my_cars && <p>Vous n'avez aucune voiture</p>}
            {my_cars && <List cars={my_cars} refresh={refetch} />}
            <ButtonLink url="/car/add">Ajouter une voiture</ButtonLink>
        </div>
    );
};

CarList.getInitialProps = async (ctx) => {
    //Even though cars won't be used, it's useful to run it in getInitialProps to prefetch the response and get faster render
    const cars = await ctx.apolloClient.query({query: MY_CARS});
    return {cars};
}
  
export default withAuth(CarList);