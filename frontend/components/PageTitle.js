const PageTitle = props => (
  <h1>
    {props.children}
    <div></div>
    <style jsx>{`
        h1 {
            margin-left: 20px;
            margin-right: 20px;
        }
        div {
            margin-top: 10px;
            height: 2px;
            background-color: #888;
        }
    `}</style>
  </h1>
);

export default PageTitle;