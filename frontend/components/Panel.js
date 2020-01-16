const Panel = props => (
  <div>
      {props.children}
    <style jsx>{`
        div {
          margin: 0;
          padding: 0;
          display: block;
          background: #222;
          padding: 20px;
          margin: 30px;
          border-radius: 10px;
          border: 1px solid whitesmoke;
          color: whitesmoke;
        }
    `}</style>
  </div>
);

export default Panel;