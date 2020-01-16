import ButtonLink from '../components/ButtonLink';
import PageTitle from '../components/PageTitle';

const Index = (pageProps) => (
    <div>
        <PageTitle>Bienvenue sur SpeedCar</PageTitle>
        <h2>La référence en course automobile amateur</h2>
        <p>Sur SpeedCar, vous pourrez participer à des courses automobile amateurs. Fini la télé, passez à la réalité et gagnez des points au classement pour devenir le meilleur pilote !</p>
        {!pageProps.User && <ButtonLink url="/signup">S'inscrire</ButtonLink>}
    </div>
  );
  
  export default Index;