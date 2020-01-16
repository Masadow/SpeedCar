import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Submit from '../components/form/Submit';
import { required } from '../components/form/Validators';
import Router from 'next/router';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', age: '', location: '', password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      onSubmit(e) {
        e.preventDefault();

        /*
        fetch("/api/signup", {method: "POST"})
            .then(res => res.json())
            .then((result) => {
                Router.push("/login");
            });
            */
      }

      render() {
        return (
            <Layout>
              <PageTitle>Inscription</PageTitle>
              <Form ref={c => { this.form = c }} onSubmit={this.onSubmit}>
                  <Input name="name" onChange={this.handleChange} validations={[required]} >Nom complet</Input>
                  <Input name="age" onChange={this.handleChange} validations={[required]} >Âge</Input>
                  <Input name="location" onChange={this.handleChange} validations={[required]} >Lieu</Input>
                  <Input type="password" name="password" onChange={this.handleChange} validations={[required]} >Mot de passe</Input>
                  <Submit>S'inscrire</Submit>
              </Form>
            </Layout>
          )          
      }
    
}

export default Signup;