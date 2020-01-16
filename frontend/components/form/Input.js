import { control } from 'react-validation';

const CustomInput = ({ error, isChanged, isUsed, children, ...props }) => (
    <label>
        {children}
        <input {...props} />
        <span>{isChanged && isUsed && error}</span>
        <style jsx>{`
            label {
                display: block;
                margin-top: 10px;
            }

            input {
                display: block;
                margin-top: 5px;
            }

            span {
                color: red;
            }
      `}</style>
    </label>
  );
  
const Input = control(CustomInput);

export default Input;