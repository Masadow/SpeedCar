import { useRouter } from 'next/router';
import Link from 'next/link';


const MenuItem = (props) => {
  const router = useRouter();
  return (
    <div>
      <Link href={props.Url}>
        <a className={router.pathname == props.Url ? 'active' : ''}>{props.Name}</a>
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

const Header = () => {
  return (
    <div>
      <img src="/logo.png"></img>
      <MenuItem Url="/" Name="Accueil" />
      <MenuItem Url="/login" Name="Connexion" />
      <MenuItem Url="/signup" Name="Inscription" />
      <style jsx>{`
          div {
              background-color: #333;
              padding: 10px;
              margin: 0;
              padding-left: 150px;
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