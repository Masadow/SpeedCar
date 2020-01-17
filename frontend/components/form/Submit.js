import { button } from 'react-validation';
import Button from '../Button';

const CustomSubmit = ({ hasErrors, ...props }) => (
    <button {...props} disabled={hasErrors || props.disabled}>
        {props.children}
        <style jsx>{`
            button {
                margin: 0;
                margin-top: 10px;
                padding: 10px 15px;
                display: inline-block;
                border: 1px solid whitesmoke;
                border-radius: 5px;
                background-color: #333;
                color: whitesmoke;
                text-decoration: none;
            }

            button:hover:not(:disabled) {
                cursor: pointer;
                color: #333;
                background-color: whitesmoke;
            }

            button:disabled {
                color: #555;
            }
        `}</style>
    </button>
  );

const Submit = button(CustomSubmit);
  
export default Submit;