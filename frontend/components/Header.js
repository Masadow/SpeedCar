import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import {useApolloClient} from '@apollo/react-hooks';

const MenuItem = (props) => {
  const router = useRouter();
  function onClick(e) {
    if (props.OnClick) {
      e.preventDefault();
      props.OnClick(e);
    }
  }
  
  return (
    <div>
      <Link href={props.Url || ''}>
        <a onClick={onClick} className={props.Url && router.pathname.split("/")[1] == props.Url.split("/")[1] ? 'active' : ''}>{props.Name}</a>
      </Link>
      <style jsx>{`
        div {
          margin: 0;
          padding: 0;
          display: inline-block;
        }
        a {
          color: whitesmoke;
          text-decoration: none;
          padding: 10px;
        }
        a:hover, a.active {
          background-color: whitesmoke;
          color: #333;
        }
      `}</style>
    </div>
  )
};

const Header = (props) => {
  const client = useApolloClient();
  function signout(e) {
    Cookies.remove('authToken');
    client.clearStore().then(() => Router.push('/'));
  }
  return (
    <div className="header">
      <img src="/logo.png"></img>
      <div className="left">
        <MenuItem Url="/" Name="Accueil" />
        {props.User && <MenuItem Url="/car/list" Name="Mes voitures" />}
      </div>
      <div className="right">
        {!props.User && <MenuItem Url="/login" Name="Connexion" />}
        {!props.User && <MenuItem Url="/signup" Name="Inscription" />}
        {props.User && <MenuItem OnClick={signout} Name="Déconnexion" />}
      </div>
      <style jsx>{`
          .header {
              background-color: #333;
              padding: 10px;
              margin: 0;
              padding-left: 150px;
          }
          .left, .right {
            display: inline-block;
          }
          .right {
            float: right;
          }
          img {
            position: absolute;
            height: 128px;
            top: -42px;
            left: -5px;
          }
      `}</style>
    </div>
  )
};

export default Header;