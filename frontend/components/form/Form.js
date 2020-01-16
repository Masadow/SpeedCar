import { form } from 'react-validation';

const CustomForm = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
  <form {...props}>{children}</form>
);

const Form = form(CustomForm);

export default Form;