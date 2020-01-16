import Header from './Header';
import Panel from './Panel';

const Layout = props => (
  <div>
    <Header />
    <Panel>
      {props.children}
    </Panel>
    <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          display: block;
          background: url("/bg.png") repeat;
        }
    `}</style>
  </div>
);

export default Layout;